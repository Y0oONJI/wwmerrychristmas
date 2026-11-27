// ── 메인 페이지(index.html) 스크립트 ── 작품 정보는 data/works.js 에 있어요.

const hero = document.getElementById("hero");

// 크기가 바뀌는 동안 계속 다시 그리지 않고, 다 바뀐 뒤 한 번만 실행해요
// (창 크기뿐 아니라 헤더 높이가 바뀌어 표지 크기가 달라질 때도 알아채요)
function onResizeDone(fn, el = document.documentElement) {
  let t;
  new ResizeObserver(() => { clearTimeout(t); t = setTimeout(fn, 100); }).observe(el);
}

// 유리 글자 모양 만들기 — 표지 크기에 맞춰 글자를 그리고, 그 모양대로 유리 효과를 오려내요
// 위: The Materiality / 가운데: of / 아래: Christmas (조금 더 크게, 아래 끝에 닿게)
const GLASS_FONT = "700 100px Inter, Helvetica Neue, Arial, sans-serif";
function drawGlassTitle() {
  const W = hero.clientWidth, H = hero.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  const cv = document.createElement("canvas");
  cv.width = W * dpr; cv.height = H * dpr;
  const ctx = cv.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  if ("letterSpacing" in ctx) ctx.letterSpacing = "-2px"; // 살짝 좁게

  // 각 줄이 차지할 너비(표지 너비 대비)로 글자 크기를 정해요
  const fit = (text, ratio) => {
    ctx.font = GLASS_FONT;
    return 100 * (W * ratio) / ctx.measureText(text).width;
  };
  const topSize = fit("The Materiality", 0.96);
  const bottomSize = fit("Christmas", 0.98);
  const font = size => GLASS_FONT.replace("100px", size.toFixed(1) + "px");

  ctx.font = font(topSize);
  ctx.fillText("The Materiality", W / 2, topSize * 0.82);           // 맨 위
  ctx.fillText("of", W / 2, H / 2 + topSize * 0.35);                // 가운데
  ctx.font = font(bottomSize);
  ctx.fillText("Christmas", W / 2, H - bottomSize * 0.02);          // 맨 아래 (살짝 잘리게)

  document.documentElement.style.setProperty("--glass-mask", `url(${cv.toDataURL()})`);
  document.getElementById("glassTitle").classList.add("ready"); // 글자 모양이 생긴 뒤에만 보이게
}
document.fonts.load(GLASS_FONT).finally(() => {
  drawGlassTitle();                  // 폰트 준비되면 바로 한 번 그리고
  onResizeDone(drawGlassTitle, hero); // 표지 크기가 바뀔 때마다 다시
});

/* ── 조각 스티커: 잠시 꺼둠 (다시 쓰려면 이 줄과 아래 닫는 줄만 지우면 돼요) ──
// 표지를 보이지 않는 칸으로 나눠 칸마다 조각 하나씩 넣고, 칸 안에서만 살짝 흔들어요.
const order = works.map((_, i) => i).sort(() => Math.random() - 0.5); // 어느 칸에 들어갈지 섞기
const stickers = works.map((w, i) => {
  const a = document.createElement("a");
  a.className = "sticker";
  a.href = `#work-${i + 1}`;
  a.title = w.title;
  a.style.setProperty("--size", w.piece.size);
  a.style.setProperty("--rotate", (Math.random() * 50 - 25) + "deg");
  a.dataset.jx = Math.random() * 2 - 1; // 칸 안에서 흔들 정도 (-1 ~ 1)
  a.dataset.jy = Math.random() * 2 - 1;
  // 흰 테두리(두꺼운 흰 선) 위에 색 조각을 한 번 더 겹쳐서 스티커처럼
  a.innerHTML = `
    <svg viewBox="-40 -40 580 580">
      <use href="#piece-${w.piece.shape}" fill="#fff" stroke="#fff" stroke-width="50" stroke-linejoin="round"/>
      <use href="#piece-${w.piece.shape}" fill="#9a9a9a"/>
      <use href="#piece-${w.piece.shape}" fill="${w.piece.color}" class="color"/>
    </svg>`;
  hero.appendChild(a);
  return a;
});

function layout() {
  const n = stickers.length;
  const W = hero.clientWidth, H = hero.clientHeight;
  // 표지를 보이지 않는 칸으로 나눠 칸마다 하나씩 — 고르게 퍼지게
  const areaW = W * 0.85, areaH = H * 0.8;
  const left0 = (W - areaW) / 2, top0 = (H - areaH) / 2;
  const cols = Math.max(1, Math.round(Math.sqrt(n * areaW / areaH)));
  const rows = Math.ceil(n / cols);
  const cw = areaW / cols, ch = areaH / rows;
  stickers.forEach((a, i) => {
    const cell = order[i];
    const c = cell % cols, r = Math.floor(cell / cols);
    const half = a.offsetWidth / 2 + 12; // 화면 밖으로 안 잘리게
    let x = left0 + (c + 0.5) * cw + a.dataset.jx * cw * 0.25; // 칸 가운데 ± 살짝 흔들기
    let y = top0 + (r + 0.5) * ch + a.dataset.jy * ch * 0.25;
    a.style.left = Math.min(W - half, Math.max(half, x)) + "px";
    a.style.top = Math.min(H - half, Math.max(half, y)) + "px";
  });
}
layout();
onResizeDone(layout, hero);
── 조각 스티커 끝 ── */

const grid = document.getElementById("work");

// 썸네일 효과 고르기: "duotone"(한 색조) / "frosted"(서리 유리) / "reeded"(골진 유리) / "blur"(흐리게) / "grain"(입자) / "none"(원본)
// "compare"는 비교 모드 — 줄마다 다른 효과가 들어가요. 하나로 정하면 그 이름으로 바꾸면 돼요.
const THUMB_STYLE = "frosted";
const COMPARE = ["duotone", "frosted", "reeded", "blur"]; // 1줄, 2줄, 3줄, 4줄 순서
works.forEach((w, i) => {
  const card = document.createElement("a");
  card.href = `work.html?id=${i + 1}`; // 누르면 상세 페이지로
  card.className = "card";
  card.id = `work-${i + 1}`;
  card.innerHTML = `
    <div class="num">${i + 1}</div>
    <div class="info">
      <h2 class="title">${w.title}</h2>
      <p class="artist">${w.artist}</p>
    </div>
    <div class="image">
      ${w.images[0] ? `<img src="${w.images[0]}" alt="${w.title}">` : `<div class="placeholder"></div>`}
    </div>`;
  grid.appendChild(card);
});

// 카드마다 효과 붙이기 (비교 모드면 줄 번호에 따라)
function applyThumbStyle() {
  const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length; // 지금 한 줄에 카드 몇 개인지
  [...grid.children].forEach((card, i) => {
    const fx = THUMB_STYLE === "compare" ? COMPARE[Math.floor(i / cols) % COMPARE.length] : THUMB_STYLE;
    card.className = `card fx-${fx}`;
    const num = card.querySelector(".num");
    num.innerHTML = `${i + 1}` + (THUMB_STYLE === "compare" ? `<span class="fx-label">${fx}</span>` : "");
  });
}
applyThumbStyle();
if (THUMB_STYLE === "compare") onResizeDone(applyThumbStyle, grid); // 비교 모드일 때만 줄 수가 바뀌면 다시 계산
