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
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
