const boomBtn = document.getElementById('boomBtn');
const images = document.querySelectorAll('.photo-grid img');

// Список посилань на звуки (заміни на свої URL або локальні файли)
const soundUrls = [
  'https://www.myinstants.com/media/sounds/hub-intro-sound.mp3',
  'https://www.myinstants.com/media/sounds/tuco-get-out.mp3',
  'https://www.myinstants.com/media/sounds/sad-meow-song.mp3',
  'https://www.myinstants.com/media/sounds/faaah.mp3',
  'https://www.myinstants.com/media/sounds/mlg-air-horn.mp3',
  'https://www.myinstants.com/media/sounds/ack.mp3',
  'https://www.myinstants.com/media/sounds/anime-wow.mp3',
  'https://www.myinstants.com/media/sounds/punch-sound.mp3',
  'https://www.myinstants.com/media/sounds/shut-up-mom.mp3',
  'https://www.myinstants.com/media/sounds/vine-boom-sound.mp3',
  'https://www.myinstants.com/media/sounds/ive-got-this-faaaaaaaaahhhhh.mp3',
  'https://www.myinstants.com/media/sounds/daddys-home.mp3',
  'https://www.myinstants.com/media/sounds/fart-meme-sound.mp3',
  'https://www.myinstants.com/media/sounds/du-bist-gut-genug.mp3'
];

// Ініціалізуємо Web Audio API та масив для зберіганно кешованих аудіобуферів
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioBuffers = [];

// Функція попереднього завантаження (кліпування в оперативну пам'ять)
async function preloadSounds() {
  for (const url of soundUrls) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const decodedData = await audioCtx.decodeAudioData(arrayBuffer);
      audioBuffers.push(decodedData);
    } catch (error) {
      console.error(`Помилка завантаження звуку: ${url}`, error);
    }
  }
}

// Запускаємо кэшування одразу при завантаженні сторінки
preloadSounds();

// Відтворення випадкового звуку з оперативної пам'яті
function playRandomSound() {
  if (audioBuffers.length === 0) return;

  // Вибираємо випадковий буфер зі збережених
  const randomIndex = Math.floor(Math.random() * audioBuffers.length);
  const buffer = audioBuffers[randomIndex];

  // Створюємо джерело звуку
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start(0);
}

boomBtn.addEventListener('click', () => {
  // Розблоковуємо AudioContext (вимога сучасних браузерів для автовідтворення)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  playRandomSound();

  // Анімація підсмикування фото
  images.forEach(img => {
    img.classList.add('shake');
    setTimeout(() => img.classList.remove('shake'), 200);
  });
});