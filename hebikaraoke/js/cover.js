document.addEventListener("DOMContentLoaded", () => {
  fetch("data/cover_songs.json")
    .then(res => res.json())
    .then(data => renderCoverSongs(data))
    .catch(err => console.error("Cover song data load error:", err));

  function renderCoverSongs(songs) {
    const container = document.getElementById("coverList");

    songs.forEach(song => {
      const songSection = document.createElement("section");
      songSection.className = "song-entry";

      songSection.innerHTML = `
        <h2 class="song-title">${song.title}</h2>
        <table class="song-table">
          <tr>
            <td class="info-cell">
              <table class="info-table">
                <tr>
                  <th>TJ</th>
                  <td>${song.karaoke.TJ}</td>
                </tr>
                <tr>
                  <th>KY</th>
                  <td>${song.karaoke.KY}</td>
                </tr>
                <tr>
                  <th>JS</th>
                  <td>${song.karaoke.JS}</td>
                </tr>
                <tr>
                  <th>공개일</th>
                  <td>${song.releaseDate}</td>
                </tr>
              </table>
              <button class="toggle-lyrics">가사 보기</button>
              <pre class="lyrics" style="display:none;">${song.lyrics}</pre>
            </td>
            <td class="video-cell">
              ${
                song.youtube
                  ? `<iframe width="300" height="169" src="${song.youtube}" frameborder="0" allowfullscreen></iframe>`
                  : `<div class="no-video">영상 없음</div>`
              }
            </td>
          </tr>
        </table>
      `;
      container.appendChild(songSection);
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
});
