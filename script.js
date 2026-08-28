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

// Отримуємо всі картки (фото + кнопка)
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  const btn = card.querySelector('.boom-btn');
  const img = card.querySelector('img');

  btn.addEventListener('click', () => {
    // Вибираємо випадковий звук зі списку
    const randomUrl = soundUrls[Math.floor(Math.random() * soundUrls.length)];
    
    // Створюємо та відтворюємо аудіо
    const audio = new Audio(randomUrl);
    audio.play().catch(err => console.error("Помилка відтворення:", err));

    // Анімація тряски конкретного фото над кнопкою
    img.classList.add('shake');
    setTimeout(() => img.classList.remove('shake'), 200);
  });
});