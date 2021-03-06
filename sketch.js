var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup;
var score;

var Play =1;
var End =0;
var gameState=Play;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png",
  "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
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
monkey.scale=0.1;
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
    if(foodGroup.isTouching(monkey)) {
       foodGroup.destroyEach();
       score = score+2;
    }
 }
bananas();
 Obstacles();   
  

   
  drawSprites();
  
   stroke("white");
  textSize(20);
  fill("green");
  text("Score: "+ score, 500,50);
   stroke("whit");
  textSize(20);
  fill("red");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime: "+survivalTime, 10,50);

  if(obstaclesGroup.isTouching(monkey)){
        
        gameState = End;
      
    }
  
  //END
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
   monkey .visible=false;
 
  
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
    if(score==score+10){
      switch(score){
        case 10:monkey.scale=0.2;
              break;
        case 20:monkey.scale=0.4;
              break;
        case 30:monkey.scale=0.6;
               break;
        case 40:monkey.scale=0.8;
               break;
        default:break;
      }
    }
  }
}

 function Obstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,470,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
 }

  
  






