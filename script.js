// Movie Modal Logic
function openModal(title, genre, desc) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalGenre').innerText = genre;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('movieModal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('movieModal').style.display = 'none';
}

// Search Filter
document.getElementById('searchBar').addEventListener('input', function () {
  const filter = this.value.toLowerCase();
  document.querySelectorAll('.movie-card').forEach(card => {
    const title = card.querySelector('.info').innerText.toLowerCase();
    card.style.display = title.includes(filter) ? 'block' : 'none';
  });
});


function logoutUser() {
  // লোকালস্টোরেজ থেকে ইউজারের তথ্য মুছে ফেলবে
 localStorage.removeItem("currentUser");

  // যদি চাইো পুরো লোকালস্টোরেজ ক্লিয়ার করতে
  // localStorage.clear();

  // নোটিফিকেশন দেখাবে
  alert("You have been logged out.");

  // ইউজারকে index.html-এ নিয়ে যাবে
  window.location.href = "hlw.html";
}