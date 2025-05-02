function parseRuby(text) {
  return text
    .split('\n')
    .map(line =>
      line.replace(
        /([\u4E00-\u9FFF]+)([\u3040-\u309Fぁ-んー]+)/g,
        '<ruby>$1<rt>$2</rt></ruby>'
      )
    )
    .join('<br>');
}

fetch('data/cover_songs.json')
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) throw new Error("데이터 형식 오류!");
    renderCoverSongs(data);
  })
  .catch(err => {
    console.error("Cover song data load error:", err);
    alert("데이터를 불러오는 중 오류가 발생했습니다.");
  });

function renderCoverSongs(songs) {
  const container = document.getElementById("coverList");

  songs.forEach(song => {
    const section = document.createElement("section");
    section.className = "song-block";

    let videoContent = "영상 없음";
    if (song.youtube) {
      videoContent = `<iframe width="300" height="169" src="${song.youtube}" frameborder="0" allowfullscreen></iframe>`;
    } else if (song.bilibili) {
      videoContent = `<a class="bilibili-link" href="${song.bilibili}" target="_blank">▶ bilibili에서 보기</a>`;
    } else if (song.niconico) {
      // nico.ms/sm39314857 → embed.nicovideo.jp/watch/sm39314857
      const match = song.niconico.match(/(?:nico\.ms|nicovideo\.jp\/watch)\/(sm\d+)/);
      if (match) {
        const embedUrl = `https://embed.nicovideo.jp/watch/${match[1]}`;
        videoContent = `<iframe width="300" height="169" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        videoContent = `<a class="niconico-link" href="${song.niconico}" target="_blank">▶ 니코니코에서 보기</a>`;
      }
    }

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
            <td rowspan="3" class="video-cell">${videoContent}</td>
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
      <div class="lyrics-button-container">
        <button class="toggle-lyrics">가사 보기</button>
      </div>
      <div class="lyrics">불러오는 중...</div>
    `;

    container.appendChild(section);

    const toggleButton = section.querySelector(".toggle-lyrics");
    const lyricsBox = section.querySelector(".lyrics");

    lyricsBox.style.display = "none";
    lyricsBox.style.whiteSpace = "pre-wrap";
    lyricsBox.style.textAlign = "center";
    lyricsBox.style.fontSize = "16px";

    toggleButton.addEventListener("click", () => {
      const isVisible = lyricsBox.style.display === "block";

      if (!isVisible && lyricsBox.innerHTML === "불러오는 중...") {
        fetch(song.lyricsFile)
          .then(res => res.text())
          .then(text => {
            lyricsBox.innerHTML = parseRuby(text);
            lyricsBox.style.display = "block";
            toggleButton.textContent = "가사 닫기";
          })
          .catch(() => {
            lyricsBox.textContent = "가사를 불러오는 데 실패했습니다.";
          });
      } else {
        lyricsBox.style.display = isVisible ? "none" : "block";
        toggleButton.textContent = isVisible ? "가사 보기" : "가사 닫기";
      }
    });
  });
}
