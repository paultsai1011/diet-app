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

  // ---------- 7-11：先有名稱+熱量（來自官網商品列表），蛋白質/碳水待補 ----------
  { id: "p23", name: "極饗-香腸雙拼便當", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 701, protein: 0, carbs: 0, fat: 0, note: "蛋白質/碳水待更新" },
  { id: "p24", name: "Homeal x 壹番屋 奶油咖哩雞肉飯", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 592, protein: 0, carbs: 0, fat: 0, note: "蛋白質/碳水待更新" },
  { id: "p25", name: "Homeal x 日式牛丼", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 497, protein: 0, carbs: 0, fat: 0, note: "蛋白質/碳水待更新" },
  { id: "p26", name: "Homeal x 鄧師傅-客家小炒", store: "711", category: "protein", meals: ["lunch","dinner"], kcal: 310, protein: 0, carbs: 0, fat: 0, note: "蛋白質/碳水待更新" },
  { id: "p27", name: "Homeal x 鄧師傅-鳳梨糖醋肉", store: "711", category: "protein", meals: ["lunch","dinner"], kcal: 409, protein: 0, carbs: 0, fat: 0, note: "蛋白質/碳水待更新" },

  // ---------- 全家：有查到公開發布的完整/部分數據，來源是全家官方或營養師報導 ----------
  { id: "f01", name: "烤蛋白餐盒(健康志向)", store: "family", category: "carb", meals: ["lunch","dinner"], kcal: 463, protein: 22.2, carbs: 53.3, fat: 17.8 },
  { id: "f02", name: "健身G肉餐盒", store: "family", category: "carb", meals: ["lunch","dinner"], kcal: 588, protein: 29, carbs: 0, fat: 0, note: "碳水/脂肪待更新" },
  { id: "f03", name: "大麥蛋白豬肉堡", store: "family", category: "carb", meals: ["breakfast","lunch"], kcal: 325, protein: 0, carbs: 0, fat: 0, note: "蛋白質/碳水待更新" },
  { id: "f04", name: "莎莎烤雞麵沙拉", store: "family", category: "carb", meals: ["lunch","dinner"], kcal: 391, protein: 0, carbs: 0, fat: 0, note: "蛋白質/碳水待更新" },
  { id: "f05", name: "青醬優格雞肉握沙拉", store: "family", category: "carb", meals: ["breakfast","lunch"], kcal: 478, protein: 0, carbs: 0, fat: 0, note: "蛋白質/碳水待更新" },

  // ---------- 7-11 Simple Fit 活動頁（product_data.html?v=250613，官方 JSON 資料，數字可信度高） ----------
  // 「補充膳纖」分類：官網標示為每 100 克營養素，實際購買重量請自行對照包裝調整
  { id: "sf01", name: "現蒸地瓜", store: "711", category: "carb", meals: ["breakfast","lunch","dinner"], kcal: 121, protein: 1.8, fat: 0.5, carbs: 27.4, note: "每100克營養標示" },
  { id: "sf02", name: "現烤地瓜", store: "711", category: "carb", meals: ["breakfast","lunch","dinner"], kcal: 120, protein: 1.4, fat: 0.3, carbs: 28.0, note: "每100克營養標示" },
  { id: "sf03", name: "黃金玉米", store: "711", category: "carb", meals: ["breakfast","lunch","dinner"], kcal: 93, protein: 3.1, fat: 2.1, carbs: 15.4, note: "每100克營養標示" },
  { id: "sf04", name: "糯玉米", store: "711", category: "carb", meals: ["breakfast","lunch","dinner"], kcal: 156, protein: 4.3, fat: 1.8, carbs: 30.8, note: "每100克營養標示" },

  // 「一日野菜」分類
  { id: "sf05", name: "香蒜雞胸鮮蔬餐盒", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 359, protein: 20, fat: 9.8, carbs: 47.6 },
  { id: "sf06", name: "糯麥菇菇雞湯沙拉", store: "711", category: "soup", meals: ["lunch","dinner"], kcal: 90, protein: 8.1, fat: 2.1, carbs: 10.4 },
  { id: "sf07", name: "薯泥鮮蔬蛋沙拉", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 153, protein: 4.0, fat: 9.4, carbs: 13.2 },
  { id: "sf08", name: "一日野菜-活力彩蔬", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 98, protein: 2.6, fat: 3.3, carbs: 14.4 },
  { id: "sf09", name: "一日野菜-海藻沙拉", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 49, protein: 1.6, fat: 1.7, carbs: 6.9 },
  { id: "sf10", name: "凱薩雞肉沙拉", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 204, protein: 11.1, fat: 14.6, carbs: 7.0 },
  { id: "sf11", name: "豆酥烤魚鮮蔬餐盒", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 418, protein: 24.2, fat: 16.7, carbs: 42.7 },

  // 「減醣飲食」分類
  { id: "sf12", name: "搖搖沙拉-溏心蛋鮪魚", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 232, protein: 7.9, fat: 18.3, carbs: 9.0 },
  { id: "sf13", name: "搖搖沙拉-明太子蝦蝦", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 145, protein: 3.8, fat: 6.8, carbs: 17.1 },
  { id: "sf14", name: "和風生鮭繽紛時蔬沙拉餐", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 159, protein: 6.2, fat: 11.2, carbs: 8.4 },
  { id: "sf15", name: "溏心蛋洋芋", store: "711", category: "veg", meals: ["breakfast","lunch","dinner"], kcal: 176, protein: 6.2, fat: 9.9, carbs: 15.6 },
  { id: "sf16", name: "鮮蝦蛋沙拉", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 221, protein: 6.4, fat: 17.9, carbs: 8.6 },
  { id: "sf17", name: "優格彩蔬棒沙拉", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 114, protein: 2.1, fat: 8.6, carbs: 7.1 },
  { id: "sf18", name: "韓式泡菜冷烏龍麵", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 410, protein: 10.4, fat: 10.4, carbs: 68.8 },
  { id: "sf19", name: "日式雞蛋沙拉三明治", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 247, protein: 8.3, fat: 13.2, carbs: 23.8 },
  { id: "sf20", name: "鮪魚雞肉蔬菜捲餅", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 310, protein: 8.2, fat: 17.6, carbs: 29.6 },

  // 「蛋白質系列」分類
  { id: "sf21", name: "21PLUS主廚烤雞時蔬餐", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 432, protein: 25.5, fat: 16.6, carbs: 45.1 },
  { id: "sf22", name: "越式酸辣雞絲冷麵", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 397, protein: 17.5, fat: 11.4, carbs: 56.2 },
  { id: "sf23", name: "21 Plus義式烤雞堅果沙拉", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 207, protein: 14.0, fat: 11.8, carbs: 11.3 },
  { id: "sf24", name: "地瓜雞胸肉沙拉", store: "711", category: "veg", meals: ["breakfast","lunch","dinner"], kcal: 126, protein: 10.9, fat: 4.7, carbs: 9.9 },
  { id: "sf25", name: "義式烤番茄雞胸時蔬沙拉餐", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 165, protein: 12.6, fat: 4.0, carbs: 19.6 },
  { id: "sf26", name: "北海道蕎麥風味沾麵", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 336, protein: 13.6, fat: 4.9, carbs: 59.3 },
  { id: "sf27", name: "溏心蛋紐奧良風味烤雞三明治", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 235, protein: 15.3, fat: 10.1, carbs: 20.7 },
  { id: "sf28", name: "凱薩風味嫩雞鮮蔬捲餅", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 320, protein: 12.6, fat: 15.9, carbs: 31.5 },
  { id: "sf29", name: "吉士豬肉堡加蛋", store: "711", category: "carb", meals: ["breakfast","lunch"], kcal: 276, protein: 16.2, fat: 11.0, carbs: 28.0 },
  { id: "sf30", name: "櫛瓜溏心蛋時蔬沙拉餐", store: "711", category: "veg", meals: ["lunch","dinner"], kcal: 172, protein: 12.8, fat: 5.3, carbs: 18.3 },
  { id: "sf31", name: "烤雞纖穀時蔬沙拉餐", store: "711", category: "carb", meals: ["lunch","dinner"], kcal: 318, protein: 13.3, fat: 23.2, carbs: 20.2 },
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
