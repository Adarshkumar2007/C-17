var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  
}



function setup() {
  createCanvas(800,200);
  var message = "this is a message";
  console.log(message);
  
  
  
 monkey = createSprite(50,143,20,50);
   monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
 
  ground = createSprite(200,180,900,15);
  ground.x = ground.width/2;
  ground.shapeColor = "brown";
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score = 0;
  
}


function draw() {
background ("lightgreen");
  
  text("Score: "+ score,500,50);
  
  
  if(gameState === PLAY){
    ground.velocityX = -(4 + 3* score/100)
    score = score +Math.round(getFrameRate()/60);
  if(ground.x<250) {
    ground.x = ground.width/2;
  }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the Food
    spawnFoods();
  
    //spawn obstacles on the ground
    spawnObstacle();
    
    if(obstacleGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
    gameState = END;
    }
  }
   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
 
  //stop monkey from falling down
  monkey.collide(ground);
    
 drawSprites();
}

function reset(){
  gameState = PLAY;

obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  score = 0;
}


function spawnObstacle(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacle
    var rand = Math.round(random(1,6));
    
    obstacle.addImage(obstacleImage);
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   obstacle.addImage(ob)
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 
}

function spawnFoods() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  }






}