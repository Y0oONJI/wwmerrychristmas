# The Materiality of Christmas

크리스마스 전시 웹페이지.

## 파일 구조

```
index.html          메인 — 표지(유리 글자) + 작품 목록
work.html           작품 상세 — work.html?id=1 처럼 번호로 열어요

data/works.js       ✏️ 작품 정보 (제목·작가·설명·이미지). 작품을 추가/수정할 땐 여기만
assets/images/      작품 이미지
assets/title.svg    타이틀 그래픽 (지금은 꺼둠)

css/common.css      모든 페이지 공통 — 색·폰트·선 색(:root), 헤더
css/main.css        메인 페이지 전용
css/work.css        상세 페이지 전용

js/header.js        공통 헤더 (메뉴는 여기서 수정)
js/main.js          메인 페이지 동작 — 유리 글자, 작품 카드, 썸네일 효과
js/work.js          상세 페이지 동작
```

## 자주 바꾸는 곳

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 작품 추가·수정 | `data/works.js` |
| 배경색·글자색·선 색·폰트 | `css/common.css` 맨 위 `:root` |
| 헤더 메뉴 | `js/header.js` |
| 썸네일 효과 (frosted / duotone / reeded / blur / none) | `js/main.js`의 `THUMB_STYLE` |
| 카드 길이 | `css/main.css`의 `.card` `aspect-ratio` |
