// js/original.js
fetch('data/original_songs.json')
  .then(response => response.json())
  .then(data => {
    if (!Array.isArray(data)) throw new Error("데이터 형식 오류!");
    renderOriginalSongs(data);
  })
  .catch(err => {
    console.error("Original song data load error:", err);
    alert("데이터를 불러오는 중 오류가 발생했습니다. 콘솔을 확인해주세요!");
  });

function renderOriginalSongs(songs) {
  const container = document.getElementById('original-song-container');

  songs.forEach(song => {
    const table = document.createElement("table");
    table.className = "song-entry";

    const videoCell = song.youtube
      ? `<iframe width="300" height="169" src="${song.youtube}" frameborder="0" allowfullscreen></iframe>`
      : "영상 없음";

    table.innerHTML = `
      <tr>
        <td colspan="2" class="song-title"><strong>${song.title}</strong></td>
      </tr>
      <tr>
        <td class="song-info">
          <p><strong>번호:</strong> ${song.order}</p>
          <p><strong>공개일:</strong> ${song.releaseDate}</p>
          <p>
            <strong>TJ:</strong> ${song.karaoke.TJ} |
            <strong>KY:</strong> ${song.karaoke.KY} |
            <strong>JS:</strong> ${song.karaoke.JS}
          </p>
          <button class="toggle-lyrics">가사 보기</button>
          <pre class="lyrics" style="display:none;">${song.lyrics}</pre>
        </td>
        <td class="song-video">${videoCell}</td>
      </tr>
    `;

    container.appendChild(table);
  });

  document.querySelectorAll(".toggle-lyrics").forEach(button =>
    button.addEventListener("click", function () {
      const lyrics = this.nextElementSibling;
      const isVisible = lyrics.style.display === "block";
      lyrics.style.display = isVisible ? "none" : "block";
      this.textContent = isVisible ? "가사 보기" : "가사 닫기";
    })
  );
}
