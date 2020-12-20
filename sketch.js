
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey_collided;
var gameover;
var monkey, monkey_running;
var banana, bananaGroup, bananaImage, obstacle, obstacleImage;
var FoodGroup;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;
var ground;





function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_0.png");
}



function setup() {
  
  createCanvas(600, 200);
 
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  // monkey.setAnimation(monkey_collided)
   monkey.scale = 0.08;
  //displaying score
  
  
  obstacleGroup = createGroup();
   bananaGroup = createGroup();
   ground = createSprite(1,192,1200,10);
 
 
  
  
}
  function draw() {
      
    
    
      background("lightgreen");
    
    
    text("survivalTime: "+ score, 240,50);
  
  if(gameState === PLAY){


    
  //ground.velocityX = 4;
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
  
    
//    if (ground.x < 0){
//    ground.x = ground.width/2;
     //}
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 160) {
        monkey.velocityY = -12;
        
    }
    
    //add gravity
     monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the banana
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        gameState = END;
      
    }
  }
   else if (gameState === END) {
     
     
     monkey.changeImage("collided", monkey_collided);
     
     
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
     
      monkey.velocityY = 0
      ground.velocityX = 0;
   }
  
 
  //stop trex from falling down
  monkey.collide(ground);
  


  drawSprites();}

  
  

function spawnbanana() {

 if (frameCount % 120 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
   bananaGroup.add(banana);
 }}
  
  
function spawnObstacles() {

  if (frameCount % 80 === 0){
   var obstacle = createSprite(600,170,40,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstaceImage);
   obstacle.scale = 0.10;
    obstacle.debug = true;
   
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    //banana.lifetime = 300;
    
    obstacleGroup.add(obstacle);
 }
  
  
}
  
    
    
  
