// ── 작품 상세 페이지(work.html) 스크립트 ── 작품 정보는 data/works.js 에 있어요.

// 주소의 ?id=번호 로 어떤 작품인지 알아내요 (예: work.html?id=1)
const id = parseInt(new URLSearchParams(location.search).get("id"), 10);
const w = works[id - 1];
const root = document.getElementById("detail");

if (!w) {
  root.innerHTML = `<p class="not-found">Work not found. <a href="index.html#work">Back to Work</a></p>`;
} else {
  document.title = `${w.title} — The Materiality of Christmas`;
  const prev = id > 1 ? `<a href="work.html?id=${id - 1}">← Prev</a>` : `<span></span>`;
  const next = id < works.length ? `<a href="work.html?id=${id + 1}">Next →</a>` : `<span></span>`;
  root.className = "detail";
  root.innerHTML = `
    <section class="text">
      <div class="text-inner">
        <div class="num">${id}</div>
        <div class="body">
          <h1 class="title">${w.title}</h1>
          <p class="artist">${w.artist}</p>
          <p class="desc">${w.description || ""}</p>
          <div class="nav">${prev}<a href="index.html#work">All Works</a>${next}</div>
        </div>
      </div>
    </section>
    <section class="images">
      ${w.images.map(src => `<img src="${src}" alt="${w.title}">`).join("")}
    </section>`;
}
