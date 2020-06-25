let socket;
let cPick;
let clr;
let sw;

const newDrawing = (data) => {
  //this is triggered when received - handles the data
  strokeWeight(data.sw)
  stroke(data.dColor)
  line(data.pX,data.pY,data.x,data.y)
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  background(220);
  cPick = createColorPicker()
  cPick.position(5,45)
  console.log(cPick.value())

  sw=1

  clr = createButton("Clear\nCanvas")
  clr.position(5,15)
  clr.mousePressed(clearBG)

  textSize(12)
  textAlign(LEFT)
  text("Type z\nto thicken.",10,125)
  text("Type x\nto thin.",10,90)
  text("Type s\nto save.",10,160)

  textSize(30)
  textAlign(RIGHT)
  text("Hold shift and move mouse to draw,\nsometimes with friends.",width-5,35)

  socket = io.connect() //127.0.0.1 special reserved IP address for local compuer - another option!

  socket.on('mouse', newDrawing) //handles receipt of delivery
}

function draw() {
  if(keyIsDown(16)){
    console.log(`Sending: ${pmouseX},${pmouseY},${mouseX}, ${mouseY}`)

    var data = {
      pX: pmouseX,
      pY: pmouseY,
      x: mouseX,
      y: mouseY,
      dColor: cPick.value(),
      sw: sw
    }

    if(keyIsDown(90) && sw<100){
      sw++
    }

    if(keyIsDown(88) && sw>1){
      sw--
    }

    // console.log(data.dColor)

    socket.emit('mouse',data) //send data through socket - mouse is the name of the message. Name the protocols wisely in case you have many!
    strokeWeight(sw)
    stroke(cPick.value())
    line(pmouseX,pmouseY,mouseX,mouseY)
  }
}

function keyTyped(){
  if(keyCode == 83){
    save('drawnTogether.jpg')
  }
}

function clearBG(){
  background(220)

  strokeWeight(1)
  textSize(12)
  textAlign(LEFT)
  text("Type z\nto thicken.",10,125)
  text("Type x\nto thin.",10,90)
  text("Type s\nto save.",10,160)

  textSize(30)
  textAlign(RIGHT)
  text("Hold shift and move mouse to draw,\nsometimes with friends.",width-5,35)
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight)
  background(220)

  strokeWeight(1)
  textSize(12)
  textAlign(LEFT)
  text("Type z\nto thicken.",10,125)
  text("Type x\nto thin.",10,90)
  text("Type s\nto save.",10,160)

  textSize(30)
  textAlign(RIGHT)
  text("Hold shift and move mouse to draw,\nsometimes with friends.",width-5,35)

}
