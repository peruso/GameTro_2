


//Prevent screen scrolling
window.addEventListener("keydown", function (e) {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);

let cols = 20;
let rows = 20;
let w, h;
let stagew, stageh;
let snake;
let dir;
let direction;
let fruit;
let currentLevel;
let numEatenFruit;
let fRate;
let buttonAction;
let test;
let num_keypress;

////SCORE CONTAINER
let scoreCounter = document.querySelector("#gameScore");


function setup() {
  var canvas = createCanvas(400, 400);
  stagew = width;
  stageh = height;
  w = width / cols;
  h = height / rows;

  // set the canvas in the container
  canvas.parent('gameCanvas');



  // console.log(w, h);
  snake = new Snake(w, h);
  fruit = new Fruit();
  // 最初は人ます分のへびということ
  snake.tail = 1;
  snake.x = stagew / 2;
  snake.y = stageh / 2;
  currentLevel = 1;
  numEatenFruit = 0;
  fRate = 5;
  frameRate(fRate);
  num_keypress = 0;
  background(200);


}

function draw() {
  background(200);
  snake.show();
  if (num_keypress == 0) {
    fill(255,0,0);
    textAlign(CENTER);
    textSize(20);
    text("Press any arrow key to start !", 200, 280);
    }
  snake.move();
  fruit.show();

  if (snake.eat(fruit)) {
    snake.tail++;
    fruit.move();
    numEatenFruit++;
    scoreCounter.textContent = numEatenFruit;
    // console.log("number of eaten fruit: "+numEatenFruit);
    if (numEatenFruit % 5 == 0) {
      currentLevel++;
      fRate++;
      console.log("current level: " + currentLevel + "frameRate: " + fRate);
      frameRate(fRate);
    }
  }


  //GAME OVER
  if (snake.end()) {
    background("pink");
    fill(255,0,0);
    textAlign(CENTER);
    textSize(60);
    text("Game Over...", 200, 200);
    textSize(30);
    if(numEatenFruit==0) {
      text(`Snake didn't eat any fruit..`, 200, 260);
    }
    else if(numEatenFruit==1) {
      text(`Snake ate ${numEatenFruit} fruit!`, 200, 260);
    }
    else {
      text(`Snake ate ${numEatenFruit} fruits!`, 200, 260);
    }
    // to stop draw()
    noLoop();
    window.localStorage.setItem("snakeScore", numEatenFruit);




  }

}

function rePlayGame() {
  // できるか確認中
  console.log("replayed");
  setup();
  dir = 0;
  loop();
  // 永続的に繰り返してしまっている。

}

class Fruit {
  constructor() {
    this.width = w;
    this.height = h;
    this.x = w * floor(random(0, cols));
    this.y = h * floor(random(0, rows));
    // floor関数はrounds downする

  }
  show() {
    fill('yellow');
    stroke('yellow');
    rect(this.x, this.y, this.width, this.height, 20);
  }
  move() {
    this.x = w * floor(random(0, cols));
    this.y = h * floor(random(0, rows));
    fill('yellow');
    rect(this.x, this.y, this.width, this.height, 20);

  }
}
class Snake {

  constructor(w, h) {
    this.width = w;
    this.height = h;
    // 蛇の体がbody(複数のますを持つということで配列を使用)
    this.body = [];
    // 現在位置を示す
    this.x = null;
    this.y = null;
    // 何ます分あるか
    this.tail = null;

    // xとyは開始地点。はランダムな値にする必要があると思う
    // 正直globalなvariableで良いかも
    // 初期位置は画面中央


  }
  show() {
    fill('purple');
    stroke('purple');
    this.body.push({
      x: this.x,
      y: this.y
    });
    if (this.body.length > this.tail) {
      this.body.shift();
    }
    this.body.forEach(body => {
      // -2は人ますを見やすくするためにつけている
      rect(body.x, body.y, this.width - 2, this.height - 2);



    })
    // console.log(this.body);
  }

  eat(fruit) {

    if (this.x === fruit.x && this.y === fruit.y) {
      return true;
    }

  }
  end() {

    // 画面外に出たら終了
    if (this.x < 0 || this.x > stagew || this.y < 0 || this.y > stageh) {
      console.log("Yoo hit the wall!!");
      return true;
    }
    // 自身の体に先頭が触れたら終了。
    for (var i = 0; i < this.body.length - 1; i++) {

      // console.log("hello");
      if (this.body[this.body.length - 1].x == this.body[i].x && this.body[this.body.length - 1].y == this.body[i].y) {
        console.log("Yoo hit your own!!");
        return true;
      }

    }
  }


  move() {

    switch (dir) {
      case 1:

        this.x += this.width;
        // console.log(this.x);
        direction = 1;
        break;


      case 2:

        this.x -= this.width;
        direction = 1;
        break;



      case 3:

        this.y -= this.height;
        direction = -1;
        break;


      case 4:

        this.y += this.height;
        // console.log(this.y);
        direction = -1;
        break;


    }

  }


}


// REACTIVATE ONCE PLAY PAGE IS FULLY MERGED AND UP TO DATE

btnReplay = document.getElementById("btnReplay");
btnReplay.addEventListener('click', rePlayGame);

document.addEventListener('keydown', keypress_event);

function keypress_event(e) {
  switch (e.code) {
    case "ArrowRight":
      if (direction === 1) {
        break;
      }
      dir = 1;
      // console.log("arrowright");
      break;
    case "ArrowLeft":
      if (direction === 1) {
        break;
      }
      dir = 2;
      // console.log("arrowleft");
      break;
    case "ArrowUp":
      if (direction === -1) {
        break;
      }
      dir = 3;
      // console.log("arrowup");
      break;
    case "ArrowDown":
      if (direction === -1) {
        break;
      }
      dir = 4;
      // console.log("arrowdown");
      // console.log(dir);
      break;
  }
  num_keypress +=1;


  return false;
}
// console.log("snake finished");


