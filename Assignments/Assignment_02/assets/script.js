const gameArea = document.querySelector("#gameArea");
const player = document.querySelector("#player");
const scoreDisplay = document.querySelector("#score");
const missedDisplay = document.querySelector("#missedBoxScore");
const maxMissed = 5;
const playerMovementLeft = 35;
const playerMovementRight = 35;
const bulletSpeed = 5;
const enemyInitialSpeed = 0.5;

let score = 0;
// contatore degli errori
let missedEnemies = 0;
// playerX è la posizione attuale
let playerX = gameArea.clientWidth / 2;
// targetPlayerX è la posizione dove l'astronave deve andare
let targetPlayerX = playerX;
let bullets = [];
let enemies = [];
let enemySpeed = enemyInitialSpeed;


// foto dei nemici
const enemyPics = [ "assets/image/enemy1.png", "assets/image/enemy2.png", "assets/image/ufo.png"];


document.addEventListener("keydown", (keyboardEvent) => {
  if (keyboardEvent.key === "ArrowLeft") targetPlayerX -= playerMovementLeft;
  if (keyboardEvent.key === "ArrowRight") targetPlayerX += playerMovementRight;
  if (keyboardEvent.key === " " || keyboardEvent.key === "Spacebar")
    fireBullet();
});

// aumenta difficoltà con il tasto +
document.addEventListener("keydown", (keyboardEvent) => {
  if (keyboardEvent.key === "+") enemySpeed += 1;
  // DEBUG
  // if (keyboardEvent.key === "-") enemySpeed = 1;
});

function smoothPlayer() {
  // calculate the difference between target and current position
  var diff = targetPlayerX - playerX;
  // muovi solo in parte verso il target
  playerX = playerX + diff * 0.2;

  // prevent player from going off screen
  if (playerX < 30) {
    playerX = 30;
  } else if (playerX > gameArea.clientWidth - 30) {
    playerX = gameArea.clientWidth - 30;
  }

  // posiziona il giocatore
  player.style.left = playerX + "px";
}

function updatePlayerPosition() {
  player.style.left = `${playerX}px`;
}

function fireBullet() {
  // create a new bullet element
  var bullet = document.createElement("div");
  bullet.classList.add("bullet"); //<div class="bullet"></div>

  // position the bullet at the player's current location
  bullet.style.left = playerX + "px";
  bullet.style.top = player.offsetTop - 10 + "px";

  // add the bullet to the game area
  gameArea.appendChild(bullet);
  // metti bullet nell'array bullets
  bullets.push(bullet);
}

function spawnEnemy() {
  const enemyDiv = document.createElement("div");
  enemyDiv.classList.add("enemy"); // <div class="enemy"></div>

  // select randomly an image from the image array
  const SelectedEnemyPic = enemyPics[Math.floor(Math.random() * 3)];
  enemyDiv.innerHTML = `<img src="${SelectedEnemyPic}" alt="enemy">`; // <div class="enemy"><img src="ufo.png" alt="enemy"></div>

  // Posizione di partenza dell'enemy
  enemyDiv.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
  // nascondi enemy allo spawn
  enemyDiv.style.top = "-50px";

  gameArea.appendChild(enemyDiv);
  enemies.push(enemyDiv);
}

function createExplosion(horizantal, vertical) {
  // make a small explosion effect at the given position
  var boom = document.createElement("div"); // <div></div>
  boom.classList.add("explosion"); // <div class="boom"></div>
  boom.style.left = horizantal + "px";
  boom.style.top = vertical + "px";
  // add to the game area
  gameArea.appendChild(boom);
  // remove the explosion after a short time
  setTimeout(function () {
    boom.remove();
  }, 300);
}

function resetGame() {
  // per ogni elemento dell'array bullets o enemies, eseguo
  function removeBullet(eachBullet) {eachBullet.remove();};
  bullets.forEach(removeBullet);
  function removeEnemy(eachEnemy) {eachEnemy.remove();};
  enemies.forEach(removeEnemy);

  //   clear the arrays
  bullets = [];
  enemies = [];

  //   reset score and missed enemies                   
  score = 0;
  missedEnemies = 0;
  enemySpeed = enemyInitialSpeed;

  //   reset player position
  targetPlayerX = gameArea.clientWidth / 2;
  playerX = targetPlayerX;
  updatePlayerPosition();

  //   update UI
  scoreDisplay.textContent = score;
  // controllo se il mio elemento UI MissedBoxScore esiste e poi lo azzero
  if (missedDisplay) {
    missedDisplay.textContent = `${missedEnemies}/5`;
  }
}

// figa ora il gioco si fa serio

function gameLoop() {

  smoothPlayer();

  // muovi proiettili
  for (var i = bullets.length - 1; i >= 0; i--) {
    bullets[i].style.top = bullets[i].offsetTop - bulletSpeed + "px";

    // remove bullets that are off the screen
    if (bullets[i].offsetTop < -20) {
      bullets[i].remove();
      bullets.splice(i, 1);
    }
  }


  // muovi nemici verso il basso
  for (var i = enemies.length - 1; i >= 0; i--) {
    enemies[i].style.top = enemies[i].offsetTop + enemySpeed + "px";

    // conteggio errori
    if (enemies[i].offsetTop > gameArea.clientHeight) {
      enemies[i].remove();
      enemies.splice(i, 1);

      missedEnemies = missedEnemies + 1;
      if (missedDisplay) {
        missedDisplay.textContent = missedEnemies + "/5";
      }

      if (missedEnemies >= maxMissed) {
        alert("Game Over! You missed 5 enemies.");
        resetGame();
      }
      continue;
    }

    // check for bullet collisions
    for (var j = bullets.length - 1; j >= 0; j--) {
      var eRect = enemies[i].getBoundingClientRect();
      var bRect = bullets[j].getBoundingClientRect();

      var isHit = !(
        bRect.right < eRect.left ||
        bRect.left > eRect.right ||
        bRect.bottom < eRect.top ||
        bRect.top > eRect.bottom
      );

      if (isHit) {
        createExplosion(enemies[i].offsetLeft, enemies[i].offsetTop);

        enemies[i].remove();
        bullets[j].remove();

        enemies.splice(i, 1);
        bullets.splice(j, 1);

        score = score + 1;
        scoreDisplay.textContent = score;

        break; // stop checking bullets for this enemy
      }
    }
  }

  // randomly spawn new enemies
  if (Math.random() < 0.008) {
    spawnEnemy();
  }

  // continue the game loop
  requestAnimationFrame(gameLoop);
}

// Mostra pop up per due secondi quando il DOM è caricato
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const popup = document.querySelector(".popup");
    if (popup) popup.style.display = "none";
  }, 2000);

  updatePlayerPosition();
  gameLoop();
});
