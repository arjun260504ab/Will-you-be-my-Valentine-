// Elements (cached once)
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const catImg = document.getElementById("letter-cat");
const letterWindow = document.querySelector(".letter-window");

// NO messages
const messages = [
  "😏 Sure?",
  "🥲 WHAT???? Again?",
  "🥺 That kinda hurt, not gonna lie",
  "😼 Congratulations, you unlocked my anger",
  "👉 OKAYYY… just click YES already 😌❤️"
];

// GIFs
const noGifs = [
  "no_1.gif",
  "no_2.gif",
  "no_3.gif",
  "no_4.png",
  "no_5.gif"
];

const yesGifs = [
  "cat_kiss.gif",
  "cat_giggle.gif"
];

// 🔥 Preload all images early (key performance fix)
const preloadImages = [...noGifs, ...yesGifs];
preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

let noCount = 0;

// Open envelope
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  requestAnimationFrame(() => {
    letterWindow.classList.add("open");
  });
});

// Utility → move NO randomly
function moveNoRandomly() {
  const rect = letterWindow.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 20;

  const maxX = rect.width - btnRect.width - padding;
  const maxY = rect.height - btnRect.height - padding;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;
}

// NO clicked
noBtn.addEventListener("click", () => {
  if (noCount >= 5) return;

  title.textContent = messages[noCount];

  if (noCount < 4) {
    catImg.src = noGifs[noCount];
  }

  noCount++;

  if (noCount < 5) {
    moveNoRandomly();
  }

  if (noCount === 5) {
    catImg.src = noGifs[4];
    noBtn.style.display = "none";
  }
});

// YES clicked
yesBtn.addEventListener("click", () => {
  if (noCount === 0) {
    title.textContent = "This YES feels special 💖";
    finalText.innerHTML = `
      <strong>Valentine Plan:</strong><br>
      Simple plan... better with you ❤️
    `;
    catImg.src = yesGifs[0];
  } else {
    title.textContent = "See? I knew you’d say yes 😼";
    finalText.innerHTML = `This is officially locked in 🔒❤️`;
    catImg.src = yesGifs[1];
  }

  buttons.style.display = "none";
  finalText.style.display = "block";
  letterWindow.classList.add("final");
});
