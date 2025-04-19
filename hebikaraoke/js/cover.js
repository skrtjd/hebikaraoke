function renderCoverSongs(songs) {
  const container = document.getElementById("coverList");

  songs.forEach(song => {
    const songBlock = document.createElement("section");
    songBlock.className = "cover-song";

    // 유튜브 iframe
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = song.youtube;
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;

    // 제목
    const title = document.createElement("h2");
    title.textContent = song.title;

    // 공개일
    const releaseDate = document.createElement("p");
    releaseDate.innerHTML = `<strong>공개일:</strong> ${song.releaseDate}`;

    // 노래방 번호
    const karaoke = document.createElement("p");
    karaoke.innerHTML = `
      <strong>TJ:</strong> ${song.karaoke.TJ} |
      <strong>KY:</strong> ${song.karaoke.KY} |
      <strong>JS:</strong> ${song.karaoke.JS}
    `;

    // 가사 버튼
    const button = document.createElement("button");
    button.className = "toggle-lyrics";
    button.textContent = "가사 보기";

    // 가사 영역
    const lyricsPre = document.createElement("pre");
    lyricsPre.className = "lyrics";
    lyricsPre.style.display = "none";

    fetch(song.lyricsPath)
      .then(res => res.text())
      .then(text => lyricsPre.textContent = text)
      .catch(err => {
        lyricsPre.textContent = "가사를 불러오는 데 실패했습니다.";
        console.error("Lyrics load error:", err);
      });

    // 버튼 기능
    button.addEventListener("click", () => {
      const isVisible = lyricsPre.style.display === "block";
      lyricsPre.style.display = isVisible ? "none" : "block";
      button.textContent = isVisible ? "가사 보기" : "가사 닫기";
    });

    // 순서대로 추가
    songBlock.appendChild(iframe);
    songBlock.appendChild(title);
    songBlock.appendChild(releaseDate);
    songBlock.appendChild(karaoke);
    songBlock.appendChild(button);
    songBlock.appendChild(lyricsPre);
    container.appendChild(songBlock);
  });
}

fetch('data/cover_songs.json')
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) throw new Error("데이터 형식 오류!");
    renderCoverSongs(data);
  })
  .catch(err => {
    console.error("Cover song data load error:", err);
    alert("커버곡 데이터를 불러오는 중 오류가 발생했습니다. 콘솔을 확인해주세요!");
  });

