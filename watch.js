const player = document.getElementById("videoPlayer");
const miniPlayer = document.querySelector(".mini-player");
const miniVideo = document.getElementById("miniVideo");
const downloadBtn = document.getElementById("downloadBtn");
const watchLaterBtn = document.getElementById("watchLaterBtn");
const progress = document.getElementById("downloadProgress");

const selected = JSON.parse(localStorage.getItem("selectedVideo"));

// ভিডিও প্লে ও হিস্টোরি
if (selected) {
  const videoSrc = `assets/videos/${selected.file}`;
  player.src = videoSrc;
  miniVideo.src = videoSrc; // এখানেই ঠিকভাবে miniVideo.src সেট করা হচ্ছে
  downloadBtn.href = videoSrc;

  const history = JSON.parse(localStorage.getItem("history") || "[]");
  history.push(selected);
  localStorage.setItem("history", JSON.stringify(history));
}

// Watch later
watchLaterBtn.onclick = () => {
  const list = JSON.parse(localStorage.getItem("watchLater") || "[]");
  if (!list.some(v => v.title === selected.title)) {
    list.push(selected);
    localStorage.setItem("watchLater", JSON.stringify(list));
    alert("Added to Watch Later!");
  }
};

// Download with progress
downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.open("GET", downloadBtn.href, true);

  xhr.onprogress = (e) => {
    if (e.lengthComputable) progress.value = (e.loaded / e.total) * 100;
  };

  xhr.onload = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(xhr.response);
    a.download = selected.file;
    a.click();
  };

  xhr.send();
});

// Suggested
const allVideos = JSON.parse(localStorage.getItem("allVideos") || "[]");
const suggestions = allVideos.filter(v => v.title !== selected.title)
  .sort(() => 0.5 - Math.random())
  .slice(0, 4);

const suggestBox = document.getElementById("suggestedVideos");
suggestions.forEach(v => {
  const card = document.createElement("div");
  card.className = "video-card";
  card.innerHTML = `<img src="assets/thumbnails/${v.thumb}"><p>${v.title}</p>`;
  card.onclick = () => {
    localStorage.setItem("selectedVideo", JSON.stringify(v));
    window.location.reload();
  };
  suggestBox.appendChild(card);
});

// Mini Player Scroll Logic
miniVideo.muted = true;

window.addEventListener("scroll", () => {
  const mainRect = player.getBoundingClientRect();

  if (mainRect.bottom < 0) {
    miniPlayer.classList.add("show");
    miniPlayer.classList.remove("hidden");

    if (player.currentTime > 0 && miniVideo.paused) {
      miniVideo.currentTime = player.currentTime;
      miniVideo.play();
      player.pause();
    }

  } else {
    miniPlayer.classList.remove("show");
    miniPlayer.classList.add("hidden");

    if (miniVideo.currentTime > 0 && player.paused) {
      player.currentTime = miniVideo.currentTime;
      player.play();
      miniVideo.pause();
    }
  }
});