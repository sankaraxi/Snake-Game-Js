//Defining HTML Elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

//Defining game variables
const gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'left';
let highScore = 0;
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

//Draw game map, snake and food
function draw(){
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

//Draw the snake
function drawSnake(){
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

//Create a snake or food cube/div
function createGameElement(tagName, className){
    const element = document.createElement(tagName);
    element.className = className; //Add class to the element
    return element;
}


// Set the position of the snake or food
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// //Test the draw function
// draw();


//Draw the food function
function drawFood(){
    if (gameStarted){
        const foodElement = createGameElement('div','food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

function generateFood(){
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x, y};
}


//Move the snake
function moveSnake(){
    const head = {...snake[0]};
    switch(direction){
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head); //Add the new head to the snake
    // snake.pop(); 

    if(head.x === food.x && head.y === food.y){
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval); //clear the past interval
        gameInterval = setInterval(() => {
            moveSnake();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    }else{
        snake.pop(); //Remove the last element of the snake
    }
} 


// //Test the moveSnake function
// setInterval(() => {
//     moveSnake();
//     draw();
// },190);

function startGame(){
    gameStarted = true; //keep track of the game state
    instructionText.style.display = 'none'; //Hide the instruction text
    logo.style.display = 'none'; //Hide the logo
    gameInterval = setInterval(() => {
        moveSnake();
        checkCollision();
        draw();
    }, gameSpeedDelay);

}

// keypress event listener
function handleKeyPress(event){
    if(
        (!gameStarted && event.key === ' ') || 
        (!gameStarted && event.code === 'Enter')
    ){
        startGame();
    }else{
        switch(event.key){
            case 'ArrowUp':
                if(direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if(direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if(direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if(direction !== 'left') direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed(){
    console.log(gameSpeedDelay);
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5;
    }else if(gameSpeedDelay > 100){
        gameSpeedDelay -= 3;
    }else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 2;
    }else if(gameSpeedDelay > 25){
        gameSpeedDelay -= 1;
    }
}

function checkCollision(){
    const head = snake[0];

    if(head.x < 1 || head.x > gridSize || 
        head.y < 1 || head.y > gridSize){
        gameOver();
    }

    for (let i = 1; i < snake.length ; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            gameOver();
        }
    }
}

function gameOver(){
    updateHighScore();
    stopGame();
    snake = [{x: 10, y: 10}];
    food = generateFood();
    direction = 'left';
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore(){
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');

}

function stopGame(){
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
    clearInterval(gameInterval);
}

function updateHighScore(){
    const currentScore = snake.length - 1;
    if(currentScore > highScore){
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
}
