//Based on Generative Design Exercise P.1.1.2

let tileCountX = 10; //default tile count before mouse moves
let tileCountY = 10; //default tile count before mouse moves

let colorsLeft = []; //hold colors in array
let colorsRight = []; //hold colors in array
let colors = []; //hold colors in array

var interpolateShortest = true; //flag variable for color swappingg

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent('sketchDiv')
  colorMode(HSB);
  noStroke();
  shakeColors(); //set colors to start
}

function draw() {
  tileCountX = int(map(mouseX, 0, width, 2, 10)); //set amount of rects using position of mouse
  tileCountY = int(map(mouseY, 0, height, 2, 10)); //set amount of rects using position of mouse
  var tileWidth = width / tileCountX; //determine rect size - no overlapping
  var tileHeight = height / tileCountY; //determine rect size - no overlapping
  var interCol;
  colors = [];

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    var col1 = colorsLeft[gridY];
    var col2 = colorsRight[gridY];

    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var amount = map(gridX, 0, tileCountX - 1, 0, 1);

      if (interpolateShortest) {
        // switch to rgb
        colorMode(RGB);
        interCol = lerpColor(col1, col2, amount); //process RGB colors then switch back to HSB for different results
        // switch back
        colorMode(HSB);
      } else {
        interCol = lerpColor(col1, col2, amount); //just process HSB
      }

      fill(interCol);

      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;
      rect(posX, posY, tileWidth, tileHeight);

      let textCol = lerpColor(colorsLeft[gridY+1],colorsRight[gridY+1], amount)
      fill(textCol)
      textSize(tileWidth/6)
      text("BLACK\nLIVES\nMATTER",posX+5,posY+tileHeight/3)

      // save color for potential ase export
      colors.push(interCol);
    }
  }
}

function shakeColors() {
  for (var i = 0; i < tileCountY; i++) { //based on numY Colors
    colorsLeft[i] = color(random(0, 100), random(0, 100), 100); //pick left colors
    colorsRight[i] = color(random(160, 250), 100, random(0, 100)); //pick right colors
  }
}

function mouseReleased() {
  shakeColors(); //repick colors
}

function keyPressed() {
  // if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase'); //save color pallette - more useful in next project
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png'); //save canvas and designate time and file type - useful!
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}
