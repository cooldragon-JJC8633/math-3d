// assets/theme.js - 全站 3D 雙主題高對比色票與文字標籤引擎
const VISUAL_THEME = {
  dark: {
    plane: 0x3b82f6, planeEdge: 0x60a5fa, planeOpacity: 0.32,
    primary: 0xf97316, secondary: 0x10b981, highlight: 0xfacc15,
    boxEdge: 0x64748b, dashLine: 0x94a3b8,
    textMain: '#f8fafc', textMuted: '#94a3b8',
    textPrimary: '#fb923c', textSecondary: '#34d399', textHighlight: '#facc15', textAccent: '#60a5fa'
  },
  light: {
    plane: 0x2563eb, planeEdge: 0x1d4ed8, planeOpacity: 0.36,
    primary: 0xea580c, secondary: 0x059669, highlight: 0xd97706,
    boxEdge: 0x64748b, dashLine: 0x475569,
    textMain: '#0f172a', textMuted: '#475569',
    textPrimary: '#c2410c', textSecondary: '#047857', textHighlight: '#b45309', textAccent: '#1d4ed8'
  }
};

function getVisualTheme() {
  return document.body.classList.contains('light-theme') ? VISUAL_THEME.light : VISUAL_THEME.dark;
}

// 動態建立或更新 3D 空間文字標籤
function makeThemeSprite(text, colorKey, pos, scale = [2.1, 0.52, 1]) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true }));
  sp.position.copy(pos);
  sp.scale.set(...scale);
  sp.userData = { text, colorKey, canvas: c };
  refreshSpriteTexture(sp);
  return sp;
}

function refreshSpriteTexture(sp) {
  const { text, colorKey, canvas } = sp.userData;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const th = getVisualTheme();
  ctx.fillStyle = th[colorKey] || colorKey;
  ctx.font = '700 30px -apple-system, BlinkMacSystemFont, "Noto Sans TC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  if (sp.material.map) sp.material.map.dispose();
  sp.material.map = new THREE.CanvasTexture(canvas);
  sp.material.needsUpdate = true;
}
