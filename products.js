/* ==========================================================================
   products.js — 超商飲食資料庫
   --------------------------------------------------------------------------
   這裡是你「持續更新」的地方。之後 7-11 / 全家出新品，
   直接在下面的陣列裡新增一筆物件即可，存檔、git push，網站就會更新。

   欄位說明：
   id       : 唯一代號（英數字，不要重複）
   name     : 商品名稱
   store    : "711" 或 "family"
   category : "protein"（蛋白質）| "carb"（澱粉/主食）| "veg"（蔬菜/沙拉）
              | "soup"（湯品/關東煮）| "dairy"（乳製品/豆漿）| "drink"（飲品）
   meals    : 適合的餐別，可複選 ["breakfast","lunch","dinner"]
   kcal     : 熱量（大卡）
   protein  : 蛋白質（公克）
   carbs    : 碳水化合物（公克）
   fat      : 脂肪（公克）
   note     : 選填，備註（例如：需冷藏加熱 / 無糖 / 高纖）

   ⚠️ 這些數值是常見品項的「估計值」，方便你先上線使用。
   正式使用前請以商品包裝上的營養標示為準，發現落差歡迎直接修改這裡的數字。
   ========================================================================== */

const PRODUCTS = [
  // ---------- 蛋白質類 protein ----------
  { id: "p01", name: "茶葉蛋（1顆）", store: "711", category: "protein", meals: ["breakfast","lunch","dinner"], kcal: 75, protein: 7, carbs: 1, fat: 5 },
  { id: "p02", name: "茶葉蛋（1顆）", store: "family", category: "protein", meals: ["breakfast","lunch","dinner"], kcal: 75, protein: 7, carbs: 1, fat: 5 },
  { id: "p03", name: "舒肥雞胸肉（原味）", store: "711", category: "protein", meals: ["lunch","dinner"], kcal: 130, protein: 25, carbs: 2, fat: 3, note: "冷藏，直接吃或微溫" },
  { id: "p04", name: "舒肥雞胸肉（黑胡椒）", store: "family", category: "protein", meals: ["lunch","dinner"], kcal: 135, protein: 24, carbs: 3, fat: 3 },
  { id: "p05", name: "嫩豆腐（1盒）", store: "711", category: "protein", meals: ["lunch","dinner"], kcal: 90, protein: 8, carbs: 3, fat: 5 },
  { id: "p06", name: "無糖豆漿（400ml）", store: "family", category: "protein", meals: ["breakfast"], kcal: 140, protein: 12, carbs: 6, fat: 7 },
  { id: "p07", name: "無糖豆漿（400ml）", store: "711", category: "protein", meals: ["breakfast"], kcal: 140, protein: 12, carbs: 6, fat: 7 },
  { id: "p08", name: "希臘優格（原味）", store: "family", category: "dairy", meals: ["breakfast"], kcal: 120, protein: 12, carbs: 8, fat: 4 },
  { id: "p09", name: "水煮鯖魚罐頭風味即食包", store: "711", category: "protein", meals: ["lunch","dinner"], kcal: 180, protein: 20, carbs: 1, fat: 11 },
  { id: "p10", name: "溏心蛋（1顆）", store: "family", category: "protein", meals: ["breakfast","lunch","dinner"], kcal: 90, protein: 7, carbs: 1, fat: 6 },
  { id: "p11", name: "低脂鮮乳（290ml）", store: "711", category: "dairy", meals: ["breakfast"], kcal: 120, protein: 9, carbs: 12, fat: 3 },
  { id: "p12", name: "毛豆（1小盒）", store: "family", category: "protein", meals: ["lunch","dinner"], kcal: 100, protein: 10, carbs: 7, fat: 4, note: "高纖、高蛋白點心" },

  // ---------- 主食/澱粉類 carb ----------
  { id: "c01", name: "御飯糰（鮭魚）", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 180, protein: 4, carbs: 35, fat: 3 },
  { id: "c02", name: "御飯糰（梅子）", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 170, protein: 3, carbs: 37, fat: 1 },
  { id: "c03", name: "飯糰（雞胸肉）", store: "family", category: "carb", meals: ["breakfast","lunch"], kcal: 190, protein: 8, carbs: 33, fat: 3 },
  { id: "c04", name: "地瓜（中）", store: "711", category: "carb", meals: ["breakfast","lunch","dinner"], kcal: 150, protein: 2, carbs: 34, fat: 0, note: "高纖，取代白飯的好選擇" },
  { id: "c05", name: "地瓜（中）", store: "family", category: "carb", meals: ["breakfast","lunch","dinner"], kcal: 150, protein: 2, carbs: 34, fat: 0 },
  { id: "c06", name: "雞胸肉三明治", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 280, protein: 16, carbs: 32, fat: 9 },
  { id: "c07", name: "雞蛋沙拉三明治", store: "family", category: "carb", meals: ["breakfast","lunch"], kcal: 300, protein: 10, carbs: 34, fat: 13 },
  { id: "c08", name: "玄米飯糰", store: "family", category: "carb", meals: ["breakfast","lunch","dinner"], kcal: 160, protein: 3, carbs: 34, fat: 1, note: "全穀，纖維較高" },
  { id: "c09", name: "溫野菜義大利麵（番茄）", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 350, protein: 11, carbs: 55, fat: 8 },
  { id: "c10", name: "烏龍冷麵", store: "family", category: "carb", meals: ["lunch","dinner"], kcal: 320, protein: 8, carbs: 60, fat: 4 },

  // ---------- 蔬菜/沙拉類 veg ----------
  { id: "v01", name: "生菜沙拉（附雞胸）", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 150, protein: 14, carbs: 8, fat: 7, note: "醬料建議只加一半" },
  { id: "v02", name: "生菜沙拉（附水煮蛋）", store: "family", category: "veg", meals: ["lunch","dinner"], kcal: 140, protein: 8, carbs: 9, fat: 8 },
  { id: "v03", name: "溫沙拉（綜合時蔬）", store: "family", category: "veg", meals: ["lunch","dinner"], kcal: 90, protein: 3, carbs: 12, fat: 3 },
  { id: "v04", name: "涼拌小黃瓜", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 40, protein: 1, carbs: 6, fat: 1 },

  // ---------- 湯品/關東煮 soup ----------
  { id: "s01", name: "關東煮－蘿蔔", store: "711", category: "soup", meals: ["lunch","dinner"], kcal: 20, protein: 0, carbs: 4, fat: 0 },
  { id: "s02", name: "關東煮－黑輪", store: "711", category: "soup", meals: ["lunch","dinner"], kcal: 70, protein: 5, carbs: 8, fat: 2 },
  { id: "s03", name: "關東煮－昆布", store: "family", category: "soup", meals: ["lunch","dinner"], kcal: 15, protein: 1, carbs: 3, fat: 0 },
  { id: "s04", name: "關東煮－王子麵餅", store: "family", category: "soup", meals: ["lunch","dinner"], kcal: 90, protein: 2, carbs: 15, fat: 3 },
  { id: "s05", name: "玉米濃湯（小）", store: "711", category: "soup", meals: ["breakfast","lunch","dinner"], kcal: 120, protein: 3, carbs: 18, fat: 4 },
  { id: "s06", name: "味噌豆腐湯", store: "family", category: "soup", meals: ["breakfast","lunch","dinner"], kcal: 60, protein: 4, carbs: 6, fat: 2 },

  // ---------- 飲品 drink ----------
  { id: "d01", name: "無糖美式咖啡（中杯）", store: "711", category: "drink", meals: ["breakfast","lunch","dinner"], kcal: 5, protein: 0, carbs: 1, fat: 0 },
  { id: "d02", name: "無糖美式咖啡（中杯）", store: "family", category: "drink", meals: ["breakfast","lunch","dinner"], kcal: 5, protein: 0, carbs: 1, fat: 0 },
  { id: "d03", name: "無糖綠茶", store: "711", category: "drink", meals: ["breakfast","lunch","dinner"], kcal: 0, protein: 0, carbs: 0, fat: 0 },
  { id: "d04", name: "無糖綠茶", store: "family", category: "drink", meals: ["breakfast","lunch","dinner"], kcal: 0, protein: 0, carbs: 0, fat: 0 },

  // ---------- 加碼：熱量較高的品項，讓三餐組合更容易湊到每日目標 ----------
  { id: "p13", name: "雙倍舒肥雞胸（原味）", store: "711", category: "protein", meals: ["lunch","dinner"], kcal: 230, protein: 45, carbs: 3, fat: 5, note: "兩份雞胸一起吃" },
  { id: "p14", name: "鮪魚蛋沙拉三明治", store: "family", category: "carb", meals: ["breakfast","lunch"], kcal: 340, protein: 14, carbs: 32, fat: 17 },
  { id: "p15", name: "起司豬排三明治", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 380, protein: 18, carbs: 35, fat: 19 },
  { id: "p16", name: "培根蛋堡", store: "family", category: "carb", meals: ["breakfast"], kcal: 350, protein: 15, carbs: 30, fat: 18 },
  { id: "p17", name: "焗烤雞肉義大利麵", store: "family", category: "carb", meals: ["lunch","dinner"], kcal: 420, protein: 18, carbs: 50, fat: 15 },
  { id: "p18", name: "牛肉咖哩飯", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 450, protein: 16, carbs: 62, fat: 14 },
  { id: "p19", name: "高蛋白飲（巧克力）", store: "711", category: "dairy", meals: ["breakfast","lunch","dinner"], kcal: 160, protein: 20, carbs: 10, fat: 4, note: "點心/加餐用" },
  { id: "p20", name: "堅果棒", store: "family", category: "protein", meals: ["breakfast","lunch","dinner"], kcal: 180, protein: 6, carbs: 16, fat: 11, note: "點心/加餐用" },
  { id: "p21", name: "大亨堡（起司）", store: "family", category: "carb", meals: ["breakfast","lunch"], kcal: 320, protein: 12, carbs: 30, fat: 16 },
  { id: "p22", name: "牛肉燴飯", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 480, protein: 20, carbs: 65, fat: 15 },
];

/* 品項分類與餐別的中文對照表，UI 會用到 */
const CATEGORY_LABELS = {
  protein: "蛋白質",
  carb: "主食",
  veg: "蔬菜/沙拉",
  soup: "湯品",
  dairy: "乳製品",
  drink: "飲品",
};

const STORE_LABELS = {
  "711": "7-ELEVEN",
  "family": "全家 FamilyMart",
};
