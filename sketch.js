var bgimg,bg;
var angel,angelImg;
var star,starImg;
var edges;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var myEngine,myWorld,estar;

function preload()
{
   //preload the images here
   bgimg = loadImage("/images/starnight.png");

   angelImg = loadAnimation("/images/fairy1.png","/images/fairy2.png");

   starImg = loadImage("/images/star.png");
}

function setup() {
  createCanvas(800, 750);
  
  bg = createSprite(400,325,50,50);
  bg.addImage("starnight",bgimg);

  angel = createSprite(200,400,50,50);
  angel.addAnimation("fairyImage",angelImg);
  angel.scale  = 0.1;

  edges = createEdgeSprites();

  star =  createSprite( 500,100,20,20);
  star.addImage(starImg);
  star.scale = 0.25;

  myEngine = Engine.create();
  myWorld = myEngine.world;

  var options = {
    isStatic : true
  }
  estar = Bodies.rectangle(500,100,star.width,star.height,options);

  World.add(myWorld,estar);

  
}


function draw() {

  background("black");

  /* Only the following instruction will create a link b/w the sprite created for star and 
  Phy Engine bodice created for star */
  star.x = estar.position.x;
  star.y = estar.position.y;
  

  Engine.update(myEngine);

  if(keyDown("right")){
    angel.x = angel.x + 10;
  }

  if(keyDown("left")){
    angel.x = angel.x-10;
  }

  if(keyDown("down")){
    //You should not change the velocity of the sprite instead you should
    //ALter the prop of phy Engine bodice so that it automatically makes the sprite move
    //since the sprite is only to display the elements created by phy eng bodice
    Matter.Body.setStatic(estar,false);
  }

  if(angel.isTouching(star)){
    console.log("Touched");
    
    //You should not change the velocity of the sprite instead you should
    //ALter the prop of phy Engine bodice so that it automatically makes the sprite stop

    Matter.Body.setStatic(estar,true);
  }


  angel.collide(edges);

  drawSprites();

}
