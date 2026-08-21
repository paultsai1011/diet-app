# 超商飲控 · Diet App

純前端（HTML/CSS/JS），無後端、無資料庫，可直接放 GitHub Pages 免費host。

## 檔案
- `index.html` — 主頁面
- `style.css` — 樣式
- `products.js` — **商品資料庫，以後要更新品項就改這個檔案**
- `app.js` — BMR/TDEE 計算與推薦邏輯
- `sync.js` — 跨裝置同步邏輯（選填功能，見下方說明）
- `firebase-config.js` — 跨裝置同步要用的設定檔（選填，預設空白不影響本機使用）

## 本機測試
直接用瀏覽器打開 `index.html` 即可，或用任何簡易 server：
```
python3 -m http.server 8000
```

## 部署到 GitHub Pages（免費）

1. 到 GitHub 網站建立一個新的 public repository，例如叫 `diet-app`。
2. 把這個資料夾的四個檔案上傳上去（可以用網頁版「Add file → Upload files」拖曳，
   或用 git 指令，見下方）。
3. Repo 設定裡打開 **Settings → Pages**，Source 選 `main` 分支、`/ (root)` 資料夾，存檔。
4. 幾分鐘後就能用 `https://<你的帳號>.github.io/diet-app/` 打開。

### 用 git 指令上傳（在你自己的電腦終端機執行）
```bash
cd diet-app
git init
git add .
git commit -m "diet app v1"
git branch -M main
git remote add origin https://github.com/<你的帳號>/diet-app.git
git push -u origin main
```
第一次 push 時 GitHub 會要求登入 —— 網頁版 git 已經不接受帳號密碼，
系統會請你貼上一組 **Personal Access Token**，申請方式：
GitHub → 右上角頭像 → Settings → Developer settings → Personal access tokens →
Generate new token（勾選 `repo` 權限即可），把產生的 token 當密碼貼上去用一次。

## 之後怎麼持續更新品項
7-11 / 全家出新品時，打開 `products.js`，照著檔案裡的欄位說明，
在陣列裡新增一筆物件，存檔後重新 `git add . && git commit -m "update" && git push` 即可，
網站幾分鐘內就會更新，完全免費、不需要重新部署設定。

## 關於瀏覽器快取
`index.html` 裡引用 `app.js`、`products.js`、`sync.js` 時後面加了 `?v=2` 這種版本號，
是為了避免瀏覽器把舊版本的檔案快取住、更新後看不到最新內容。
**以後每次改了 `app.js`／`products.js`／`sync.js` 的內容，記得把 `index.html`
裡對應的 `?v=2` 改成 `?v=3`、`?v=4`……（每次更新都 +1），
這樣使用者（包括你自己）打開網站時瀏覽器才會抓到最新版，不用手動強制重新整理。

也可以在網頁的「新增品項」區塊先臨時加品項試用（存在瀏覽器 localStorage），
確定常吃再正式寫進 `products.js`。

## 跨裝置同步（選填功能）

如果不設定這一段，網站一樣完整可用，資料只會留在單一裝置上（跟原本一樣）。
想要手機、電腦資料互通，才需要做以下設定，全程免費、不用信用卡：

### 1. 建立 Firebase 專案
1. 前往 https://console.firebase.google.com，用 Google 帳號登入
2. 「新增專案」→ 取名（例如 diet-app）→ 一路下一步即可（Google Analytics 可以不開）

### 2. 啟用登入功能
左側選單「Authentication」→「開始使用」→「Sign-in method」分頁 →
啟用「電子郵件/密碼」。

### 3. 建立資料庫
左側選單「Firestore Database」→「建立資料庫」→ 選一個離台灣近的地區（例如
`asia-east1`）→ 先選「以正式版模式啟動」（等下會換成自訂規則）。

建立後點「規則」分頁，把內容整段換成：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

這條規則的意思是：只有登入的本人，能讀寫自己那一份資料，其他人看不到、改不到。
貼上後按「發布」。

### 4. 取得設定值並貼進檔案
左側齒輪 icon →「專案設定」→ 往下捲到「你的應用程式」→ 點 `</>`（網頁）圖示 →
註冊應用程式（暱稱隨意，不用勾 Firebase Hosting）→ 會出現一段 `firebaseConfig`。

把裡面 6 個值複製貼到 `firebase-config.js` 對應欄位，存檔後跟其他檔案一起上傳到
GitHub、覆蓋原本的版本即可。

### 5. 使用方式
打開網站最上方會多一個「跨裝置同步」卡片，輸入 email/密碼按「註冊新帳號」，
之後在另一台裝置用同一組帳號「登入」就會自動同步。不登入的話功能完全不受影響。

> 這幾個設定值不是密碼，是 Firebase 官方設計上可以公開放在網頁程式碼裡的值，
> 真正的安全控管是靠上面第 3 步設定的規則。
