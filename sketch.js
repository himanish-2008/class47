var mario,marioImg;
var ground , groundImg;
var coin , coinImg , coinGroup;
var obstacle , obstacleImg1 , obstacleImg2, obstacleGroup;
var edges;
var invisibleGround;
var gameState="play";
var marioEnd;
var score=0;
var hitSound,coinSound;



function preload(){
  marioImg = loadAnimation("mario/m0.png", "mario/m1.png" , "mario/m2.png" ,"mario/m3.png" ,"mario/m4.png" ,"mario/m5.png" ,"mario/m6.png" ,"mario/m7.png" ,"mario/m8.png" ,
  "mario/m9.png" ,"mario/m10.png" ,"mario/m11.png") ;
marioEnd = loadAnimation("mario/m9.png")
  groundImg = loadImage ("ground.jpg")
  coinImg = loadImage ("coin.png")
 obstacleImg1 = loadImage ("enemy.png")
 obstacleImg2 = loadImage ("pirana.png")
 hitSound=loadSound("hit.mp3");
 coinSound=loadSound("coin.wav");
}


function setup() {
  createCanvas(760,500);

  ground = createSprite(100,50,800,400);
  ground.addImage("ground1",groundImg);
  
  ground.scale = 1.6;

  mario = createSprite(100, 265, 50, 50);
  mario.addAnimation("running",marioImg);
  mario.scale = 0.25;
  mario.addAnimation("ending" , marioEnd);
  mario.debug=false;
  mario.setCollider("rectangle" , 10,200,200,100)

  invisibleGround = createSprite(200,443,500,20);
  invisibleGround.visible=false;

  coinGroup = new Group();
  obstacleGroup = new Group();
  edges= createEdgeSprites();

}

function draw() {
  background(0);  
if(gameState==="play"){
  ground.velocityX=-6
  
if(ground.x<0){
  ground.x=150;
}

if (keyDown("up")&&mario.y>=200){
  mario.velocityY=-10;
}
mario.velocityY +=0.5;
spawnCoins();
spawnObstacles();
mario.collide(edges);
mario.collide(invisibleGround);
if(coinGroup.isTouching(mario)){
  coinSound.play();
  coinGroup.destroyEach();
score=score+5;
}
if (obstacleGroup.isTouching(mario)){
  hitSound.play();
  gameState="end";

}
  }
  else if(gameState==="end"){
    ground.velocityX=0;
    mario.velocityY = 0;
    mario.changeAnimation("ending", marioEnd);
    coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
  }

  drawSprites();
  fill(255);
  textSize(20);
  text("Score: "+score, 600,40)
}

function spawnCoins(){
if(frameCount%200===0){
  coin = createSprite(550,random(200,300),50,50);
  coin.addImage("coin1",coinImg);
  coin.scale=0.1;
  coin.debug=false;
  coinGroup.add(coin);
  coin.lifetime=760;
  coinGroup.setVelocityXEach(-6)
}
}

function spawnObstacles(){
  if(frameCount%200===0){
    obstacle = createSprite(550,400,50,50);
    obstacle.velocityX= -6;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1:obstacle.addImage(obstacleImg1);
      obstacle.scale=0.2;
      break;
      case 2:obstacle.addImage(obstacleImg2);
      obstacle.scale=0.1;
      break;
      default:break;
    }
    obstacle.debug=false;
    obstacleGroup.add(obstacle);
    obstacle.lifetime=760;
    
  }
  }