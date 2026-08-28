// Прямі посилання на MP3 з MyInstants
const soundUrls = [
  "https://www.myinstants.com/media/sounds/hub-intro-sound.mp3",
  "https://www.myinstants.com/media/sounds/tuco-get-out.mp3",
  "https://www.myinstants.com/media/sounds/sad-meow-song.mp3",
  "https://www.myinstants.com/media/sounds/faaah.mp3",
  "https://www.myinstants.com/media/sounds/mlg-air-horn.mp3",
  "https://www.myinstants.com/media/sounds/ack.mp3",
  "https://www.myinstants.com/media/sounds/anime-wow.mp3",
  "https://www.myinstants.com/media/sounds/punch-sound.mp3",
  "https://www.myinstants.com/media/sounds/shut-up-mom.mp3",
  "https://www.myinstants.com/media/sounds/vine-boom-sound.mp3",
  "https://www.myinstants.com/media/sounds/ive-got-this-faaaaaaaaahhhhh.mp3",
  "https://www.myinstants.com/media/sounds/daddys-home.mp3",
  "https://www.myinstants.com/media/sounds/fart-meme-sound.mp3",
  "https://www.myinstants.com/media/sounds/du-bist-gut-genug.mp3"
];

// Єдиний "поточний" звук — щоб можна було зупинити попередній перед новим
let currentAudio = null;

function playRandomSound() {
  // Зупиняємо попередню мелодію, якщо вона ще грає
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  const url = soundUrls[Math.floor(Math.random() * soundUrls.length)];
  const audio = new Audio(url);
  currentAudio = audio;

  audio.play().catch((err) => {
    console.warn("Не вдалося відтворити звук:", err);
  });
}

function shakePhoto(photoId) {
  const photo = document.getElementById(photoId);
  if (!photo) return;
  photo.classList.remove("shake");
  void photo.offsetWidth; // reflow, щоб анімація перезапустилась навіть при швидких кліках
  photo.classList.add("shake");
  setTimeout(() => photo.classList.remove("shake"), 200);
}

document.querySelectorAll(".bang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    playRandomSound();
    shakePhoto(btn.dataset.target);
  });
});