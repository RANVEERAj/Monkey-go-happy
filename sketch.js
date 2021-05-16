
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup;
var score;

var Play =1;
var End =0;
var gameState=Play;

var sizedecreased;
var sizeincreased;

function preload(){


  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
                                "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  backgr=loadImage("jungle.jpg");
}



function setup() {
  createCanvas(600,600);

  background1=createSprite(300,300);
  background1.addImage(backgr); 
  background1.velocityX=-3;

  ground  =createSprite(300,500,600,10);
  ground.velocityX=-3;
  ground.visible=false;

  monkey=createSprite(30,250)
  monkey.addAnimation("sprite12",monkey_running);
  monkey.scale=0.06;

  foodGroup = new Group();
  obstaclesGroup =new Group();

  survivalTime= 0;
  score=0;

}


function draw() {

  monkey.collide(ground);

  if(gameState===Play){
  if(ground.x<300){
  ground.x =  ground.width/2; 
  }
  if(background1.x<300){
  background1.x =  background1.width/2; 
  }

  if(keyDown("space")){
  monkey.velocityY=-10;
  }
  monkey.velocityY= monkey.velocityY+1;
  for(var i=0;i<foodGroup.length;i++){

    if(foodGroup.get(i).isTouching(monkey)) {
      foodGroup.get(i).destroy();
      score = score+2;
      }
  }
if (obstaclesGroup.isTouching(monkey)) {
  if (sizedecreased === false) { 
  monkey.scale = monkey.scale - 0.01;
  console.log(monkey.scale) 
  sizedecreased = true;
  if(monkey.scale <= 0.06) {
  gameState = End 
}
} 
}
if (obstaclesGroup.isTouching(monkey) == false) { 
sizedecreased = false; } 
if (score % 4 === 0 && score > 0) 
{
   if (sizeincreased === false)
{
   monkey.scale = monkey.scale + 0.02 ;
    sizeincreased = true; } 
  } 
else {
   sizeincreased = false;
   }

  }
  bananas();
  Obstacles();   



  drawSprites();

  stroke("white");
  textSize(20);
  fill("green");
  text("Score: "+ score, 500,50);
  stroke("white");
  textSize(20);
  fill("red");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime: "+survivalTime, 10,50);

  if(obstaclesGroup.isTouching(monkey)&&monkey.scale===0.1){
  gameState = End;

  }
  if(obstaclesGroup.isTouching(monkey)&&monkey.scale>0.1){
    obstaclesGroup.destroyEach();
    foodGroup.destroyEach();
  monkey.scale=0.1
    }
  
  
  if (gameState === End) {
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  survivalTime.visible = false;

  ground.velocityX=0;
  background1.velocityX=0;
  monkey.velocityX=0;
  stroke("red");
  fill("red");
  textSize(30);
  text("Game Over", 110, 200);

  stroke("black");
  fill("black");
  textSize(30);
  text("Monkey is dead", 100, 240);
  monkey.scale=0.1;

}
}

function bananas(){
 if(frameCount%80===0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);

 }
}


function Obstacles() {
if(frameCount % 300 === 0) {
  var obstacle = createSprite(600,470,10,40);
  obstacle.velocityX = -6;
  obstacle.addImage(obstaceImage);

  
  obstacle.scale = 0.2;
  obstacle.lifetime = 300;

  
  obstaclesGroup.add(obstacle);
 }
}
