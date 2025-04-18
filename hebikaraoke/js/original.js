fetch('data/original_songs.json')
  .then(response => response.json())
  .then(data => renderOriginalSongs(data))
  .catch(err => console.error("Original song data load error:", err));

function renderOriginalSongs(songs) {
  const container = document.getElementById('original-song-container');

  const table = document.createElement('table');
  table.classList.add('song-table');

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>순서</th>
      <th>곡명</th>
      <th>공개일</th>
      <th>영상</th>
      <th>가사</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  songs.forEach(song => {
    const tr = document.createElement('tr');

    const videoCell = song.youtube !== "X"
      ? `<iframe width="200" height="113" src="${song.youtube}" frameborder="0" allowfullscreen></iframe>`
      : "-";

    tr.innerHTML = `
      <td>${song.order}</td>
      <td>${song.title}</td>
      <td>${song.releaseDate}</td>
      <td>${videoCell}</td>
      <td>
        <button class="toggle-lyrics">가사 보기</button>
        <pre class="lyrics" style="display:none; white-space: pre-wrap;">${song.lyrics}</pre>
      </td>
    `;

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  // 가사 토글 버튼에 이벤트 리스너 추가
  document.querySelectorAll(".toggle-lyrics").forEach(button =>
    button.addEventListener("click", function () {
      const lyrics = this.nextElementSibling;
      const isVisible = lyrics.style.display === "block";
      lyrics.style.display = isVisible ? "none" : "block";
      this.textContent = isVisible ? "가사 보기" : "가사 닫기";
    })
  );
}
