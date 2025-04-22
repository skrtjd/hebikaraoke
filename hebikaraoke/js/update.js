function createTable(content) {
  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  content.headers.forEach(headerText => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  content.rows.forEach(rowData => {
    const row = document.createElement("tr");
    rowData.forEach(cellData => {
      const td = document.createElement("td");
      td.textContent = cellData;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}

function getEmojiFromTitle(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("노래") || lowerTitle.includes("곡") || lowerTitle.includes("목록")) return "🎵";
  if (lowerTitle.includes("ui") || lowerTitle.includes("디자인") || lowerTitle.includes("레이아웃") || lowerTitle.includes("사이트")) return "🛠️";
  if (lowerTitle.includes("버그") || lowerTitle.includes("오류") || lowerTitle.includes("수정")) return "🐞";
  if (lowerTitle.includes("추가") || lowerTitle.includes("신규") || lowerTitle.includes("새로운")) return "✨";
  if (lowerTitle.includes("공지") || lowerTitle.includes("안내")) return "📢";
  return "📝";
}

function createUpdateBlock(update) {
  const emoji = getEmojiFromTitle(update.title);
  const section = document.createElement("section");
  section.className = "update-block";

  const header = document.createElement("h2");
  header.className = "update-header";
  header.textContent = `${emoji} ${update.title}`;
  section.appendChild(header);

  const contentBox = document.createElement("div");
  contentBox.className = "update-content";
  contentBox.style.display = "none";

  if (update.content.type === "table") {
    contentBox.appendChild(createTable(update.content));
  } else if (update.content.type === "list") {
    contentBox.appendChild(createList(update.content.items));
  } else if (update.content.type === "paragraph") {
    contentBox.appendChild(createParagraph(update.content.text));
  }

  section.appendChild(contentBox);

  // toggle 기능
  header.addEventListener("click", () => {
    const isVisible = contentBox.style.display === "block";
    contentBox.style.display = isVisible ? "none" : "block";
  });

  return section;
}

function createParagraph(text) {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

function createList(items) {
  const ul = document.createElement("ul");
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  return ul;
}

fetch("data/updates.json")
  .then(res => res.json())
  .then(data => {
    // 날짜 기준으로 정렬: title 또는 id에서 날짜 추출 (YYYYMMDD 형식 가정)
    data.sort((a, b) => {
      const getDateStr = str => str.match(/\d{8}/)?.[0] || "00000000";
      return getDateStr(b.title || b.id).localeCompare(getDateStr(a.title || a.id));
    });

    const container = document.getElementById("update-container");
    data.forEach(update => {
      const block = createUpdateBlock(update);
      container.appendChild(block);
    });
  })
  .catch(err => {
    console.error("업데이트 데이터를 불러오는 중 오류:", err);
    alert("업데이트 정보를 불러올 수 없습니다.");
  });
