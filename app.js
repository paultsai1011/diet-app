/* ==========================================================================
   app.js — 計算邏輯 + 推薦邏輯
   ========================================================================== */

const LS_PROFILE = "diet_profile_v1";
const LS_CUSTOM_ITEMS = "diet_custom_items_v1";
const LS_STORE_PREF = "diet_store_pref_v1";
const LS_RECORDS = "diet_records_v1"; // 施打 + 體重/體脂紀錄
const LS_MEAL_LOG = "diet_meal_log_v1"; // 每日實際吃了什麼
const LS_GENDER = "diet_gender_v1"; // 記住上次選的性別，避免重新整理後跳回預設值

// 施打頻率換算成天數，方便算「下次施打日」
const FREQUENCY_DAYS = {
  weekly: 7,
  biweekly: 14,
  custom: null, // 使用者自填天數
};

// 常見施打部位（含左右側，方便腹部左右輪替）
const INJECTION_SITES = ["腹部", "大腿", "上臂", "臀部"];
const INJECTION_SIDES = ["左", "右"];

// ---------------------------------------------------------------------------
// 資料合併：主資料庫 + 使用者自行新增的品項（存在瀏覽器 localStorage，不用後端）
// ---------------------------------------------------------------------------
function getAllProducts() {
  const custom = JSON.parse(localStorage.getItem(LS_CUSTOM_ITEMS) || "[]");
  return [...PRODUCTS, ...custom];
}

function saveCustomItem(item) {
  const custom = JSON.parse(localStorage.getItem(LS_CUSTOM_ITEMS) || "[]");
  custom.push(item);
  localStorage.setItem(LS_CUSTOM_ITEMS, JSON.stringify(custom));
}

// ---------------------------------------------------------------------------
// BMR / TDEE 計算（Mifflin-St Jeor 公式）
// ---------------------------------------------------------------------------
const ACTIVITY_FACTORS = {
  sedentary: { label: "久坐（很少運動）", value: 1.2 },
  light: { label: "輕度活動（每週運動1-3天）", value: 1.375 },
  moderate: { label: "中度活動（每週運動3-5天）", value: 1.55 },
  active: { label: "高度活動（每週運動6-7天）", value: 1.725 },
};

function calcBMR({ gender, age, heightCm, weightKg }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

function calcTDEE(bmr, activityKey) {
  const factor = ACTIVITY_FACTORS[activityKey]?.value || 1.2;
  return bmr * factor;
}

// 目標熱量：TDEE 扣減一定比例，但絕不建議低於 BMR（打針後食慾下降，
// 更需要守住這條底線，避免代謝率下降、肌肉流失）
function calcTargetCalories(bmr, tdee, deficitPct) {
  const raw = tdee * (1 - deficitPct);
  return Math.max(raw, bmr);
}

// 建議蛋白質攝取：以每公斤體重 1.2~1.6g 估算（體重管理期間常見建議區間，
// 有助於保留肌肉量），這裡取中間值 1.4g 當作預設目標
function calcProteinTarget(weightKg, multiplier = 1.4) {
  return weightKg * multiplier;
}

// BMI = 體重(kg) / 身高(m)^2
function calcBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

// ---------------------------------------------------------------------------
// 推薦引擎：針對指定餐別，從資料庫中挑組合，盡量貼近熱量與蛋白質目標
// ---------------------------------------------------------------------------
function recommendCombos(mealType, storeFilter, calorieTarget, proteinTarget, count = 3) {
  const all = getAllProducts().filter(
    (p) => p.meals.includes(mealType) && (storeFilter === "all" || p.store === storeFilter)
  );

  const byCat = {
    protein: all.filter((p) => p.category === "protein" || p.category === "dairy"),
    carb: all.filter((p) => p.category === "carb"),
    veg: all.filter((p) => p.category === "veg"),
    soup: all.filter((p) => p.category === "soup"),
    drink: all.filter((p) => p.category === "drink"),
  };

  const allCombos = [];

  // 窮舉 蛋白質 x 主食 x (可選)蔬菜/湯/多一份蛋白質 的組合
  // extras 裡加入蛋白質類，讓組合有機會湊到更高的熱量，貼近目標
  for (const pr of byCat.protein.length ? byCat.protein : [null]) {
    for (const cb of byCat.carb.length ? byCat.carb : [null]) {
      const extras = [
        ...byCat.veg,
        ...byCat.soup,
        ...byCat.protein.filter((p) => !pr || p.id !== pr.id),
        null,
      ];
      for (const ex of extras) {
        const items = [pr, cb, ex].filter(Boolean);
        if (items.length === 0) continue;
        const kcal = items.reduce((s, i) => s + i.kcal, 0);
        const protein = items.reduce((s, i) => s + i.protein, 0);
        allCombos.push({ items, kcal, protein });
      }
    }
  }

  if (allCombos.length === 0) return [];

  // 去除重複組合（同樣品項名稱組合只留一個）
  const seen = new Set();
  const uniq = [];
  for (const c of allCombos) {
    const key = c.items.map((i) => i.id).sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    uniq.push(c);
  }

  // 先試著找「合理範圍內」（目標的 60%~140%）的組合；
  // 真的找不到（品項太少湊不出來）就放寬到全部候選，一律用「離目標多近」排序，
  // 這樣一定會回傳東西，也一定是目前資料庫裡能湊到最接近目標的選擇
  const lowerBound = calorieTarget * 0.6;
  const upperBound = calorieTarget * 1.4;
  let candidates = uniq.filter((c) => c.kcal >= lowerBound && c.kcal <= upperBound);
  if (candidates.length === 0) candidates = uniq;

  // 排序：優先貼近熱量目標，其次蛋白質愈高愈好（達標優先於單純接近）
  candidates.sort((a, b) => {
    const distA = Math.abs(a.kcal - calorieTarget);
    const distB = Math.abs(b.kcal - calorieTarget);
    if (Math.abs(distA - distB) > 30) return distA - distB;
    return b.protein - a.protein;
  });

  const pool = candidates.slice(0, Math.max(count * 4, 12));
  // 洗牌後取前 count 組，讓每次點「換一組」有變化
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

// ---------------------------------------------------------------------------
// 施打 / 體重 / 體脂 紀錄
// ---------------------------------------------------------------------------
function getRecords() {
  const list = JSON.parse(localStorage.getItem(LS_RECORDS) || "[]");
  return list.sort((a, b) => new Date(b.date) - new Date(a.date)); // 新到舊
}

function saveRecordEntry(record) {
  const list = JSON.parse(localStorage.getItem(LS_RECORDS) || "[]");
  list.push({ id: "rec_" + Date.now(), ...record });
  localStorage.setItem(LS_RECORDS, JSON.stringify(list));
}

function deleteRecordEntry(id) {
  const list = JSON.parse(localStorage.getItem(LS_RECORDS) || "[]");
  const filtered = list.filter((r) => r.id !== id);
  localStorage.setItem(LS_RECORDS, JSON.stringify(filtered));
}

// 算下一次施打建議日期
function calcNextInjectionDate(lastDateStr, frequencyKey, customDays) {
  const days = frequencyKey === "custom" ? customDays : FREQUENCY_DAYS[frequencyKey];
  if (!days || !lastDateStr) return null;
  const d = new Date(lastDateStr);
  d.setDate(d.getDate() + days);
  return d;
}

// 建議下一個施打部位（部位+左右側）：跟最近一次不同，並在腹部左右等位置之間輪替
function suggestNextSite(records) {
  const withSite = records.filter((r) => r.site).slice(0, 6); // 最近幾筆
  // 組成完整輪替清單，例如「腹部-左」「腹部-右」「大腿-左」...
  const allCombos = [];
  INJECTION_SITES.forEach((site) => {
    INJECTION_SIDES.forEach((side) => allCombos.push(site + "-" + side));
  });

  if (withSite.length === 0) return allCombos[0];

  const recentCombos = withSite.map((r) => r.site + (r.side ? "-" + r.side : ""));
  const lastCombo = recentCombos[0];

  // 如果最近都打同一個部位（例如都是腹部），就只在該部位的左右側之間輪替
  const lastSiteOnly = (lastCombo.split("-")[0]) || allCombos[0].split("-")[0];
  const sameSiteCombos = allCombos.filter((c) => c.startsWith(lastSiteOnly));
  const notRecentSameSite = sameSiteCombos.filter((c) => !recentCombos.includes(c));
  if (notRecentSameSite.length > 0) return notRecentSameSite[0];

  // 找完全沒用過的部位
  const notRecentlyUsed = allCombos.filter((c) => !recentCombos.includes(c));
  if (notRecentlyUsed.length > 0) return notRecentlyUsed[0];

  // 全部用過的話，至少避開跟上一次一樣
  return allCombos.find((c) => c !== lastCombo) || allCombos[0];
}

// 算兩筆紀錄之間的變化（體重、體脂），給前端顯示趨勢用
function calcTrend(records) {
  const withWeight = records.filter((r) => r.weight).sort((a, b) => new Date(a.date) - new Date(b.date));
  if (withWeight.length < 2) return null;
  const first = withWeight[0];
  const last = withWeight[withWeight.length - 1];
  return {
    weightChange: +(last.weight - first.weight).toFixed(1),
    bodyFatChange:
      last.bodyFat && first.bodyFat ? +(last.bodyFat - first.bodyFat).toFixed(1) : null,
    fromDate: first.date,
    toDate: last.date,
  };
}

// 匯出所有本機資料（紀錄 + 個人資料 + 自訂品項）成 JSON 檔，方便備份/換裝置
function exportAllData() {
  const data = {
    profile: JSON.parse(localStorage.getItem(LS_PROFILE) || "null"),
    records: JSON.parse(localStorage.getItem(LS_RECORDS) || "[]"),
    customItems: JSON.parse(localStorage.getItem(LS_CUSTOM_ITEMS) || "[]"),
    mealLog: JSON.parse(localStorage.getItem(LS_MEAL_LOG) || "[]"),
    gender: localStorage.getItem(LS_GENDER) || "female",
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "diet-app-backup-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  URL.revokeObjectURL(url);
}

// 匯入備份檔
function importAllData(jsonText) {
  const data = JSON.parse(jsonText);
  if (data.profile) localStorage.setItem(LS_PROFILE, JSON.stringify(data.profile));
  if (data.records) localStorage.setItem(LS_RECORDS, JSON.stringify(data.records));
  if (data.customItems) localStorage.setItem(LS_CUSTOM_ITEMS, JSON.stringify(data.customItems));
  if (data.mealLog) localStorage.setItem(LS_MEAL_LOG, JSON.stringify(data.mealLog));
  if (data.gender) localStorage.setItem(LS_GENDER, data.gender);
}

// ---------------------------------------------------------------------------
// 每日飲食紀錄（記錄「哪天、哪一餐、吃了什麼」）
// ---------------------------------------------------------------------------
function saveMealLogEntry(entry) {
  const list = JSON.parse(localStorage.getItem(LS_MEAL_LOG) || "[]");
  list.push({ id: "meal_" + Date.now() + Math.random().toString(36).slice(2, 6), ...entry });
  localStorage.setItem(LS_MEAL_LOG, JSON.stringify(list));
}

function deleteMealLogEntry(id) {
  const list = JSON.parse(localStorage.getItem(LS_MEAL_LOG) || "[]");
  localStorage.setItem(LS_MEAL_LOG, JSON.stringify(list.filter((r) => r.id !== id)));
}

// 刪除某一天所有的飲食紀錄
function deleteMealLogsForDate(date) {
  const list = JSON.parse(localStorage.getItem(LS_MEAL_LOG) || "[]");
  localStorage.setItem(LS_MEAL_LOG, JSON.stringify(list.filter((r) => r.date !== date)));
}

function getMealLogsForDate(date) {
  const list = JSON.parse(localStorage.getItem(LS_MEAL_LOG) || "[]");
  return list.filter((r) => r.date === date).sort((a, b) => a.mealOrder - b.mealOrder);
}

// 依日期分組，回傳每天的總熱量/蛋白質，用於「歷史紀錄」列表
function getLogHistorySummary() {
  const list = JSON.parse(localStorage.getItem(LS_MEAL_LOG) || "[]");
  const byDate = {};
  list.forEach((r) => {
    if (!byDate[r.date]) byDate[r.date] = { date: r.date, kcal: 0, protein: 0, mealsLogged: new Set() };
    byDate[r.date].kcal += r.kcalTotal;
    byDate[r.date].protein += r.proteinTotal;
    byDate[r.date].mealsLogged.add(r.meal);
  });
  return Object.values(byDate)
    .map((d) => ({ ...d, mealsLogged: d.mealsLogged.size }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

const MEAL_ORDER = { breakfast: 0, lunch: 1, dinner: 2 };
const MEAL_LABELS = { breakfast: "早餐", lunch: "午餐", dinner: "晚餐" };
