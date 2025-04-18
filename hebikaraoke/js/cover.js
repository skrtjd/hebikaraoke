document.addEventListener("DOMContentLoaded", () => {
  fetch("data/cover_songs.json")
    .then(res => res.json())
    .then(data => renderCoverSongs(data))
    .catch(err => console.error("Cover song data load error:", err));

  function renderCoverSongs(songs) {
    const container = document.getElementById("coverList");

    songs.forEach(song => {
      const songBlock = document.createElement("section");
      songBlock.className = "cover-song";

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
        <pre class="lyrics" style="display:none;">${song.lyrics}</pre>
      `;
      container.appendChild(songBlock);
    });

    document.querySelectorAll(".toggle-lyrics").forEach(button =>
      button.addEventListener("click", toggleLyrics)
    );
  }

  function toggleLyrics(event) {
    const button = event.currentTarget;
    const lyrics = button.nextElementSibling;
    const isVisible = lyrics.style.display === "block";
    lyrics.style.display = isVisible ? "none" : "block";
    button.textContent = isVisible ? "가사 보기" : "가사 닫기";
  }
});
