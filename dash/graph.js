var canvas = document.getElementById('graph');
canvas.width = document.getElementById('graph-contain').clientWidth;
canvas.Height = document.getElementById('graph-contain').clientHeight;
var ctx = canvas.getContext('2d');
var frontRight = 0;
var frontLeft = 0;
var backRight = 0;
var backLeft = 0;
var graphOne = [];
var graphTwo = [];
var graphThree = [];
var graphFour = [];

NetworkTables.addGlobalListener(valueChange, true);
function valueChange(key, val) {
  switch (key) {
    case '/jsDashboard/frontRight': frontRight = val; break;
    case '/jsDashboard/frontLeft': frontLeft = val; break;
    case '/jsDashboard/rearRight': backRight = val; break;
    case '/jsDashboard/rearLeft': backLeft = val; break;
  }
}

setInterval(function () {
  ctx.fillStyle = '#22222C';
  ctx.fillRect(-1,-1,canvas.width+1,canvas.height+1);
  graphOne.push(new GraphPoint(frontRight,'#F0236B'));
  graphTwo.push(new GraphPoint(frontLeft,'#FF33AA'));
  graphThree.push(new GraphPoint(backRight,'#15CC99'));
  graphFour.push(new GraphPoint(backLeft,'#15CC3E'));
  
  //render all the graphs
  ctx.beginPath();
  ctx.strokeStyle = graphOne[0].color;
  ctx.moveTo(graphOne[0].x,graphOne[0].y);
  for(var i=0;i<graphOne.length;i++) { ctx.lineTo(graphOne[i].x,graphOne[i].y); graphOne[i].x--; }
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = graphTwo[0].color;
  ctx.moveTo(graphTwo[0].x,graphTwo[0].y);
  for(var i=0;i<graphTwo.length;i++) { ctx.lineTo(graphTwo[i].x,graphTwo[i].y); graphTwo[i].x--; }
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = graphThree[0].color;
  ctx.moveTo(graphThree[0].x,graphThree[0].y);
  for(var i=0;i<graphThree.length;i++) { ctx.lineTo(graphThree[i].x,graphThree[i].y); graphThree[i].x--; }
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = graphFour[0].color;
  ctx.moveTo(graphFour[0].x,graphFour[0].y);
  for(var i=0;i<graphFour.length;i++) { ctx.lineTo(graphFour[i].x,graphFour[i].y); graphFour[i].x--; }
  ctx.stroke();
  
  if(graphOne.length > canvas.width) {
    graphOne.splice(1,1);
    graphTwo.splice(1,1);
    graphThree.splice(1,1);
    graphFour.splice(1,1);
  }
}, 10);


function GraphPoint(y,c) {
  this.x = Math.round(canvas.width);
  this.y = Math.round(((-y/20)*canvas.height)+(canvas.height/2));
  this.color = c;
}