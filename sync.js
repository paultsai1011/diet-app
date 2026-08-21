/* ==========================================================================
   sync.js — 雲端同步（選填功能）
   --------------------------------------------------------------------------
   邏輯：
   - 沒登入時，一切照舊只存在 localStorage（跟原本一樣，完全可用）。
   - 登入後：先把雲端資料抓下來覆蓋本機（以雲端為準），之後每次本機存檔
     都會順便同步一份到雲端（Firestore，路徑 users/{uid}）。
   - 沒有填 firebase-config.js 的話，這個檔案會自動偵測並停用同步、
     不影響本機版功能。
   ========================================================================== */

let syncEnabled = false;
let currentUser = null;

function isFirebaseConfigured() {
  return (
    typeof firebaseConfig !== "undefined" &&
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.includes("在這裡貼上")
  );
}

let auth, db;

if (isFirebaseConfigured() && typeof firebase !== "undefined") {
  try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    syncEnabled = true;
  } catch (e) {
    console.warn("Firebase 初始化失敗，改用本機模式：", e);
    syncEnabled = false;
  }
}

function userDocRef(uid) {
  return db.collection("users").doc(uid);
}

// 把目前 localStorage 裡的四份資料整包推到雲端
async function pushToCloud() {
  if (!syncEnabled || !currentUser) return;
  try {
    const data = {
      profile: JSON.parse(localStorage.getItem(LS_PROFILE) || "null"),
      records: JSON.parse(localStorage.getItem(LS_RECORDS) || "[]"),
      customItems: JSON.parse(localStorage.getItem(LS_CUSTOM_ITEMS) || "[]"),
      mealLog: JSON.parse(localStorage.getItem(LS_MEAL_LOG) || "[]"),
      gender: localStorage.getItem(LS_GENDER) || "female",
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await userDocRef(currentUser.uid).set(data, { merge: true });
    setSyncStatus("✓ 已同步");
  } catch (e) {
    console.warn("同步失敗：", e);
    setSyncStatus("⚠ 同步失敗，稍後會自動重試");
  }
}

// 把雲端資料抓下來覆蓋本機（登入當下執行一次）
async function pullFromCloud() {
  if (!syncEnabled || !currentUser) return;
  const snap = await userDocRef(currentUser.uid).get();
  if (snap.exists) {
    const data = snap.data();
    if (data.profile) localStorage.setItem(LS_PROFILE, JSON.stringify(data.profile));
    localStorage.setItem(LS_RECORDS, JSON.stringify(data.records || []));
    localStorage.setItem(LS_CUSTOM_ITEMS, JSON.stringify(data.customItems || []));
    localStorage.setItem(LS_MEAL_LOG, JSON.stringify(data.mealLog || []));
    if (data.gender) localStorage.setItem(LS_GENDER, data.gender);
  } else {
    // 雲端還沒有資料（第一次登入），把本機現有的資料當作初始值推上去
    await pushToCloud();
  }
}

// 給各個「新增/刪除/儲存」按鈕呼叫用：本機存完後，若已登入就順便同步
function maybeSync() {
  if (syncEnabled && currentUser) pushToCloud();
}

function setSyncStatus(text) {
  const el = document.getElementById("syncStatus");
  if (el) el.textContent = text;
}

function updateAuthUI(user) {
  const loginForm = document.getElementById("syncLoginForm");
  const loggedInView = document.getElementById("syncLoggedIn");
  const emailLabel = document.getElementById("syncEmailLabel");

  if (!syncEnabled) {
    document.getElementById("syncCard").style.display = "none";
    return;
  }

  if (user) {
    loginForm.style.display = "none";
    loggedInView.style.display = "block";
    emailLabel.textContent = user.email;
    setSyncStatus("✓ 已同步");
  } else {
    loginForm.style.display = "block";
    loggedInView.style.display = "none";
  }
}

function initSyncUI() {
  if (!syncEnabled) {
    const card = document.getElementById("syncCard");
    if (card) card.style.display = "none";
    return;
  }

  auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    updateAuthUI(user);
    if (user) {
      setSyncStatus("同步中…");
      await pullFromCloud();
      // 不整頁重新整理，直接請主程式重新渲染畫面內容，避免無限重整
      if (typeof window.refreshAppUI === "function") {
        window.refreshAppUI();
      }
      setSyncStatus("✓ 已同步");
    }
  });

  document.getElementById("syncLoginBtn").addEventListener("click", async () => {
    const email = document.getElementById("syncEmail").value.trim();
    const password = document.getElementById("syncPassword").value;
    if (!email || !password) return alert("請輸入 email 和密碼");
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        alert("找不到這個帳號，如果是第一次使用，請按下方「註冊新帳號」");
      } else {
        alert("登入失敗：" + e.message);
      }
    }
  });

  document.getElementById("syncRegisterBtn").addEventListener("click", async () => {
    const email = document.getElementById("syncEmail").value.trim();
    const password = document.getElementById("syncPassword").value;
    if (!email || !password) return alert("請輸入 email 和密碼");
    if (password.length < 6) return alert("密碼至少要 6 個字元");
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      alert("註冊失敗：" + e.message);
    }
  });

  document.getElementById("syncLogoutBtn").addEventListener("click", async () => {
    await auth.signOut();
    if (typeof window.refreshAppUI === "function") {
      window.refreshAppUI();
    }
  });
}
