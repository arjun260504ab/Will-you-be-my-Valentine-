// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const catImg = document.getElementById("letter-cat");

// Open envelope
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// NO messages
const messages = [
  "😏 Sure?",
  "🥲 WHAT???? Again?",
  "🥺 That kinda hurt, not gonna lie",
  "😼 Congratulations, you unlocked my anger",
  "👉 OKAYYY… just click YES already 😌❤️"
];

// GIFs for first 4 NOs
const noGifs = [
  "no_1.gif",
  "no_2.gif",
  "no_3.gif",
  "no_4.png"
];

let noCount = 0;

// Utility → move NO randomly (inside letter window)
function moveNoRandomly() {
  const container = document.querySelector(".letter-window");
  const rect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 20;

  const maxX = rect.width - btnRect.width - padding;
  const maxY = rect.height - btnRect.height - padding;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// NO clicked
noBtn.addEventListener("click", () => {
  if (noCount >= 5) return;

  title.textContent = messages[noCount];

  // Change GIF for first 4 NOs
  if (noCount < 4) {
    catImg.src = noGifs[noCount];
  }

  noCount++;

  // Move NO randomly for first 4 clicks
  if (noCount < 5) {
    moveNoRandomly();
  }

  // 🔥 5th NO → final
  if (noCount === 5) {
    catImg.src = "no_5.gif";

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
    catImg.src = "cat_dance.gif";
  } else {
    title.textContent = "See? I knew you’d say yes 😼";
    finalText.innerHTML = `
      <strong>Valentine Plan:</strong><br>
      This is officially locked in 🔒❤️
    `;
    catImg.src = "cat_giggle.gif";
  }

  buttons.style.display = "none";
  finalText.style.display = "block";
  document.querySelector(".letter-window").classList.add("final");
});
