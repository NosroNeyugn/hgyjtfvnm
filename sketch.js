var dog, dogHappy, database, foodS, foodStock; 

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.25;
}


function draw() {
  background(46,139,87);
  
  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  textSize(25);
  fill("black");
  text("Food: "+foodS,10,490);
  
}
function readStock(data){

  foodS = data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  } else {
    x = x-1
  }

  database.ref('/').update({
    Food:x
  })
}



