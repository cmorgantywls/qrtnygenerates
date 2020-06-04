//following Generative Design Tutorial P1.1.2

let segmentCount = 360

function setup() {
  colorMode(HSB,360,width,height) //sets range for saturation/brightness without using map!

  let canvas = createCanvas(400, 400);
  canvas.parent('sketchDiv')
}

function draw() {
  colorMode(HSB,360,width,height) //sets range for saturation/brightness without using map!
  background(360,0,height);

  noStroke();

  let angleStep = 360/segmentCount; //decides segments drawn based on segmentCount
  let radius = height/2

  let textX = map(sin(mouseX),-1,1,width/2-5,width/2+10)
  let textY = map(cos(mouseY),-1,1,height/2+height/40, height/2)

  textAlign(CENTER,CENTER)
  textSize(40)
  textFont('Lexend Tera')
  fill('#000000')
  // text("REVOLUTION\nIS ALWAYS A\nRIOT.",width/2,height/2+height/40)
  text("REVOLUTION\nIS ALWAYS A\nRIOT.",textX,textY)

  beginShape(TRIANGLE_FAN)
    vertex(width/2,height/2) //create first vertex of triangle at center

    for(angle = 0; angle <= 360; angle += angleStep){ //inc angle by # of segments
     let vx = width / 2 + cos(radians(angle)) * radius
     let vy = height / 2 + sin(radians(angle)) * radius
     vertex(vx,vy) //create second vertex on edge of circle
     fill(angle,mouseX,mouseY,.95)
    }
  endShape()

}

function keyPressed(){
  switch(key){
    case '1':
      segmentCount = 360;
      break;
    case '2':
      segmentCount = 45;
      break;
    case '3':
      segmentCount = 24;
      break;
    case '4':
      segmentCount = 12;
      break;
    case '5':
      segmentCount = 6;
 }
}
