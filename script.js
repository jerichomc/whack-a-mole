const holes = Array.from(document.querySelectorAll(".hole"));
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");

let score = 0;
let timeLeft = 30;
let gameRunning = false;

let moleIndex = -1;
let moleIntervalId = null;
let timerIntervalId = null;

function setMessage(text) {
  messageEl.textContent = text;
}

function clearMole() {
  holes.forEach(h => h.classList.remove("mole"));
  moleIndex = -1;
}

function showRandomMole() {
  clearMole();

  const nextIndex = Math.floor(Math.random() * holes.length);
  moleIndex = nextIndex;
  holes[moleIndex].classList.add("mole");
}

function updateHUD() {
  scoreEl.textContent = String(score);
  timeEl.textContent = String(timeLeft);
}

function endGame() {
  gameRunning = false;
  clearMole();
  clearInterval(moleIntervalId);
  clearInterval(timerIntervalId);
  moleIntervalId = null;
  timerIntervalId = null;
  startBtn.disabled = false;
  setMessage(`Time! Final score: ${score}`);
}

function startGame() {

  score = 0;
  timeLeft = 30;
  gameRunning = true;
  startBtn.disabled = true;
  setMessage("Whack the mole!");

  updateHUD();
  showRandomMole();

 
  moleIntervalId = setInterval(showRandomMole, 700);


  timerIntervalId = setInterval(() => {
    timeLeft -= 1;
    updateHUD();
    if (timeLeft <= 0) endGame();
  }, 1000);
}

holes.forEach((hole, index) => {
  hole.addEventListener("click", () => {
    if (!gameRunning) return;

    if (index === moleIndex) {
      score += 1;
      updateHUD();

      showRandomMole();
    }
  });
});

startBtn.addEventListener("click", startGame);

updateHUD();
setMessage("Click Start to play.");
