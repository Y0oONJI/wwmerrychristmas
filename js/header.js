// ── 공통 헤더 ──
// 페이지마다 아래 두 줄만 넣으면 같은 헤더가 들어가요.
//   <link rel="stylesheet" href="css/common.css">  (head 안)
//   <script src="js/header.js"></script>           (body 맨 위)
// 메뉴를 바꾸려면 아래 내용만 고치면 모든 페이지에 똑같이 반영돼요.
document.currentScript.insertAdjacentHTML("beforebegin", `
  <header class="site-header">
    <div class="inner">
      <a class="site-title" href="index.html">The Materiality of Christmas</a>
      <nav>
        <a href="index.html#work">Work</a>
      </nav>
    </div>
  </header>
`);

// 헤더 실제 높이를 재서 --header-h에 넣어요 (표지 높이·스크롤 위치 계산에 씀)
// 폰트가 늦게 불러와지거나 창 크기가 바뀌어 헤더 높이가 달라질 때마다 자동으로 다시 재요
const siteHeader = document.querySelector(".site-header");
new ResizeObserver(() => {
  document.documentElement.style.setProperty("--header-h", siteHeader.offsetHeight + "px");
}).observe(siteHeader);
