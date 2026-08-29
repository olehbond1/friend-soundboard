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
  "https://www.myinstants.com/media/sounds/daddys-home.mp3",
  "https://www.myinstants.com/media/sounds/fart-meme-sound.mp3",
  "https://www.myinstants.com/media/sounds/du-bist-gut-genug.mp3",
  "https://www.myinstants.com/media/sounds/ecpu-polska.mp3",
  "https://www.myinstants.com/media/sounds/ivona-zamknij-morde.mp3",
  "https://www.myinstants.com/media/sounds/polish-toilet-refrain.mp3",
  "https://www.myinstants.com/media/sounds/pan-jest-niemieckim-agentem.mp3",
  "https://www.myinstants.com/media/sounds/kurrrrrwa.mp3",
  "https://www.myinstants.com/media/sounds/romanceeeeeeeeeeeeee.mp3",
  "https://www.myinstants.com/media/sounds/anime-ahh.mp3",
  "https://www.myinstants.com/media/sounds/michael-jackson-hee-hee.mp3",
  "https://www.myinstants.com/media/sounds/dun-dun-dun-sound-effect-brass_8nFBccR.mp3",
  "https://www.myinstants.com/media/sounds/m-e-o-w.mp3",
  "https://www.myinstants.com/media/sounds/undertakers-bell_2UwFCIe.mp3",
  "https://www.myinstants.com/media/sounds/indian-song.mp3"
];

// Єдиний "поточний" звук — щоб можна було зупинити попередній перед новим
let currentAudio = null;

function playRandomSound() {
  // Зупиняємо попередню мелодію, якщо вона ще грає
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }12у

  const url = soundUrls[Math.floor(Math.random() * soundUrls.length)];
  console.log("Обраний звук:", url);
  const audio = new Audio(url);
  currentAudio = audio;

  audio.play().catch((err) => {
    console.warn("Не вдалося відтворити звук:", url, err);
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

// Фрази для бульбашок — по одному масиву на кожного друга (photo1..photo4)
const phrases = {
  photo1: [
    "Ти не пройдеш!",
    "Мій дорогоцінний шекель...",
    "ОВЕДЕПЕЕЕЕЕЕЕ!!!!!",
    "Маг ніколи не спізнюється, Фродо Беггінс, і ніколи не приходить раніше; він завжди з'являється тоді, коли потрібно",
    "Все, що нам треба вирішити, — це що робити з часом, який нам дано",
  ],
  photo2: [
    "Я Ухілес, син Галіції!",
    "Dura lex, sed lex. — Закон суворий, але це закон.",
    "Я нікому нічого не винен! Тільки батькам!",
    "За законом Архімеда, після ситного обіду...",
  ],
  photo3: [
    "Я пердолє...",
    "Kurrrva, to bardzo dobzhe!",
    "Осінню приїду...",
    "Гроші не просто купують вам краще життя. Вони роблять вас кращою людиною.",
    "Нікому не приносить радості бути бідним. Я був бідним і був багатим. І я щоразу обираю багатство.",
    "Якщо ви думаєте, що я поверхневий або матеріалістичний, ідіть влаштуйтеся на роботу в McDonald's, бо там вам саме місце."
  ],
  photo4: [
    "Світ не ідеальний, бро",
    "Справедливості нема, чувачок",
    "Проблеми не закінчаться ніколи, братіш",
    "Прикрощі будуть завжди, чувачок",
    "Щастя є"
  ]
};

const bubbleTimers = {};
let activeBubbleId = null; // яка бульбашка зараз показана

function hideBubble(photoId) {
  const bubbleId = "bubble" + photoId.replace("photo", "");
  const bubble = document.getElementById(bubbleId);
  if (bubble) bubble.classList.remove("visible");
  clearTimeout(bubbleTimers[photoId]);
}

function showBubble(photoId) {
  const list = phrases[photoId];
  if (!list || list.length === 0) return;

  // Якщо показана бульбашка іншого друга — ховаємо її одразу
  if (activeBubbleId && activeBubbleId !== photoId) {
    hideBubble(activeBubbleId);
  }

  const bubbleId = "bubble" + photoId.replace("photo", "");
  const bubble = document.getElementById(bubbleId);
  if (!bubble) return;

  const phrase = list[Math.floor(Math.random() * list.length)];
  bubble.textContent = phrase;
  bubble.classList.add("visible");
  activeBubbleId = photoId;

  clearTimeout(bubbleTimers[photoId]);
  bubbleTimers[photoId] = setTimeout(() => {
    bubble.classList.remove("visible");
    if (activeBubbleId === photoId) activeBubbleId = null;
  }, 10000);
}

document.querySelectorAll(".bang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    playRandomSound();
    shakePhoto(btn.dataset.target);
    showBubble(btn.dataset.target);
  });
});