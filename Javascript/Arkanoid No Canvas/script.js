const gameState = {
    ball: document.getElementById('ball'),
    paddle: document.getElementById('paddle'),
    bricks: document.getElementById('bricks'),
    scoreElement: document.getElementById('score'),
    livesElement: document.getElementById('lives'),
    timeElement: document.getElementById('time'),
    pauseMenu: document.getElementById('pauseMenu'),
    continueButton: document.getElementById('continue'),
    restartButton: document.getElementById('restart'),
    score: 0,
    lives: 3,
    startTime: Date.now(),
    paused: false,
    ballDir: {x: Math.cos(Math.PI / 4), y: Math.sin(Math.PI / 4)},
    paddleSpeed: 4,
    paddleDir: 0,
    animationFrameId: null,
    gameOver: false,
    gameStarted: false,
    ballSpeed: 4,
};

function createBricks() {
    const rows = 3;
    const cols = 20;
    const brickWidth = 50;
    const brickHeight = 20;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const brick = document.createElement('div');
            brick.className = 'brick';
            brick.style.top = (i * (brickHeight + 5)) + 'px';
            brick.style.left = (j * (brickWidth + 5)) + 'px'; 
            gameState.bricks.appendChild(brick);
        }
    }
}

function gameLoop() {
    if (gameState.paused) return;
    var ballRect = gameState.ball.getBoundingClientRect();
    var paddleRect = gameState.paddle.getBoundingClientRect();

    if (!gameState.gameStarted) {
            gameState.ball.style.left = (window.innerWidth / 2 - gameState.ball.getBoundingClientRect().width / 2) + 'px';
            gameState.ball.style.top = (window.innerHeight / 3.5 - gameState.ball.getBoundingClientRect().height / 2) + 'px';
        setTimeout(function() {
            gameState.paddle.style.left = (window.innerWidth / 2 - gameState.paddle.getBoundingClientRect().width / 2) + 'px';
        }, 100);
        gameState.gameStarted = true;
    } else {
        gameState.ball.style.left = (ballRect.left + gameState.ballSpeed * gameState.ballDir.x) + 'px';
        gameState.ball.style.top = (ballRect.top + gameState.ballSpeed * gameState.ballDir.y) + 'px';
    }

    if (ballRect.left < 0 || ballRect.right > window.innerWidth) gameState.ballDir.x *= -1;
    if (ballRect.top < 0) gameState.ballDir.y = Math.abs(gameState.ballDir.y);
    if (ballRect.bottom > window.innerHeight) {
        if (gameState.lives === 1) { 
            gameState.gameOver = true;
            alert('Game Over');
            pauseGame();
            return;
        } else {
            gameState.lives -= 1;
            gameState.ball.style.left = (window.innerWidth / 2 - gameState.ball.getBoundingClientRect().width / 2) + 'px';
            gameState.ball.style.top = (window.innerHeight / 3.5 - gameState.ball.getBoundingClientRect().height / 2) + 'px';
            gameState.ballDir.y = Math.abs(gameState.ballDir.y);
        }
    }

    gameState.paddle.style.left = (paddleRect.left + gameState.paddleSpeed * gameState.paddleDir) + 'px';

    var newPaddleLeft = paddleRect.left + gameState.paddleSpeed * gameState.paddleDir;
    if (newPaddleLeft < 0) {
        newPaddleLeft = 0;
    } else if (newPaddleLeft + paddleRect.width > window.innerWidth) {
        newPaddleLeft = window.innerWidth - paddleRect.width;
    }
    gameState.paddle.style.left = newPaddleLeft + 'px';

    if (ballRect.left < 0) {
        gameState.ballDir.x = Math.abs(gameState.ballDir.x);
        gameState.ball.style.left = '0px';
    }
    if (ballRect.right > window.innerWidth) {
        gameState.ballDir.x = -Math.abs(gameState.ballDir.x);
        gameState.ball.style.left = (window.innerWidth - ballRect.width) + 'px';
    }

    if (ballRect.bottom > paddleRect.top && ballRect.top < paddleRect.bottom && ballRect.right > paddleRect.left && ballRect.left < paddleRect.right) {
        gameState.ballDir.y *= -1;

        gameState.ball.style.top = (paddleRect.top - ballRect.height) + 'px';
    }

    var bricksRect = gameState.bricks.getBoundingClientRect();
    var brickElements = document.getElementsByClassName('brick');

    for (var i = 0; i < brickElements.length; i++) {
        var brickRect = brickElements[i].getBoundingClientRect();
    
        if (ballRect.bottom > brickRect.top && ballRect.top < brickRect.bottom && ballRect.right > brickRect.left && ballRect.left < brickRect.right) {
            gameState.ballDir.y = Math.abs(gameState.ballDir.y);
            gameState.bricks.removeChild(brickElements[i]);
            gameState.score += 1;
            break;
        }
    }

    gameState.timeElement.textContent = ((Date.now() - gameState.startTime) / 1000).toFixed(2);
    gameState.scoreElement.textContent = gameState.score;
    gameState.livesElement.textContent = gameState.lives;

    gameState.animationFrameId = requestAnimationFrame(gameLoop);
}

function pauseGame() {
    gameState.paused = true;
    gameState.pauseMenu.style.display = 'block';
    if (gameState.gameOver) {
        gameState.continueButton.style.display = 'none';
    } else {
        gameState.continueButton.style.display = 'block';
    }
    cancelAnimationFrame(gameState.animationFrameId);
}

function continueGame() {
    if (gameState.gameOver == false) {
        gameState.paused = false;
        gameState.pauseMenu.style.display = 'none';
        cancelAnimationFrame(gameState.animationFrameId);
        gameState.animationFrameId = requestAnimationFrame(gameLoop);
    } else {
        alert('Restart')
    }
}

function restartGame() {
    gameState.score = 0;
    gameState.lives = 3;
    gameState.startTime = Date.now();
    gameState.paused = false;
    gameState.ballDir = {x: Math.cos(Math.PI / 4), y: Math.sin(Math.PI / 4)};
    gameState.paddleSpeed = 4;
    gameState.paddleDir = 0;

    gameState.ball.style.left = (window.innerWidth / 2 - gameState.ball.getBoundingClientRect().width / 2) + 'px';
    gameState.ball.style.top = (window.innerHeight / 3.5 - gameState.ball.getBoundingClientRect().height / 2) + 'px';
    gameState.paddle.style.left = (window.innerWidth / 2 - gameState.paddle.getBoundingClientRect().width / 2) + 'px';
    gameState.gameOver = false;
    gameState.continueButton.style.display = 'block';

    while (gameState.bricks.firstChild) {
        gameState.bricks.removeChild(gameState.bricks.firstChild);
    }
    gameState.pauseMenu.style.display = 'none';
    createBricks();
    cancelAnimationFrame(gameState.animationFrameId);
    gameState.animationFrameId = requestAnimationFrame(gameLoop);
}

gameState.continueButton.addEventListener('click', continueGame);
gameState.restartButton.addEventListener('click', restartGame);

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') pauseGame();
    if (e.key === 'ArrowLeft') gameState.paddleDir = -1;
    if (e.key === 'ArrowRight') gameState.paddleDir = 1;
});

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') gameState.paddleDir = 0;
});

createBricks();
window.onload = function() {
    gameState.animationFrameId = requestAnimationFrame(gameLoop);
};