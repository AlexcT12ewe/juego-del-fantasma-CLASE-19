var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //creacion del fantasma
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);
  
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown ("left_arrow")){
      ghost.x = ghost.x = -3;
    }

    if (keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }

    if (keyDown ("SPACE")){
      ghost.velocityY = -3;
    }
    ghost.velocityY = ghost.velocityY + 0.8;

    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0; 
    }
  
    if (invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy();
      gameState = "END";
    }

    spawnDoors();
    drawSprites();
  }
 
  if (gameState === "END"){
   stroke("blue");
   fill("green");
   textSize(30);
   text("FIN DEL JUEGO",200,250);
  }
 
  
 
}

function spawnDoors(){
  if (frameCount % 240 === 0){
    door = createSprite (200, -50);
    door.addImage ("door",doorImg);
    door.velocityY = 3;
    door.x = Math.round(random(120,400));
    door.lifetime = 650;
    doorsGroup.add(door);

    ghost.depth = door.depth;
    ghost.depth += 1;

    climber = createSprite (200,10);
    climber.addImage ("climber",climberImg);
    climber.x = door.x;
    climber.velocityY = 3;
    climber.lifetime = 650;
    climbersGroup.add (climber);

    invisibleBlock = createSprite (200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 3;
    invisibleBlockGroup.add (invisibleBlock);
    invisibleBlock.debug = true;
  }
}