const gameArea = document.querySelector("#gameArea");
const player = document.querySelector("#player");
const scoreDisplay = document.querySelector("#score");
const missedDisplay = document.querySelector("#missedBoxScore");
const maxMissed = 5;
const playerMovementLeft = 35; 
const playerMovementRight = 35;
const bulletSpeed = 5; // pixel/frame
const enemyInitialSpeed = 0.5;
const enemySpwanProbability = 0.009; // the higher the more probable

let score = 0;
// contatore degli errori
let missedEnemies = 0;
// playerX è la posizione attuale
let playerX = gameArea.clientWidth / 2;
// targetPlayerX è la posizione dove l'astronave deve andare al prossimo frame
let targetPlayerX = playerX;
let bullets = [];
let enemies = [];
let enemySpeed = enemyInitialSpeed;

// dog images via API https://dog.ceo/dog-api/ DaaS (Dogs as a Service)
const dogApiUrl = "https://dog.ceo/api/breeds/image/random";
const fakeLoading = "assets/image/loading-white.png";



function fetchDogImage() {
  return fetch(dogApiUrl)
    .then(response => response.json())
    .then(data => data.message)
    .catch(() => fakeLoading);
}



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
  if (playerX < 50) {
    playerX = 50;
  } else if (playerX > gameArea.clientWidth - 50) {
    playerX = gameArea.clientWidth - 50;
  }

  // posiziona il giocatore (IMPOSTARE ABSOLUTE SU PLAYER)
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
  // crea elemento div
  const enemyDiv = document.createElement("div");
  enemyDiv.classList.add("enemy"); // <div class="enemy"></div>

  // inserisci img nell'elemento div creato
  const enemyImg = document.createElement("img"); // <img></img>
  enemyImg.alt = ""; // <img alt=""></img>
  enemyImg.src = fakeLoading; // <img alt="" src="assets/image/loading-white.png"></img>
  enemyDiv.appendChild(enemyImg);

  // Posizione di partenza dell'enemy
  enemyDiv.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
  // nascondi enemy allo spawn
  enemyDiv.style.top = "-50px";

  // add enemydiv to the game area
  gameArea.appendChild(enemyDiv);
  // metti enemy nell'array di enemies
  enemies.push(enemyDiv);

  // fetch a dog picture and swap it in when ready
  fetchDogImage()
    .then((url) => {
      enemyImg.src = url || fakeLoading;
    })
    .catch(() => {
      enemyImg.src = fakeLoading;
    });
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
  /*definisco*/ function removeBullet(eachBullet) {eachBullet.remove();};
  /*chiamo per ogni elemento dell'array. In questo modo pulisco il DOM*/ bullets.forEach(removeBullet);
  /*definisco*/ function removeEnemy(eachEnemy) {eachEnemy.remove();};
  /*chiamo per ogni elemento dell'array*/ enemies.forEach(removeEnemy);

  // clear the arrays
  bullets = [];
  enemies = [];

  // reset score and missed enemies                   
  score = 0;
  missedEnemies = 0;
  enemySpeed = enemyInitialSpeed;

  // reset player position
  targetPlayerX = gameArea.clientWidth / 2;
  playerX = targetPlayerX;
  updatePlayerPosition();

  // update UI
  scoreDisplay.textContent = score;
  missedDisplay.textContent = `${missedEnemies}/${maxMissed}`;

}



// GIOCO!!!

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
    enemies[i].style.top = enemies[i].offsetTop /*posizione corrente*/ + enemySpeed + "px";

    // conteggio errori
    if (enemies[i].offsetTop > gameArea.clientHeight) {
      // rimuove dall'area e riforma l'array
      enemies[i].remove();
      enemies.splice(i, 1);
      missedEnemies += 1;

      if (missedDisplay) {
        missedDisplay.textContent = missedEnemies + "/" + maxMissed;
      }

      if (missedEnemies >= maxMissed) {
        alert("Game Over! You missed 5 enemies.");
        resetGame();
      }
      continue; // skippa la prossima sessione ed esce
    }

    // check for bullet collisions. Checka per tutti i bullets presenti, ogni frame!!!!
    for (var j = bullets.length - 1; j >= 0; j--) {
      var eRect = enemies[i].getBoundingClientRect();
      var bRect = bullets[j].getBoundingClientRect();

      // guardo il negative space
      var isHit = !(bRect.right < eRect.left || bRect.left > eRect.right || bRect.bottom < eRect.top || bRect.top > eRect.bottom);

      if (isHit) {
        createExplosion(enemies[i].offsetLeft, enemies[i].offsetTop);

        // rimuovi l'oggetto dall'HTML
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
  if (Math.random() < enemySpwanProbability) {
    spawnEnemy();
  }

  // continue the game loop
  requestAnimationFrame(gameLoop);
}



// Mostra pop up per due secondi quando il DOM è caricato e poi comincia il gioco
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const popup = document.querySelector(".popup");
    if (popup) popup.style.display = "none";
  }, 2000);

  updatePlayerPosition();
  gameLoop();
});
