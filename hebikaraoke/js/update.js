fetch("data/updates.json")
  .then(response => response.json())
  .then(renderUpdates)
  .catch(error => console.error("업데이트 데이터를 불러오는 중 오류 발생:", error));

function renderUpdates(updates) {
  const container = document.getElementById("update-container");

  updates.forEach(update => {
    const section = document.createElement("section");
    section.className = "update-block";
    section.id = `update-${update.id}`;

    const title = document.createElement("h2");
    title.textContent = update.title;
    section.appendChild(title);

    const contentType = update.content.type;

    if (contentType === "table") {
      section.appendChild(createTable(update.content));
    } else if (contentType === "text") {
      section.appendChild(createParagraph(update.content.body));
    } else if (contentType === "list") {
      section.appendChild(createList(update.content.items));
    }

    container.appendChild(section);
  });
}

// table 콘텐츠 생성
function
