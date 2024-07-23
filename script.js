//Defining HTML Elements
const board = document.getElementById('game-board');

//Defining game variables
let snake = [{x: 10, y: 10}];

//Draw game map, snake and food
function draw(){
    board.innerHTML = '';
    drawSnake();
}

//Draw the snake
function drawSnake(){
    snake.forEach(segment => {
        const snakeElement = document.createElement('div','snake');

    });
}