//Defining HTML Elements
const board = document.getElementById('game-board');

//Defining game variables
let snake = [{x: 20, y: 20}];

//Draw game map, snake and food
function draw(){
    board.innerHTML = '';
    drawSnake();
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

//Test the draw function
// draw();