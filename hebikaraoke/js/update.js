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
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/updates.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("update-container");

      data.forEach(update => {
        const section = document.createElement("section");
        section.id = update.id;

        const title = document.createElement("h2");
        title.textContent = update.title;
        section.appendChild(title);

        if (update.content.type === "table") {
          section.appendChild(createTable(update.content));
        } else if (update.content.type === "paragraph") {
          section.appendChild(createParagraph(update.content.text));
        } else if (update.content.type === "list") {
          section.appendChild(createList(update.content.items));
        }

        container.appendChild(section);
      });
    })
    .catch(err => {
      console.error("업데이트 데이터를 불러오는 중 오류 발생:", err);
      const container = document.getElementById("update-container");
      container.textContent = "업데이트 정보를 불러오는 데 실패했습니다.";
    });
});
