fetch('data/cover_songs.json')
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) throw new Error("데이터 형식 오류!");
    renderCoverSongs(data);
  })
  .catch(err => {
    console.error("Cover song data load error:", err);
    alert("데이터를 불러오는 중 오류가 발생했습니다. 콘솔을 확인해주세요!");
  });

function renderCoverSongs(songs) {
  const container = document.getElementById("coverList");

  songs.forEach(song => {
    const section = document.createElement("section");
    section.className = "song-block";

    section.innerHTML = `
      <table class="song-table">
        <thead>
          <tr>
            <th colspan="2">${song.title}</th>
            <th>공개일: ${song.releaseDate}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="3" class="video-cell">
              ${song.youtube
                ? `<iframe width="300" height="169" src="${song.youtube}" frameborder="0" allowfullscreen></iframe>`
                : "영상 없음"}
            </td>
            <td>TJ</td>
            <td>${song.karaoke.TJ}</td>
          </tr>
          <tr>
            <td>KY</td>
            <td>${song.karaoke.KY}</td>
          </tr>
          <tr>
            <td>JS</td>
            <td>${song.karaoke.JS}</td>
          </tr>
        </tbody>
      </table>
      <button class="toggle-lyrics">가사 보기</button>
      <div class="lyrics" style="display:none; white-space: pre-wrap;">불러오는 중...</pre>
    `;

    container.appendChild(section);

    const toggleButton = section.querySelector(".toggle-lyrics");
    const lyricsBox = section.querySelector(".lyrics");

    toggleButton.addEventListener("click", () => {
  if (lyricsBox.textContent === "불러오는 중...") {
    fetch(song.lyricsFile)
      .then(res => res.text())
      .then(text => {
        lyricsBox.innerHTML = convertRuby(text); // 여기가 핵심
        lyricsBox.style.display = "block";
        toggleButton.textContent = "가사 닫기";
      })
      .catch(err => {
        lyricsBox.textContent = "가사를 불러오는 데 실패했습니다.";
      });
  } else {
    const isVisible = lyricsBox.style.display === "block";
    lyricsBox.style.display = isVisible ? "none" : "block";
    toggleButton.textContent = isVisible ? "가사 보기" : "가사 닫기";
  }
});
  });
}
