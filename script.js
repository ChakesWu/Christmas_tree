const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// ---------- 座標工具：模擬 turtle ----------
let tX = 0;
let tY = 0;
let tAngle = 0; // 度數，0 向右，90 向下

function degToRad(d) {
  return (d * Math.PI) / 180;
}

function turtleGoto(x, y) {
  tX = x;
  tY = y;
}

function turtleSetHeading(deg) {
  tAngle = deg;
}

function turtleForward(len, stroke = true) {
  const rad = degToRad(tAngle);
  const nx = tX + Math.cos(rad) * len;
  const ny = tY + Math.sin(rad) * len;
  if (stroke) {
    ctx.beginPath();
    ctx.moveTo(tX, tY);
    ctx.lineTo(nx, ny);
    ctx.stroke();
  }
  tX = nx;
  tY = ny;
}

function turtleRight(deg) {
  tAngle += deg;
}

function turtleLeft(deg) {
  tAngle -= deg;
}

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

// ---------- 聖誕樹主體（近似原始 turtle） ----------
function drawTreeBody() {
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#0da632";

  // 第一層
  turtleGoto(W / 2, H / 2 - 150);
  turtleSetHeading(240); // -120
  for (let i = 0; i < 10; i++) turtleForward(12);

  turtleGoto(W / 2, H / 2 - 150);
  turtleSetHeading(300); // -60
  for (let i = 0; i < 10; i++) turtleForward(12);

  // 第二層
  turtleGoto(W / 2 - 55, H / 2 - 16);
  turtleSetHeading(240);
  for (let i = 0; i < 10; i++) turtleForward(8);

  turtleGoto(W / 2 + 50, H / 2 - 15);
  turtleSetHeading(300);
  for (let i = 0; i < 10; i++) turtleForward(8);

  // 第三層
  turtleGoto(W / 2 - 100, H / 2 + 40);
  turtleSetHeading(240);
  for (let i = 0; i < 10; i++) turtleForward(6);

  turtleGoto(W / 2 + 80, H / 2 + 41);
  turtleSetHeading(310);
  for (let i = 0; i < 10; i++) turtleForward(6);

  // 第四層
  turtleGoto(W / 2 - 120, H / 2 + 95);
  turtleSetHeading(250);
  for (let i = 0; i < 7; i++) turtleForward(10);

  turtleGoto(W / 2 + 100, H / 2 + 95);
  turtleSetHeading(310);
  for (let i = 0; i < 7; i++) turtleForward(10);
}

function drawTrunk() {
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 10;

  turtleGoto(W / 2 - 35, H / 2 + 155);
  turtleSetHeading(275);
  for (let i = 0; i < 3; i++) turtleForward(5);

  turtleGoto(W / 2 + 35, H / 2 + 155);
  turtleSetHeading(265);
  for (let i = 0; i < 3; i++) turtleForward(5);

  turtleSetHeading(190);
  turtleForward(120);
}

// 星星（替代 koc）
function drawStar(cx, cy, size) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  const spikes = 5;
  const outerR = size;
  const innerR = size / 2.5;
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

// 小蝴蝶結（近似 uit）
function drawSmallBow(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = "#f799e6";
  ctx.fillStyle = "#f799e6";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-15, 0);
  ctx.quadraticCurveTo(-25, -15, -5, -15);
  ctx.quadraticCurveTo(-25, 0, -15, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.quadraticCurveTo(25, -15, 5, -15);
  ctx.quadraticCurveTo(25, 0, 15, 0);
  ctx.fill();

  ctx.restore();
}

// 大蝴蝶結（近似 hdj）
function drawBigBow(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = "#f799e6";
  ctx.fillStyle = "#f799e6";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-25, 0);
  ctx.quadraticCurveTo(-40, -20, -5, -25);
  ctx.quadraticCurveTo(-35, 0, -25, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(25, 0);
  ctx.quadraticCurveTo(40, -20, 5, -25);
  ctx.quadraticCurveTo(35, 0, 25, 0);
  ctx.fill();

  ctx.restore();
}

function drawHat() {
  ctx.save();
  ctx.translate(W / 2 - 20, H / 2 + 20);

  // 白色帽沿
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(20, 0);
  ctx.arc(20, 0, 4, 0, Math.PI, true);
  ctx.lineTo(-20, 0);
  ctx.arc(-20, 0, 4, 0, Math.PI, true);
  ctx.fill();

  // 紅色帽身
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(-15, 0);
  ctx.lineTo(0, -35);
  ctx.lineTo(20, -5);
  ctx.closePath();
  ctx.fill();

  // 頂端白球
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(0, -35, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawSock() {
  ctx.save();
  ctx.translate(W / 2 - 20, H / 2 - 60);

  // 白色邊
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(-15, 0);
  ctx.lineTo(15, 0);
  ctx.arc(15, 0, 4, 0, Math.PI, true);
  ctx.lineTo(-15, 0);
  ctx.arc(-15, 0, 4, 0, Math.PI, true);
  ctx.fill();

  // 紅色襪身
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(-10, 25);
  ctx.quadraticCurveTo(-5, 35, 10, 30);
  ctx.lineTo(10, 10);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawDecorations() {
  // 星星
  drawStar(W / 2 - 120, H / 2 + 30, 10);
  drawStar(W / 2 + 100, H / 2 - 20, 10);
  drawStar(W / 2 + 10, H / 2 - 70, 10);
  drawStar(W / 2 - 80, H / 2 - 90, 10);
  drawStar(W / 2 + 100, H / 2 + 140, 10);
  drawStar(W / 2 - 140, H / 2 + 140, 10);
  drawStar(W / 2 + 20, H / 2 - 140, 10);
  drawStar(W / 2, H / 2 - 200, 18);

  // 蝴蝶結
  drawSmallBow(W / 2 + 40, H / 2 + 150);
  drawBigBow(W / 2 - 80, H / 2 + 100);
  drawBigBow(W / 2 + 40, H / 2 + 10);
  drawSmallBow(W / 2 - 20, H / 2 + 30);
  drawBigBow(W / 2 - 30, H / 2 - 40);
  drawSmallBow(W / 2 + 30, H / 2 - 80);
}

function drawGreeting() {
  ctx.fillStyle = "#F5E16F";
  ctx.font = "bold 20px 'Microsoft YaHei', '黑体', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("陳雪薇 聖誕快樂", W / 2 + 80, H - 20);
}

// ---------- 聖誕樹整體 ----------
function drawTree() {
  drawTreeBody();
  drawTrunk();
  drawHat();
  drawSock();
  drawDecorations();
  drawGreeting();
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
