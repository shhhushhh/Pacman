/* global
 *    background, createCanvas, ellipse, noFill, stroke, strokeWeight, rect, image, loadImage, fill, colorMode, HSB, y, keyCode, pManCurrX, circle, DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW, pinkGhostRight
 */

let startingX;
let startingY;

let speedX;
let speedY;

let pManCurrPosX; 
let pManCurrPosY;

//2d array for the map.  0 = wall, 1 = open space,
let world = [
    [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    
    [0, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1,  1,  1,  1,  0,  0],
  
    [0, 1,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  1,  0,  1,  1,  1,  0,  0,  1,  0,  0],
  
    [0, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  0,  0,  1,  0,  0],
  
    [0, 1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  0,  1,  0,  1,  0,  1,  1,  1,  1,  0,  0],
  
    [0, 1,  0,  1,  0,  1,  0,  1,  0,  1,  1,  0,  1,  0,  1,  0,  1,  0,  0,  1,  1,  0],
  
    [0, 1,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  1,  1,  1,  0,  1,  0,  0,  0,  1,  0],
  
    [0, 1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0],
  
    [0, 1,  0,  1,  0,  0,  0,  0,  0,  1,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0],
  
    [0, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
  
    [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
];

let cellSize = 50;


//pacman images
let pacmanAvatar; 
let pacManUp;
let pacManDown;
let pacManRight;
let pacManLeft;

let panda;

let wallColor ;

let score;

const DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
  IDLE: "idle",
}

let direction = DIRECTIONS.IDLE;

function setup()
{
  createCanvas(1050, 550);
  colorMode(HSB, 360, 100, 100);
  // We only want to load the logo once.
  pManCurrPosX = 150;
  pManCurrPosY = 150;
  pinkGhostPosX = 450;
  pinkGhostPosY = 250;
  blueGhostPosX = 500;
  blueGhostPosY = 250;
  startingX = 50;
  startingY = 50;
  speedX = 10;
  speedY = 10;
  
  wallColor = color(235, 100, 100);
  pacManRight = loadImage("https://cdn.glitch.com/6ed26b30-fe55-4022-8423-cd86038b8441%2Fpacman-right.png?v=1626464839930"); // loads in Pacman/ghosts facing different directions
  pacManUp = loadImage("https://cdn.glitch.com/6ed26b30-fe55-4022-8423-cd86038b8441%2Fpacman-up.png?v=1626464840140");
  pacManDown = loadImage("https://cdn.glitch.com/6ed26b30-fe55-4022-8423-cd86038b8441%2Fpacman-down.png?v=1626464843374");
  pacManLeft = loadImage("https://cdn.glitch.com/6ed26b30-fe55-4022-8423-cd86038b8441%2Fpacman-left.png?v=1626464841802");
//   pinkGhostRight = loadImage("https://cdn.glitch.com/6ed26b30-fe55-4022-8423-cd86038b8441%2FPinky%20(1).png?v=1626475038102"); 
//   pinkGhostLeft = loadImage("hhttps://cdn.glitch.com/6ed26b30-fe55-4022-8423-cd86038b8441%2FPinky%20(2).png?v=1626475111582");
//   blueGhostRight = loadImage("https://cdn.glitch.com/6ed26b30-fe55-4022-8423-cd86038b8441%2FBlinky.png?v=1626475215111");
//   blueGhostLeft = loadImage("https://cdn.glitch.com/6ed26b30-fe55-4022-8423-cd86038b8441%2FBlinky%20(1)%20.png?v=1626475290188");

  pacmanAvatar = pacManRight;
  score = 0;
}

function draw(){ // continuously draws the maze
  background(0);
  image(pacmanAvatar, pManCurrPosX, pManCurrPosY, 50, 50);
//   image(pinkGhostRight, pinkGhostPosX, pinkGhostPosY, 50, 50);
//   image(blueGhostLeft, blueGhostPosX, blueGhostPosY, 50, 50);
  drawMap(); 
  fill(255,100,100)
  rect(675,0,100,100)
  drawScore();
  
}

function drawMap(){ // creates the maze
  for(let i = 0; i < world.length; i++) {
    for (let j = 0; j < world[0].length; j++) {
      if (world[i][j] == 0) {
        // draws a wall
        fill(wallColor);
        strokeWeight(1);
        rect(50*j, 50*i, 50, 50);
      } else if (world[i][j] == 1){ // position of coins
        fill(63, 100, 100);
        ellipse((j * 50) + 25, (i * 50) + 25, 10);
      } else if (world[i][j] == 2) {
        fill(0);
        ellipse((j * 50) + 25, (i * 50) + 25, 10);
      }
    }
  }
}

function drawScore() { // displays the score
  if(score < 10){
    fill(100)
   .strokeWeight(0)
   .textSize(80);
  } else if( score < 100){
     fill(100)
   .strokeWeight(0)
   .textSize(50);
  } else {
    fill(100)
   .strokeWeight(0)
   .textSize(40);
  }
  
  text(score, 700, 80);
}

function keyPressed() // controls for Pacman and increases score each time Pacman moves onto a block with a coin
{
  
  if(keyCode === DOWN_ARROW){
     if(!(world[(pManCurrPosY + 50)/50][(pManCurrPosX/50)] === 0)){
      pacmanAvatar = pacManDown;
      pManCurrPosY += 50;
      direction = DIRECTIONS.DOWN;
     }
  } else if(keyCode === UP_ARROW){
    if(!(world[(pManCurrPosY - 50)/50][(pManCurrPosX/50)] === 0)){
      pacmanAvatar = pacManUp;
      pManCurrPosY -= 50;
      direction = DIRECTIONS.UP;
    }
  } else if(keyCode === RIGHT_ARROW){
    if(!(world[(pManCurrPosY)/50][((pManCurrPosX + 50) /50)] === 0)){
      pacmanAvatar = pacManRight;
      pManCurrPosX += 50;
      direction = DIRECTIONS.RIGHT;
    }
  } else if (keyCode === LEFT_ARROW){
    if(!(world[(pManCurrPosY)/50][((pManCurrPosX -50) /50)] === 0)){
      pacmanAvatar = pacManLeft;
      pManCurrPosX -= 50;
      direction = DIRECTIONS.LEFT;
    } 
  }
  if(world[(pManCurrPosY) / 50][(pManCurrPosX / 50)] === 1){
    world[(pManCurrPosY) / 50][(pManCurrPosX / 50)] = 2;
    score++;
  }
  
}
