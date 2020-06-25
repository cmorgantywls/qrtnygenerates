//thank you Coding Train for the tutorial!

//1: run npm init and fill it out to have node make package.json for us with lots of information
//2: to save dependencies, run npm install (thing) --save - in this case we did npm install express so we can use express to get things setup.
//3: npm install socket.io --save
//4: after writing the socket requirement code, and making io variable, and telling sockets what to do on connection, return to sketch to make sure it knows it's connecting to a socket.

function newConnection(socket){
  console.log(`new connection: ${socket.id}`)

  socket.on('mouse', mouseMsg) //if there is a message called mouse, trigger this function!

  function mouseMsg(data){
    console.log(data);
    socket.broadcast.emit('mouse',data)
    //io.sockets.emit('mouse',data) //would also include client that sent message - more global scope
  }
}

let express = require('express') //make sure express is used
let app = express() //trigger express function and save it to app variable
let server = app.listen(3000) //on local host 3000, pay attention! at this point, with just these three lines, going to localhost:3000 in a browser will bring you to a page that says Cannot /GET

app.use(express.static('public')) //when people get things from the server, this is what they are served with - everything in the public folder which is currently all things for a p5.js sketch, index, js, and css file

console.log("socket server running.")

let socket = require('socket.io') //import statement like with express

let io = socket(server) //socket function and keep track of what is going in and out of server, whcih is listening on 3000

io.sockets.on('connection', newConnection) //connection is the event
