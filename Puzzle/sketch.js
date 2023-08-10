// Slide Puzzle Image



// Put image object and index info at tile class

class Tile {

  constructor(i, img) {
    this.index = i;
    this.img = img;
  }

}

////SCORE CONTAINER
let scoreCounter = document.querySelector("#gameScore");

// Changing score label to time
let scoreText = document.querySelector("#scoreText");
scoreText.textContent = "Time";


// Source image to chop up
let source;

// Tiles configuration
let tiles = [];
let cols = 3;
let rows = 3;
let w, h;
let start = 0;
let startTime;
let elapsedTime;

// Order of tiles
let board = [];

// Loading the image
// Called directly before setup(), the preload() function is used to handle asynchronous loading 非同期ロードって何？of external files in a blocking way. If a preload function is defined, setup() will wait until any load calls within have finished. Nothing besides load calls (loadImage, loadJSON, loadFont, loadStrings, etc.) should be inside the preload function. If asynchronous loading is preferred, the load methods can instead be called in setup() or anywhere else with the use of a callback parameter.
function preload() {
  // randomly choosing an image from the array
  var myPics = new Array("Puzzle/cat_with_tie.jpg", "Puzzle/test.jpg", "Puzzle/squirel.jpg", "Puzzle/colombia.jpg", "Puzzle/japan.jpg", "Puzzle/kyiv.jpg", "Puzzle/bogota.jpg", "Puzzle/kyoto.jpg");

  var randomNum = Math.floor(Math.random() * myPics.length);
  source = loadImage(myPics[randomNum]);
}
// こっちは非同期ロードみたいな。
// The setup() function is run once, when the program starts. It's used to define initial environment properties such as screen size and to load media such as images and fonts as the program starts. There can only be one setup() function for each program and it shouldn't be called again after its initial execution.

// Creates a canvas element in the document and sets its dimensions in pixels. This method should be called only once at the start of setup(). Calling createCanvas more than once in a sketch will result in very unpredictable behavior. If you want more than one drawing canvas you could use createGraphics() (hidden by default but it can be shown).
function setup() {
  var canvas = createCanvas(400, 400);

  //set the canvas in the container
  canvas.parent('gameCanvas');

  background(255, 0, 200);
  // pixel dimensions of each tiles
  // widthはcreateCanvasで作成されるpropertyみたい
  w = width / cols;
  h = height / rows;
  // Creates a new p5.Image (the datatype for storing images). This provides a fresh buffer of pixels to play with. Set the size of the buffer with the width and height parameters.

  // Chop up source image into tiles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Starting position of chopped images
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h); //create Imag object(preloadされたimageとの違いは?)
      // console.log(img);
      // console.log(source);
      img.copy(source, x, y, w, h, 0, 0, w, h); //copy and resize source image to img object
      // console.log(img);
      // index increase in order of 0, 3, 6, 1, 4, 7, 2, 5, 8
      // This means making copy of image from top to bottom per row.
      // (x,y)=>(0,0), (0,1)(0,2)(1,0)(1,1)(1,2)(2,0)(2,1)(2,2)
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img); //create object(instance)from Tile class with index and img information
      tiles.push(tile);


    }
  }



  // console.log(board);
  // console.log(tiles);


  // Remove the last tile
  tiles.pop();
  board.pop();
  // -1 means empty spot
  board.push(-1);

  // Shuffle the board
  simpleShuffle(board);
}

// Swap two elements of an array
function swap(i, j, arr) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Pick a random spot to attempt a move
// This should be improved to select from only valid moves
function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  move(r1, r2, arr);
}

// Shuffle the board
function simpleShuffle(arr) {
  // 本番はこれを1000に変える
  for (let i = 0; i < 30; i++) {
    randomMove(arr);
  }
}

// Move based on click
function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  move(i, j, board);
  if (start == 0) {
    startTime = Date.now();
    // console.log(startTime);
    start = 1;
  }
}



function draw() {
  background(0);

  // Draw the current board
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      // this board is the array after shuffling
      let tileIndex = board[index];
      // console.log("index"+index);
      // console.log("tileIndex"+tileIndex);
      if (tileIndex > -1) {
        let img = tiles[tileIndex].img;
        image(img, x, y, w, h);
      }
    }
  }

  // Show it as grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);
    }
  }

  if (start == 1) {
    elapsedTime = ((Date.now() - startTime) / 1000).toFixed(0) + "s";
    scoreCounter.textContent = elapsedTime; /// update score
    // console.log(`Elapsed Time! ${elapsedTime} seconds!`);

  }

  // If it is solved /// GAME OVER
  if (isSolved()) {
    console.log("SOLVED");
    console.log(`Finished! ${elapsedTime} seconds!`);
    fill(255);
    textAlign(CENTER);
    textSize(50);
    text("Congratulation!", 200, 200);
    textSize(30);
    text(`Your Record ${elapsedTime}ec!`, 200, 250);
    noLoop();
    window.localStorage.setItem("puzzleScore", elapsedTime);
  }
}

// to restart the game
function rePlayGame() {

  // console.log("replayed");
  board = [];
  tiles = [];
  setup();
  start = 0;

  loop();
  // 永続的に繰り返してしまっている。

}

// Check if solved
function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

// Swap two pieces
function move(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);

  // Double check valid move
  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

// Check if neighbor
function isNeighbor(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }

  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true;
  }
  return false;
}


// Probably could just use a variable
// to track blank spot
function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}

btnReplay = document.getElementById("btnReplay");
btnReplay.addEventListener('click', rePlayGame);





// function updateScore() {
//    if (gameName.includes("Puzzle")) {
//       scoreCounter.textContent = elapsedTime;
//    }
// }
// updateScore();