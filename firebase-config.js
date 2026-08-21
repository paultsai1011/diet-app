/* ==========================================================================
   firebase-config.js
   --------------------------------------------------------------------------
   這裡要填入「你自己的」Firebase 專案設定值。這些不是密碼、是可以放在
   前端程式碼裡的公開設定（Firebase 官方就是這樣設計的），安全性是靠
   Firestore 的「安全規則」把關，不是靠隱藏這幾個值。

   取得方式（免費，不用信用卡）：
   1. 到 https://console.firebase.google.com 用你的 Google 帳號登入
   2. 「新增專案」→ 取名（例如 diet-app）→ 一路下一步（不用開 Google Analytics 也行）
   3. 專案建立後，左側齒輪 icon →「專案設定」，往下捲到「你的應用程式」
   4. 點 </> (網頁) 圖示 → 註冊應用程式（暱稱隨意）→ 會出現一段 firebaseConfig
   5. 把裡面的值複製貼到下面對應欄位

   接著還要做兩件事（詳細步驟見 README.md）：
   a. 左側選單「Authentication」→「開始使用」→ 啟用「電子郵件/密碼」登入方式
   b. 左側選單「Firestore Database」→「建立資料庫」→ 選「以正式版模式啟動」
      建立後到「規則」分頁，貼上 README.md 裡提供的安全規則
   ========================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyAzjT1eDII9EUbRxGLalSqWma6ul-v44Bs",
  authDomain: "diet-app-eaf5c.firebaseapp.com",
  projectId: "diet-app-eaf5c",
  storageBucket: "diet-app-eaf5c.firebasestorage.app",
  messagingSenderId: "856449407106",
  appId: "1:856449407106:web:917ce5f2bc1c38fb62fc9b",
};
