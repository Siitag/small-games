//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//player
let playerHeight = 10;
let playerWidth = 80;
let playerVelocityX = 15;

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX,
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 2;
let ballVelocityY = 1;

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY,
}

//blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3; //add more as game goes on
let blockMaxRows = 10;
let blockCount = 0;

// Starting Block Corner
let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

//Website Display
window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); //used to draw onto the canvas/board
    
    //Game Loop
    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    //Create Blocks
    createBlocks();
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    //Clear Previous Board
    context.clearRect(0,0,board.width,board.height);
      //Player Display
      context.fillStyle = "blue";
      context.fillRect(player.x,player.y,player.width,player.height);
      //Ball Display & Movement
      context.fillStyle = "white";
      ball.x += ball.velocityX
      ball.y += ball.velocityY
      context.fillRect(ball.x,ball.y,ball.width,ball.height)

      if(ball.y <= 0) {
        ball.velocityY *= -1
      }
      else if (ball.x <= 0 || (ball.x + ball.width) >= boardWidth) {
        ball.velocityX *= -1
      }
      else if ((ball.y + ball.height) >= boardHeight) {
        context.font = "20px sans-serif";
        context.fillText("Game Over: Press Space To Restart", 80, 400);
        gameOver = true;
      }

      if (topCollision(ball,player) || bottomCollision(ball,player)) {
        ball.velocityY *= -1
      }
      else if (leftCollision(ball,player) || rightCollision(ball,player)) {
        ball.velocityX *= -1
      }

      //Display Blocks
      context.fillStyle = "skyblue";
      for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball,block) || bottomCollision(ball,block)) {
                block.break = true;
                ball.velocityY *= -1;
                blockCount -= 1;
                score += 1;
            }
            else if (leftCollision(ball,block) || rightCollision(ball,block)) {
                block.break = true;
                ball.velocityX *= -1;
                blockCount -= 1;
                score += 1;
            }
            context.fillRect(block.x, block.y, block.width, block.height)
        }
      }

      //next level
      if (blockCount == 0) {
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        createBlocks();
      }

      //score
      context.font = "20px sans-serif"
      context.fillText(score,10,25)
}

function movePlayer(key) {

    if (gameOver) {
        if (key.code == "Space") {
            resetGame();
        }
    }

    if (key.code == "ArrowLeft") {
        let playerMovement = player.x - player.velocityX;
        if (!outOfBounds(playerMovement)) {
            player.x = playerMovement;
        }
    }
    else if (key.code == "ArrowRight") {
        let playerMovement = player.x + player.velocityX;
        if (!outOfBounds(playerMovement)) {
            player.x = playerMovement;
        }
    }
}

function outOfBounds(xPosition) {
    return(xPosition < 0 || xPosition + playerWidth > boardWidth)
}

function detectCollision(a,b) {
    return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x && //a's top right corner doesn't reach b's top left corner
           a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y; //a's top right corner doesn't reach b's bottom right corner
}

function topCollision(ball,block) { // a is above b
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) { // a is below b
    return detectCollision(ball,block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball,block)  { // a is left of b
    return detectCollision(ball,block) && (ball.x + ball.width) >= block.x
}

function rightCollision(ball,block) {
    return detectCollision(ball,block) && (block.x + block.width) >= ball.x
}

function createBlocks() {
    blockArray = [];
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10,
                y : blockY + r*blockHeight + r*10,
                width : blockWidth,
                height : blockHeight,
                break : false,
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

function resetGame() {
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeight - playerHeight - 5,
        width : playerWidth,
        height : playerHeight,
        velocityX : playerVelocityX,
    }
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width : ballWidth,
        height : ballHeight,
        velocityX : ballVelocityX,
        velocityY : ballVelocityY,
    }
    blockArray = [];
    score = 0;
    blockRows = 3;
    createBlocks();
}