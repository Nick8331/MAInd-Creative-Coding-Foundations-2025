# Assignment 01

# Brief

Choose a “mini-game” to rebuild with HTML, CSS and JavaScript. The requirements are:

- The webpage should be responsive
- Choose an avatar at the beginning of the game
- Keep track of the score of the player
- Use the keyboard to control the game (indicate what are the controls in the page). You can also use buttons (mouse), but also keyboard.
- Use some multimedia files (audio, video, …)
- Implement an “automatic restart” in the game (that is not done via the refresh of the page)

## Screenshots

![screenshot1](DOC/screenshot1.jpg)
![screenshot2](DOC/screenshot2.jpg)
![screenshot3](DOC/screenshot2.jpg)

# Space Shooter Game

This is the simple game web based developed using **HTML, CSS, and JavaScript** in which plane can shoot enemies.

## How to play

- Spaceship can move easily left or right but using left and right **keyboard Arrow**
- Spaceship can shoot bullets using **spacebar**.
- Difficulty can be raised by pressing **+ key**.
- There are **three enemy types** (enemy plane 1, enemy plane 2 and UFO).
- There is **Explosion effect** and for this I used the boxshadow feature in css

## Description

The ship moves horizontally at the bottom of the *#gameArea*, shoots bullets upward, and tries to destroy falling enemies before they pass the bottom border. The player's target position is updated with left/right arrow keys and the actual *playerX* smoothly interpolates toward this target (*smoothPlayer*) while being clamped within the game area. Pressing space creates a *.bullet* div at the player's current poisition and pushes it into a *bullets* array; each frame, the game loop moves bullets upward and removes them when they leave the upper border. Enemies are randomly spawned at the top with a random X position and a randomly chosen image, stored in *enemies* array, and then moved downward each frame at *enemySpeed*, which can be increased with the + key. If an enemy's bottom passes the fame area height, it is counted as "missed", removed, and then the missed counter in updated; reaching *maxMissed* triggers the game over and the game fully resets.
Bullet enemy collisions are detected every frame via rectanle intersection (*getBoundingClientRect*); on hit, an esplosion effect is created, both elements are removed and the score is incremented.
**The continuos ***requestAnimationFram(gameLoop)*** is responsible for the entire game cycle.**


## Functions descriptions (ChatGPT wrote it cause I'm too tired)

smoothPlayer() – Smoothly interpolates playerX towards targetPlayerX by moving only 20% of the distance each frame, clamps playerX so the player stays inside the gameArea, and writes the resulting horizontal position to player.style.left.

updatePlayerPosition() – Directly sets player.style.left to the current value of playerX; used mainly at initialization or after reset to immediately place the player.

fireBullet() – Creates a new div element with class "bullet", positions it at the current playerX and slightly above the player, appends it to gameArea, and stores the bullet element in the bullets array for later movement and collision handling.

spawnEnemy() – Creates a new div with class "enemy", randomly chooses an image from enemyPics and inserts it as an <img> inside the div, positions the enemy at a random horizontal position at the top (just off-screen), appends it to gameArea, and stores the enemy in the enemies array.

createExplosion(horizantal, vertical) – Creates a div with class "explosion" at the given (horizontal, vertical) coordinates, appends it to gameArea, and schedules its removal with setTimeout after 300 ms to create a brief explosion effect.

resetGame() – Removes all bullet DOM elements and all enemy DOM elements (using small helper functions removeBullet(eachBullet) and removeEnemy(eachEnemy) passed to forEach), clears the bullets and enemies arrays, resets score, missedEnemies and enemySpeed to their initial values, recenters the player by resetting playerX and targetPlayerX and calling updatePlayerPosition(), and updates scoreDisplay and missedDisplay to show the reset state.

gameLoop() – Main animation loop for the game. It calls smoothPlayer() to update player movement; moves each bullet upward by bulletSpeed and removes bullets that go off-screen; moves each enemy downward by enemySpeed; if an enemy leaves the bottom of gameArea, it removes that enemy, increments missedEnemies, updates missedDisplay, and if missedEnemies reaches maxMissed, shows an alert and calls resetGame(). For each enemy, it checks collisions with all bullets using getBoundingClientRect() and axis-aligned box overlap; on hit it calls createExplosion(), removes the enemy and the bullet from the DOM and arrays, increases score, and updates scoreDisplay. It also randomly spawns new enemies with small probability by calling spawnEnemy(), and finally calls requestAnimationFrame(gameLoop) to schedule the next frame.