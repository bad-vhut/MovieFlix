const videos = [
  { title: "Video 1", file: "video1.mp4", thumb: "thumb1.jpg", category: "Action" },
  { title: "Video 2", file: "video2.mp4", thumb: "thumb2.jpg", category: "Comedy" },
  { title: "Video 3", file: "video3.mp4", thumb: "thumb3.jpg", category: "Drama" },
  { title: "Video 4", file: "video4.mp4", thumb: "thumb4.jpg", category: "Horror" },
  { title: "Video 5", file: "video5.mp4", thumb: "thumb5.jpg", category: "Sci-Fi" },
  { title: "Video 6", file: "video6.mp4", thumb: "thumb6.jpg", category: "Romance" }
];

localStorage.setItem("allVideos", JSON.stringify(videos));

const grid = document.getElementById("videoGrid");

function renderVideos(filter = "all") {
  grid.innerHTML = "";
  videos
    .filter(v => filter === "all" || v.category === filter)
    .forEach(v => {
      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `<img src="assets/thumbnails/${v.thumb}"><p>${v.title}</p>`;
      card.onclick = () => {
        localStorage.setItem("selectedVideo", JSON.stringify(v));
        window.location.href = "watch.html";
      };
      grid.appendChild(card);
    });
}
renderVideos();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => renderVideos(btn.dataset.category);
});

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  const icon = document.getElementById("themeIcon");
  icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

// Voice Search
document.getElementById("voiceBtn").onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.onresult = e => {
    const transcript = e.results[0][0].transcript.toLowerCase();
    const match = videos.find(v => v.title.toLowerCase().includes(transcript));
    if (match) {
      localStorage.setItem("selectedVideo", JSON.stringify(match));
      window.location.href = "watch.html";
    } else {
      alert("No match found.");
    }
  };
  recognition.start();
};


firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    // ইউজার লগইন না করলে
    document.body.innerHTML = "<h2>Please login to access this page. Redirecting to Home...</h2>";
    setTimeout(() => {
      window.location.href = "index.html"; // হোমপেজে পাঠিয়ে দেবে
    }, 5000); // ৫ সেকেন্ড পরে হোমপেজে যাবে
  }
});