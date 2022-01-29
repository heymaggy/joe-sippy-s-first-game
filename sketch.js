var mario;
var ground;
var life = 200;
var spaceIsActive = false;
var rightIsActive = false;
var superPoint;
var score =0
var mushRoomGroup,superMushRoomGroup;
var gamestate = "play";
var obstacleGroup;
function preload() {
    mario_running = loadAnimation("1.png", "2.png", "3.png", "5.png", "4.png", "7.png")
    mario_jumping = loadAnimation("11.png", "22.png", "33.png", "44.png", "55.png", "66.png", "77.png")
    obstacle1 = loadAnimation("o1.png", "o2.png", "o3.png")
    obstacle2 = loadAnimation("z1.png", "z2.png", "z3.png")
    pointAnimation = loadAnimation("p1.png", "p2.png", "p3.png");
    backgroundImage = loadImage("background.png");
    mario_collided  = loadAnimation("1.png")
}

function setup() {
    createCanvas(800, 300);
    ground = createSprite(400, -80, 800, 20)
    ground.addImage("background.png", backgroundImage)
    ground.scale = 0.9;
    iground = createSprite(400, 280, 800, 20)
    iground.visible = false;
    mario = createSprite(100, 245, 60, 60);
    mario.scale = 0.33
    mario.addAnimation("running", mario_running);
    mario.addAnimation("jumping", mario_jumping);
    mario.addAnimation("collided",mario_collided);
    mushRoomGroup = new Group();
    superMushRoomGroup = new Group();
    obstacleGroup = new Group();
    mario.setCollider("rectangle",0,50,100,310)
}
function draw() {
    background(50, 50, 50);
    if(gamestate == "play"){
        score = Math.round(frameCount/10);
        if (keyDown("up")&&mario.y>180) {
            console.log("up");
            spaceIsActive = true
            mario.velocityY = -11;
        }
        if (keyDown("right") && mario.x > 0) {
            mario.x += 2
        }
        ground.velocityX = -4
        if (keyDown("left") && mario.x > 0) {
            mario.x -= 3;
        }
        spawnPoints()
        spawnObstacles()

        if(frameCount %170==0||frameCount == 70 || frameCount == 120){
            var rand = Math.round(random(1,5));
            console.log(rand);
            if(rand == 3){
                superPoint = createSprite(800, 200, 20, 20)
                superPoint.addAnimation("points", pointAnimation)
                superPoint.scale = 2.5;
                superPoint.velocityX = -2;
                superPoint.y = random(50,250);
                superMushRoomGroup.add(superPoint);   
            }
        }
        if(superPoint){
            mario.isTouching(superMushRoomGroup,marioHitH);
        }
        if (spaceIsActive == true) {
            if (frameCount % 10 == 0) {
                life = life - 2
            }
        }
        mario.isTouching(mushRoomGroup,marioHit);
        if(life<=0){
            gamestate = "end";
        }
        mario.isTouching(obstacleGroup,obstacleHit);
        drawSprites();  
    }else if(gamestate == "end"){
        
            ground.velocityX = 0;
            mario.changeAnimation("collided",mario_collided);
            obstacleGroup.setVelocityXEach(0);
            push();
            fill("white");
            stroke("purple");
            strokeWeight(5)
            textSize(20)
            text("Game Over",width/2-100,height/2-0);
            text("CTRL + R to start again",width/2-150,height/2+50);
            pop();
    }
    
    console.log(gamestate)

   
   // 
   
    if (ground.x < 0) {
        ground.x = ground.width / 2 - 100;
    }
 
    mario.velocityY = mario.velocityY + 0.6;
    mario.collide(iground)
    
    push();
    fill("white")
    rect(width-230,50, 200, 20);
    pop();
    push();
    fill("teal")
    rect(width-230,50, life, 20);
    pop();

    push();
    fill("white");
    stroke("purple");
    strokeWeight(5)
    textSize(20)
    text("Score: "+score,width-100,40)
    pop();


}
function marioHit(mario,point){
    point.remove();
    life = life +10;
}
function marioHitH(mario,superPoint){
    superPoint.remove();
    if(life<200){
        life = 200;
    }
}
function obstacleHit(mario,obstacle){
    obstacle.remove();
    life -=50;
    if(life<=0){
    gamestate = "end"
}
}
function spawnPoints() {
    if (frameCount % 300 === 0) {
        point = createSprite(800, 240, 20, 20)
        point.addAnimation("points", pointAnimation)
        point.scale = 1.5;
        point.velocityX = -2;
        point.y = random(50,250);
        mushRoomGroup.add(point);
    }
}

function spawnObstacles() {
    if (frameCount % 150 === 0) {
        obstacle = createSprite(800, 240, 20, 20)
        obstacle.addAnimation("obstacles", obstacle1)
        obstacle.scale = 3;
        obstacle.velocityX = -(random(4,8));
        obstacleGroup.add(obstacle);
    }
}

