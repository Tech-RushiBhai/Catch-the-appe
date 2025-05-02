const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");

let score = 0;
let basketX = 160;
let apples = [];
let appleSpeed = 2;

function createApple() {
  const apple = document.createElement("div");
  apple.className = "apple";
  resetApplePosition(apple);
  gameArea.appendChild(apple);
  apples.push({ element: apple, y: 0 });
}

function resetApplePosition(apple) {
  apple.style.top = "0px";
  apple.style.left = Math.floor(Math.random() * 370) + "px";
}

function updateApples() {
  apples.forEach((appleObj, index) => {
    appleObj.y += appleSpeed;
    appleObj.element.style.top = appleObj.y + "px";

    const appleRect = appleObj.element.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (
      appleRect.bottom >= basketRect.top &&
      appleRect.left >= basketRect.left &&
      appleRect.right <= basketRect.right
    ) {
      score++;
      scoreDisplay.textContent = score;
      appleObj.y = 0;
      resetApplePosition(appleObj.element);
    } else if (appleObj.y > 500) {
      alert("Game Over! Final Score: " + score);
      score = 0;
      scoreDisplay.textContent = score;
      appleObj.y = 0;
      resetApplePosition(appleObj.element);
    }
  });
}

function gameLoop() {
  updateApples();
  requestAnimationFrame(gameLoop);
}

function moveLeft() {
  if (basketX > 0) {
    basketX -= 20;
    basket.style.left = basketX + "px";
  }
}

function moveRight() {
  if (basketX < 320) {
    basketX += 20;
    basket.style.left = basketX + "px";
  }
}

// Add one new apple every 60 seconds
setInterval(() => {
  createApple();
}, 60000);

// Start the game
basket.style.left = basketX + "px";
createApple(); // Start with 1 apple
gameLoop();