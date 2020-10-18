//defining veriables 
var monkey , monkey_running, ground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime = 0;
var score

//loading the images and animation
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}


//preparing for draw
function setup() {
  
  //creation canvas
  createCanvas(400,400);
  
  
  //creating sprite and adding animation and scaling it 
  monkey = createSprite(50,280,10,10);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(200,320,400,10);
  ground.x = ground.width /2;
  ground.velocityX = -5;

    obstacleGroup = createGroup();
  foodGroup = createGroup();
  
 //settign score to 0
  score = 0;
}

//executing the code
function draw() {

  // setting background 
  background(180);
 
  //creating infinite ground 
   ground.x = ground.width /2;
  
  //allowing monkey to jump
  if (keyDown("space")&& monkey.y >= 200){
    monkey.velocityY = -12;
  }
  
  //adding gravity and making mokey collide with ground 
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(monkey.isTouching(foodGroup)){
    score = score + 2;
    foodGroup.destroyEach();
  }
  
  //calling fruits and stones function 
   fruits();
  stones();
    //drawing all the sprites 
  drawSprites();
  
  
  //if obstacle touches monkey, stoping mokey and the ground
   if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
  
     
      stroke("black")
     textSize(30)
     fill("black")
     text("GAME OVER", 100,200);
    
    
    }

  //displaying survival time 
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())  
  text("SURVIVAL TIME : "+ survivalTime, 40,50);
  
  text("SCORE : " + score,250,50 )
  

 
}

//creating function for fruits
function fruits() {
  if (frameCount % 80 === 0) {
    //creating sprite
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    
    //adding image to banana 
    banana.addImage(bananaImage);
    
    //giving it aq velocity 
    banana.scale = 0.06 ;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //adding banana to fruit group
    foodGroup.add(banana);
  }
  
} 

//creating function for stones
function stones() {
if(frameCount % 300 === 0) {
    obstacle = createSprite(800,290,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
      
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

