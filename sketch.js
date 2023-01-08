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
  // creating background
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  //creating ghost sprite
  ghost=createSprite(300,300,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.4

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
}

function draw() {
  background(200);
  
  if(gameState==="play"){

  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3
    }
    if(keyDown("space")){
      ghost.velocityY=-5
    }
    ghost.velocityY+=0.8

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy()
      gameState="end"
    }
  spawnDoors()
    drawSprites()
  }

  if(gameState==="end"){
    background(0)
    stroke("yellow")
    fill("yellow")
    textSize(45)
    text("GAME OVER",150,300)

  }
}

function spawnDoors(){
  if(frameCount%120===0)
{
  //creating door sprite
  door=createSprite(200,-50)
  door.addImage(doorImg)

  // creating climbers sprite
  climber=createSprite(200,10)
  climber.addImage(climberImg)

  //creating invisible block
  invisibleBlock=createSprite(200,15)
  invisibleBlock.width=climber.width
  invisibleBlock.height=2

  // spawning doors at random x positions
  door.x=Math.round(random(120,480))
  door.velocityY=3

  // spawning and assigning velocity to climber
  climber.x=door.x
  climber.velocityY=3

  // spawning and assigning velocity to invisibleBlock
  invisibleBlock.x=door.x
  invisibleBlock.velocityY=3

  //assign lifetime to var
  door.lifetime=260
  climber.lifetime=200

  // add each sprite to the group
  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)

invisibleBlock.debug=true

  ghost.depth=door.depth
  ghost.depth+=1
}

}