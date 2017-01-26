var canvas = document.getElementById('driveGraph');
var ctx = canvas.getContext('2d');

var fr = 0;
var it = 250;
var graphOne = [];
var graphTwo = [];
var graphThree = [];
var graphFour = [];
ctx.fillRect(250,fr*10+150, 1,1);
//Drive Graph
NetworkTables.addGlobalListener(onValueChanged, true);
function onValueChanged(key, value, isNew) { fr = value; }
setInterval(function () {
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,300,300);
  graph.push(new GraphPoint(fr));
  for (var i = 0; i < graph.length; i++) { graph[i].render(); }
  if(graph.length > canvas.width) { graph.splice(0,1); }
}, 50);


function GraphPoint(y) {
  this.y = y+150;
  this.x = 300;
  this.render = function() { this.x--; ctx.fillStyle = '#fff'; ctx.fillRect(this.x,this.y,1,1); }
}
