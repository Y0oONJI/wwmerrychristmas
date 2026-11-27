// ✏️ 작품 정보 — 메인(목록)과 상세 페이지가 같이 써요. 여기만 고치면 둘 다 바뀌어요.
// title: 제목 / artist: 작가 / description: 상세 페이지 설명 (줄바꿈은 \n)
// images: 이미지 파일들 (assets/images/ 폴더에 넣고 경로를 적어요) — 첫 번째가 목록 카드에 나오고, 상세 페이지에는 전부 나와요. 비워두면 빈 칸.
// piece: 표지 조각 스티커 — shape는 모양, size는 크기(1440px 화면 기준 px), color는 호버했을 때 색.
const SAMPLE_DESC =
  "This is a placeholder description of the work. It introduces the idea behind the piece, " +
  "the materials it was made with, and how it relates to the theme of the exhibition.\n\n" +
  "Replace this text with the artist's own statement.";

const P = "assets/images/sample-portrait.png";   // 임시 세로 이미지
const L = "assets/images/sample-landscape.png";  // 임시 가로 이미지

const works = [
  { title: "Work Title 1", artist: "Artist Name", description: SAMPLE_DESC, images: [P, L], piece: { shape: "clover",    size: 170, color: "#7fb069" } },
  { title: "Work Title 2", artist: "Artist Name", description: SAMPLE_DESC, images: [L, P], piece: { shape: "star",      size: 175, color: "#edae49" } },
  { title: "Work Title 3", artist: "Artist Name", description: SAMPLE_DESC, images: [P, L], piece: { shape: "tree",      size: 170, color: "#3f7d4f" } },
  { title: "Work Title 4", artist: "Artist Name", description: SAMPLE_DESC, images: [L, P], piece: { shape: "ornament",  size: 160, color: "#d1495b" } },
  { title: "Work Title 5", artist: "Artist Name", description: SAMPLE_DESC, images: [P, L], piece: { shape: "gift",      size: 165, color: "#c0504d" } },
  { title: "Work Title 6", artist: "Artist Name", description: SAMPLE_DESC, images: [L, P], piece: { shape: "snowflake", size: 170, color: "#5b9bd5" } },
  { title: "Work Title 7", artist: "Artist Name", description: SAMPLE_DESC, images: [P, L], piece: { shape: "bell",      size: 160, color: "#e0a526" } },
  { title: "Work Title 8", artist: "Artist Name", description: SAMPLE_DESC, images: [L, P], piece: { shape: "wreath",    size: 175, color: "#4f8a5b" } },
];
