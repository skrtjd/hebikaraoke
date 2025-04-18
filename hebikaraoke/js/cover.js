function renderCoverSongs(songs) {
  const container = document.getElementById("coverList");

  songs.forEach(song => {
    const songBlock = document.createElement("section");
    songBlock.className = "cover-song";

    const lyricsPre = document.createElement("pre");
    lyricsPre.className = "lyrics";
    lyricsPre.style.display = "none";

    // 가사 파일 불러오기
    fetch(song.lyricsPath)
      .then(res => res.text())
      .then(text => lyricsPre.textContent = text)
      .catch(err => {
        lyricsPre.textContent = "가사를 불러오는 데 실패했습니다.";
        console.error("Lyrics load error:", err);
      });

    songBlock.innerHTML = `
      <iframe width="560" height="315" src="${song.youtube}" frameborder="0" allowfullscreen></iframe>
      <h2>${song.title}</h2>
      <p><strong>공개일:</strong> ${song.releaseDate}</p>
      <p>
        <strong>TJ:</strong> ${song.karaoke.TJ} |
        <strong>KY:</strong> ${song.karaoke.KY} |
        <strong>JS:</strong> ${song.karaoke.JS}
      </p>
      <button class="toggle-lyrics">가사 보기</button>
    `;
    songBlock.appendChild(lyricsPre);
    container.appendChild(songBlock);
  });

  // 버튼 이벤트는 DOM에 다 추가된 후에 설정
  setTimeout(() => {
    document.querySelectorAll(".toggle-lyrics").forEach(button =>
      button.addEventListener("click", function () {
        const lyrics = this.nextElementSibling;
        const isVisible = lyrics.style.display === "block";
        lyrics.style.display = isVisible ? "none" : "block";
        this.textContent = isVisible ? "가사 보기" : "가사 닫기";
      })
    );
  }, 100);
}
