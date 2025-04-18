const updates = [
  {
    id: 20250419,
    title: "업데이트 내역 제목 1",
    content: "2025년 4월 15일: 새로운 기능 추가 및 UI 개선을 했습니다.",
  },
  {
    id: 2,
    title: "업데이트 내역 제목 2",
    content: "2025년 4월 10일: 사이트 로딩 속도 개선 및 버그 수정.",
  },
  {
    id: 3,
    title: "업데이트 내역 제목 3",
    content: "2025년 4월 5일: 배너 이미지가 새롭게 적용되었습니다.",
  }
];

// 업데이트 페이지 내 전체 리스트용
const updateList = document.getElementById("update-list");
const updateContent = document.getElementById("update-content");

if (updateList && updateContent) {
  updates.forEach((item) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = item.title;
    link.href = "#";
    link.dataset.id = item.id;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      updateContent.innerText = item.content;
    });
    li.appendChild(link);
    updateList.appendChild(li);
  });
}

// 메인(index.html) 최근 업데이트 미리보기 (3개)
const mainList = document.getElementById("main-update-list");

if (mainList) {
  updates.slice(0, 3).forEach((item) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = item.title;
    link.href = "update.html";
    li.appendChild(link);
    mainList.appendChild(li);
  });
}
