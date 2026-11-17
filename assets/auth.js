// assets/auth.js - 輕量化付費解鎖控制模組
const ACCESS_CONFIG = {
  passcode: "0000", // 【你以後只要改這裡就能換密碼】
  storageKey: "math3d_g11_s2_unlocked",
  buyUrl: "https://portaly.cc/" // 【未來換成你的 Portaly 商品購買連結】
};

function isUnlocked() {
  return localStorage.getItem(ACCESS_CONFIG.storageKey) === "true";
}

function verifyPasscode(input) {
  if (input && input.trim().toUpperCase() === ACCESS_CONFIG.passcode.toUpperCase()) {
    localStorage.setItem(ACCESS_CONFIG.storageKey, "true");
    return true;
  }
  return false;
}

// 供模板內頁呼叫：若該題被鎖定且尚未解鎖，直接遮罩整個畫面要求輸入密碼
function enforcePageLock(isLocked) {
  if (!isLocked || isUnlocked()) return;

  const overlay = document.createElement("div");
  overlay.id = "lock-overlay";
  overlay.style.cssText = `
    position: fixed; inset: 0; background: rgba(11, 15, 25, 0.96);
    backdrop-filter: blur(8px); z-index: 9999; display: flex;
    align-items: center; justify-content: center; padding: 20px;
  `;
  overlay.innerHTML = `
    <div style="max-width: 380px; width: 100%; background: #131a2a; border: 1px solid #243049; border-radius: 12px; padding: 24px; text-align: center; color: #f1f5f9;">
      <div style="font-size: 12px; color: #3b82f6; font-weight: 700; letter-spacing: 0.08em; margin-bottom: 6px;">完整版專屬內容</div>
      <h2 style="font-size: 18px; margin: 0 0 10px 0;">輸入通行密碼解鎖全單元模型</h2>
      <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 18px 0;">
        本題包含完整 3D 空間互動構造與考場破題直覺。請輸入購買後取得的專屬通行碼（輸入一次即可解鎖全部題目）。
      </p>
      <input id="pass-input" type="text" placeholder="請輸入通行密碼（測試碼：VEC2026）"
        style="width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #243049; background: #0b0f19; color: #f1f5f9; font-size: 14px; margin-bottom: 10px; text-align: center; letter-spacing: 0.05em;" />
      <div id="pass-error" style="color: #f87171; font-size: 12px; min-height: 18px; margin-bottom: 10px;"></div>
      <button id="btn-unlock"
        style="width: 100%; padding: 10px; border-radius: 6px; border: none; background: #3b82f6; color: #fff; font-weight: 600; font-size: 14px; cursor: pointer; margin-bottom: 10px;">
        驗證並解鎖
      </button>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding-top: 8px; border-top: 1px solid #243049;">
        <a href="../index.html" style="color: #94a3b8; text-decoration: none;">← 返回免費試用題目</a>
        <a href="${ACCESS_CONFIG.buyUrl}" target="_blank" style="color: #60a5fa; text-decoration: none; font-weight: 600;">尚未取得密碼？前往購買 →</a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const inputEl = document.getElementById("pass-input");
  const errEl = document.getElementById("pass-error");
  const submit = () => {
    if (verifyPasscode(inputEl.value)) {
      overlay.remove();
    } else {
      errEl.textContent = "密碼錯誤，請確認大小寫或聯繫客服";
      inputEl.style.borderColor = "#f87171";
    }
  };
  document.getElementById("btn-unlock").onclick = submit;
  inputEl.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
}
