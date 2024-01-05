import { Player } from './player.js';
import { Obstacle } from './obstacles.js';
// import { Platforms } from './platforms.js';

const GameState = {
  STARTING: 'starting',
  PLAYING: 'playing',
  GAME_OVER: 'game_over'
};

let currentState = GameState.STARTING;

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const groundLevel = canvas.height - 25;
const player = new Player(140, groundLevel, 80, 80);

const bgImage = new Image();
bgImage.src = 'cuppicakeBG.png';

// const platformImageShort = new Image();
// platformImageShort.src = 'wafle.png';

// const platformImageLong = new Image();
// platformImageLong.src = 'wafre.png';

const obstacleImage = new Image();
obstacleImage.src = 'frok.png';

const obstacleImage1 = new Image();
obstacleImage1.src = 'knefe.png';

const obstacleImage2 = new Image();
obstacleImage2.src = 'spon.png';

// const platforms = []; // array to hold platforms
const obstacles = []; // array to hold obstacles
let bgX = 0;
let score = 0;

function drawTextWithShadow(text, x, y, font, color, shadowColor, shadowBlur, offsetX, offsetY) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetX = offsetX;
  ctx.shadowOffsetY = offsetY;
  ctx.fillText(text, x, y);
  ctx.shadowColor = 'transparent'; // Reset shadow color after drawing text
}

function drawStartingMenu() {
  drawTextWithShadow('Cuppicake Run!!', canvas.width / 2, canvas.height / 2, '48px "Pixelify Sans"', 'white', 'rgba(0, 0, 0, 0.7)', 4, 2, 2);
  drawTextWithShadow('Press SPACE to start', canvas.width / 2, canvas.height / 2 + 60, '24px "Pixelify Sans"', 'white', 'rgba(0, 0, 0, 0.7)', 4, 2, 2);
}

function drawGameOverMenu() {
  const highScore = updateHighScore();
  drawTextWithShadow('Game Over!!', canvas.width / 2, canvas.height / 2 - 40, '48px "Pixelify Sans"', 'white', 'rgba(0, 0, 0, 0.7)', 4, 2, 2);
  drawTextWithShadow(`Score: ${score}`, canvas.width / 2, canvas.height / 2, '32px "Pixelify Sans"', 'white', 'rgba(0, 0, 0, 0.7)', 4, 2, 2);
  drawTextWithShadow(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 40, '32px "Pixelify Sans"', 'white', 'rgba(0, 0, 0, 0.7)', 4, 2, 2);
  drawTextWithShadow('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 80, '24px "Pixelify Sans"', 'white', 'rgba(0, 0, 0, 0.7)', 4, 2, 2);
}


function drawScore() {
  drawTextWithShadow(`Score: ${score}`, 330, 50, '32px "Pixelify Sans"', 'white', 'rgba(0, 0, 0, 0.7)', 4, 2, 2);
}

function updateHighScore() {
  let highScore = localStorage.getItem("highScore") || 0;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = score;
  }
  return highScore;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if ((e.key === " " || e.code === "Space") && currentState !== GameState.PLAYING) {
    if (currentState === GameState.STARTING) {
      currentState = GameState.PLAYING;
      player.jump();
    } else if (currentState === GameState.GAME_OVER) {
      score = 0;
      obstacles.length = 0; // Clear the obstacles array
      player.x = 140;
      player.y = groundLevel;
      instructionTimer = 0;
      currentState = GameState.PLAYING;
    }
  }
    player.jump();
}

function keyUpHandler(e) {
  if (e.key === " " || e.code === "Space") {
    player.onGround = true; // Allow jumping again
  }
}

function drawMovingBackground() {
    bgX -= 1;
    if (bgX < -canvas.width) {
        bgX = 0;
    }

    ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, bgX + canvas.width, 0, canvas.width, canvas.height);
    if (bgX < 0) {
        ctx.drawImage(bgImage, bgX + canvas.width * 2, 0, canvas.width, canvas.height);
    }
}

function drawInstructionText() {
  drawTextWithShadow(' * Press the SPACE BAR twice to double jump!!', 10, canvas.height - 20, '16px "Pixelify Sans"', 'white', 'rgba(0, 0 , 0, 0.7)', 4, 2, 2);
}

// function addPlatformsRandomly() {
//   const minHeightFromGround = 100; // minimum height from the ground for a platform
//   const maxHeightFromGround = 300; // maximum height from the ground for a platform
//   const platformWidth = 192; // Define a fixed width for all platforms or make it random
//   const x = canvas.width;
//   const y = canvas.height - minHeightFromGround - (Math.random() * (maxHeightFromGround - minHeightFromGround));

//   // randomly choose between short and long platform images
//   const platformImage = Math.random() < 0.5 ? platformImageShort : platformImageLong;

//   // Create a new Platform instance
//   const newPlatform = new Platforms(x, y, platformWidth, platformImage); // Use 'newPlatform' to avoid name conflict
//   platforms.push(newPlatform);
// }

// function checkPlatformCollisions() {
//   const playerBottom = player.y + player.height;
//   let onPlatform = false;

//   for (let platform of platforms) {
//       // Check if the player's bottom edge is above the top edge of the platform
//       // and will intersect in the next frame based on the player's vertical velocity (player.vy)
//       // Also check if the player is horizontally aligned with the platform
//       if (playerBottom <= platform.y &&
//           playerBottom + player.vy >= platform.y &&
//           player.x < platform.x + platform.width &&
//           player.x + player.width > platform.x) {
          
//           // Position the player on top of the platform
//           player.y = platform.y - player.height;
//           player.vy = 0;
//           player.onGround = true; // Allow the player to jump again
//           onPlatform = true;
//           break; // No need to check other platforms
//       }
//   }

//   // If the player is not on a platform, make sure they are affected by gravity
//   if (!onPlatform) {
//       player.onGround = false;
//   }

//   return onPlatform;
// }

function addObstacleRandomly() {
  const appearanceChance = 0.4; // 50% chance for an obstacle to appear
  if (Math.random() < appearanceChance) {
    const obstacleChoice = Math.floor(Math.random() * 3); // Random choice among three obstacles
    let obstacleWidth = 64; // Fixed width for all obstacles
    const x = canvas.width;
    let obstacleImageSelected;
    let aspectRatio;
    let y;
    let obstacle; // Declare the variable here

    // Choose which obstacle image to use and calculate its aspect ratio
    if (obstacleChoice === 0) {
      obstacleImageSelected = obstacleImage;
      obstacleWidth = 80;
      aspectRatio = obstacleImageSelected.naturalHeight / obstacleImageSelected.naturalWidth;
      y = groundLevel - 10 - obstacleWidth * aspectRatio; // Calculate y based on the height
    }
    else if (obstacleChoice === 1) {
      obstacleImageSelected = obstacleImage1;
      obstacleWidth = 87;
      aspectRatio = obstacleImageSelected.naturalHeight / obstacleImageSelected.naturalWidth;
      y = groundLevel - 14 - obstacleWidth * aspectRatio; // Calculate y based on the height
    }
    else {
      obstacleImageSelected = obstacleImage2;
      obstacleWidth = 80;
      aspectRatio = obstacleImageSelected.naturalHeight / obstacleImageSelected.naturalWidth;
      y = groundLevel - 10 - obstacleWidth * aspectRatio; // Calculate y based on the height
    }
        
    // Create a new obstacle with the selected image and calculated height
    obstacle = new Obstacle(x, y, obstacleWidth, obstacleImageSelected);

    // Add the new obstacle to the obstacles array
    obstacles.push(obstacle);
  }
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];
        ob.x -= 4; // Move the obstacle leftwards
        ob.draw(ctx);

        // Remove off-screen obstacles
        if (ob.x + ob.width < 0) {
            obstacles.splice(i, 1);
        }
    }
}

// Collision detection ffor obstacles
function isColliding(rect1, rect2, padding1 = 25, padding2 = 25) {
    return  rect1.x + padding1 < rect2.x + rect2.width - padding2 &&
            rect1.x + rect1.width - padding1 > rect2.x + padding2 &&
            rect1.y + padding1 < rect2.y + rect2.height - padding2 &&
            rect1.y + rect1.height - padding1 > rect2.y + padding2;
}

function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        if (isColliding(player, obstacles[i])) {
            return true;
        }
    }
    return false;
}


// let platformCounter = 0;
// const platformThreshold = 500;
let frameCounter = 0;
let obstacleCounter = 0;
let obstacleThreshold = 50;
let instructionTimer = 0;
const instructionDuration = 300;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMovingBackground();

  // Draw and update platforms
  // platforms.forEach(platform => {
  //   platform.x -= 3;
  //   platform.draw(ctx);
  // });

  player.update(canvas.height);
  player.draw(ctx);

  if (currentState === GameState.PLAYING) {

    if (checkCollisions()) {
      currentState = GameState.GAME_OVER;
    }
    else {
      if (instructionTimer < instructionDuration) {
        drawInstructionText();
        instructionTimer++;
      }
      // platformCounter++;
      // if(platformCounter >= platformThreshold) {
      //   addPlatformsRandomly();
      //   platformCounter = 0; // reset platformCounter
      // }

      obstacleCounter++;
      if (obstacleCounter >= obstacleThreshold) {
        addObstacleRandomly();
        obstacleCounter = 0;
      }

      updateObstacles();

      // update the score every 64 frames
      frameCounter++;
      if (frameCounter >= 64) {
        score++;
        frameCounter = 0; // reset frameCounter
      }

      drawScore();
    }
  }
  else if (currentState === GameState.STARTING) {
    drawStartingMenu();
  }
  else if (currentState === GameState.GAME_OVER) {
    drawGameOverMenu();
  }

  requestAnimationFrame(update);
}

// Start the game loop only after all images have loaded
let imagesLoaded = 0;
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 4) {
    requestAnimationFrame(update);
  }
}

bgImage.onload = imageLoaded;
// platformImageShort.onload = imageLoaded;
// platformImageLong.onload = imageLoaded;
obstacleImage.onload = imageLoaded;
obstacleImage1.onload = imageLoaded;
obstacleImage2.onload = imageLoaded;