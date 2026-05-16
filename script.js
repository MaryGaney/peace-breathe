const phaseText = document.getElementById('phaseText');
let currentPhase = 0;
let currentCount = 4;
let interval;
let started = false;

function updateBreathing() {
  const phase = phases[currentPhase];

  phaseText.textContent = phase.text;
  timer.textContent = currentCount;
  circle.style.transform = `scale(${phase.scale})`;

  interval = setInterval(() => {

    currentCount--;
    timer.textContent = currentCount;

    if (currentCount <= 0) {
      clearInterval(interval);

      currentPhase = (currentPhase + 1) % phases.length;
      currentCount = 4;

      updateBreathing();
    }

  }, 1000);
}

startButton.addEventListener('click', () => {

  if (!started) {
    started = true;
    startButton.textContent = 'Breathing...';
    updateBreathing();
  }
});

function spawnFlower(x, y) {

  const flower = document.createElement('div');

  const flowerChoices = ['🌸', '🌼', '🌷', '🪻', '🌺'];

  flower.classList.add('flower');
  flower.textContent = flowerChoices[
    Math.floor(Math.random() * flowerChoices.length)
  ];

  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;

  flowersContainer.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 2500);
}

function createFlowerBurst() {

  const rect = peaceWord.getBoundingClientRect();

  for (let i = 0; i < 12; i++) {

    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;

    spawnFlower(x, y);
  }
}

peaceWord.addEventListener('mouseenter', createFlowerBurst);

peaceWord.addEventListener('touchstart', () => {
  createFlowerBurst();
}, { passive: true });
