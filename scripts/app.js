// As a user, I want to see a game board when the page loads so that I know where the snake will move.
// As a user, I want to see a start button so that I can begin the game when I’m ready.
// As a user, I want to control the snake using arrow keys so that I can move it around the board.
// As a user, I want the snake to move automatically every few milliseconds so that the game feels alive.
// As a user, I want to see food appear randomly on the board so that I have something to eat.
// As a user, I want the snake to grow longer every time it eats food so that the challenge increases.
// As a user, I want to see my score increase every time the snake eats food so that I can track progress.
// As a user, I want the game to end if the snake touches the wall or touches itself so that the rules are clear.
// As a user, I want to see a message when the game is over, telling me my final score.
// As a user, I want a reset or restart button so that I can play again without refreshing the page.


/*--------------------------------- Pseudo ---------------------------------*/

// Define variables for game state:
// - snake body positions (array of coordinates)
// - snake direction (dx, dy)
// - food position
// - score
// - game speed (interval time)
// - game over flag

// Cache DOM elements:
// - game board
// - start button
// - score display
// - game over message
// - restart button

// Add an event listener for arrow key presses to update the snake direction.

// Create a function to randomly place food on the board.

// Create a main game loop (runs every X frames per second):
// 1. Move the snake by adding a new head based on current direction.
// 2. Remove the tail unless snake has eaten food.
// 3. Check collisions:
//      - if snake hits a wall -> end game
//      - if snake hits itself -> end game
// 4. Check if snake eats food:
//      - increase score
//      - grow the snake
//      - generate new food
// 5. Re-render the board (draw snake + food).

// Start button:
// - initializes the snake
// - resets score
// - starts the game loop

// Game over:
// - stop the interval
// - show a clear game-over message and final score

// Restart/reset button:
// - clears the board
// - resets variables
// - hides game-over message
// - allows user to start again


//extra
//Get assets like snake image-png heand and tail 
//Get assets grind tiles textures
//Gets assets food
/*-------------------------------- Variables --------------------------------*/

// Grid
const cells = [];
const width = 15;
const numOfCells = width * width;

// Game state
let score;
let lives;
let gameActive;
let gameInterval;

// Snake state
let snake;        
let direction;  
let foodIndex;

/*------------------------ Cached Element References ------------------------*/
const grid = document.querySelector('.grid');
const messageEl = document.querySelector('#message');
const scoreEl = document.querySelector('#score');
const livesEl = document.querySelector('#lives');
const startButtonEl = document.querySelector('#start');
const resetButtonEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

// it creates the grind cells for the game and it assigns and index for each cell,a total of 225 cells
const createGrid = () => {
  grid.innerHTML = '';
  cells.length = 0;
  for (let i = 0; i < numOfCells; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    // it pushes the cells elements inseade the cells array
    cells.push(cell);
    // the cells are stick to the grid displaying the the grid cells
    grid.appendChild(cell);
  }
};

// it  selects  every single celsl and add the sbaje  
const drawSnake = () => {

  snake.forEach(index => {
    cells[index].classList.add('snake');
  });
};

// it selects each cells and removes the snake  
const clearSnake = () => {
  snake.forEach(index => {
    cells[index].classList.remove('snake');
  });
};

// It randomly seleces a cells index and places the aple 
const placeFood = () => {
  do {
    foodIndex = Math.floor(Math.random() * numOfCells);
  } 
  while (snake.includes(foodIndex));
  
  const apple = document.createElement('img');
  apple.src = './assets/85-859374_red-apple-food-fruit.png';
  apple.classList.add('apple');
  cells[foodIndex].appendChild(apple);
};

// it just empties the image of the apple when the respawn time limit or the player consume it.
const clearFood = () => {
  cells.forEach(cell => (cell.innerHTML = ''));
};

//
const movementSnake = () => {
  const head = snake[0];
  const newHead = head + direction;
  // if snake passes outside the grid limit up,left,right or down. It loses its life  
  if (
    (direction === 1 && head % width === width - 1) ||
    (direction === -1 && head % width === 0) ||
    (direction === width && head + width >= numOfCells) ||
    (direction === -width && head - width < 0)
  ) {
    loseLife();
    return;
  }
  // snake collision its own tail
  if (snake.includes(newHead)) {
    loseLife();
    return;
  }
  // snake adds new head 
  snake.unshift(newHead);
  // collides with food , score increase 
  if (newHead === foodIndex) {
    score++;
    scoreEl.textContent = score;
    clearFood();
    placeFood();
  } 
  else {
    snake.pop();
  }
};
// most important functions, thats recalls the movement to make the game work
const GameplayLoop = () => {
  if (!gameActive) return;
  clearSnake();
  movementSnake();
  drawSnake();
};
//  reset the tail and places the snake at the center
const loseLife = () => {
  lives--;
  livesEl.textContent = lives;
  if (lives <= 0) {
    endGame();
  } else {
    resetRound();
  }
};

// resets the round
const resetRound = () => {
  clearSnake();
  clearFood();
  snake = [112]; // the snake stars at the center off the grid 
  direction = 1;
  drawSnake();
  placeFood();
};

// stops game active and snake stops moving, the game is over
const endGame = () => {
  gameActive = false;
  clearInterval(gameInterval);
  messageEl.textContent = `Game Over! Final score: ${score}`;
};

// begings new gam
const startGame = () => {
  if (gameActive) return;

  gameActive = true;
  messageEl.textContent = 'Game started';
  // this is frames per second ,it calls the gameplay 
  gameInterval = setInterval(GameplayLoop, 300);
};

const resetGame = () => {
  init();
};

// very simple code, if its detects the string change and direction is not the opposite to the meant direction. it switchs to the correspoding key 
const handleKeyDown = (event) => {
  if (!gameActive) return;

  if (event.key === 'ArrowUp' && direction !== width) {
  direction = -width;
  } 
  else if (event.key === 'ArrowDown' && direction !== -width) {
  direction = width;
  } 
  else if (event.key === 'ArrowLeft' && direction !== 1) {
  direction = -1;
  } 
  else if (event.key === 'ArrowRight' && direction !== -1) {
  direction = 1;
  }

};

/*----------------------------- Event Listeners -----------------------------*/

startButtonEl.addEventListener('click', startGame);
resetButtonEl.addEventListener('click', resetGame);
document.addEventListener('keydown', handleKeyDown);

/*-------------------------------- Initialization --------------------------------*/
// active the main functions to start the game
const init = () => {
  clearInterval(gameInterval);

  score = 0;
  lives = 3;
  gameActive = false;

  scoreEl.textContent = score;
  livesEl.textContent = lives;
  messageEl.textContent = 'Ready to start';
  createGrid();
  snake = [112]; // as mention before,the snake starts at center in the game
  direction = 1;
  drawSnake();
  placeFood();
};

/*------------------------------- Page Load ------------------------------*/
init();
