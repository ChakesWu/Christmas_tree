const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// ---------- 雪花 ----------
const snowCount = 200;
const snows = [];

function initSnow() {
  for (let i = 0; i < snowCount; i++) {
    snows.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 1,
      speedY: Math.random() * 1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
    });
  }
}

function updateSnow() {
  for (const s of snows) {
    s.y += s.speedY;
    s.x += s.speedX;
    if (s.y > H) {
      s.y = -10;
      s.x = Math.random() * W;
    }
    if (s.x < 0) s.x = W;
    if (s.x > W) s.x = 0;
  }
}

function drawSnow() {
  ctx.fillStyle = "#ffffff";
  for (const s of snows) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ---------- 聖誕樹 ----------
function drawTree() {
  // 樹幹
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(W / 2 - 20, H - 120, 40, 80);

  // 三層樹葉
  drawTriangle(W / 2, H - 150, 260, "#0f7a2a");
  drawTriangle(W / 2, H - 220, 200, "#0da632");
  drawTriangle(W / 2, H - 290, 140, "#16c946");

  // 星星
  drawStar(W / 2, H - 340, 18, "#ffd700");

  // 裝飾球
  const ornaments = [
    { x: W / 2 - 60, y: H - 190 },
    { x: W / 2 + 50, y: H - 210 },
    { x: W / 2 - 30, y: H - 250 },
    { x: W / 2 + 20, y: H - 270 },
    { x: W / 2, y: H - 220 },
    { x: W / 2 + 70, y: H - 160 },
    { x: W / 2 - 80, y: H - 160 },
  ];
  const colors = ["#ff4b5c", "#f9c74f", "#4dabf7", "#f9844a", "#f72585"];
  ornaments.forEach((o, i) => {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.arc(o.x, o.y, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // 中文祝福
  ctx.fillStyle = "#F5E16F";
  ctx.font = "bold 20px 'Microsoft YaHei', '黑体', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("陳雪薇 聖誕快樂", W / 2, H - 20);
}

function drawTriangle(cx, cy, width, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - width / 2.2);
  ctx.lineTo(cx - width / 2, cy + width / 2);
  ctx.lineTo(cx + width / 2, cy + width / 2);
  ctx.closePath();
  ctx.fill();
}

function drawStar(cx, cy, outerR, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = color;
  ctx.beginPath();
  const spikes = 5;
  const innerR = outerR / 2.5;
  const step = Math.PI / spikes;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const x = Math.cos(i * step) * r;
    const y = Math.sin(i * step) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ---------- 動畫主迴圈 ----------
function animate() {
  ctx.clearRect(0, 0, W, H);
  drawTree();
  updateSnow();
  drawSnow();
  requestAnimationFrame(animate);
}

initSnow();
animate();
