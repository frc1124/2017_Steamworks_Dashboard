//status
NetworkTables.addKeyListener('dash/status/comms', function() {}, true);
NetworkTables.addKeyListener('dash/status/code', function() {}, true);
NetworkTables.addKeyListener('dash/status/battery', function() {}, true);
NetworkTables.addKeyListener('dash/status/cam', function() {}, true);
NetworkTables.addKeyListener('dash/status/pressure', function() {}, true);

//map buttons
NetworkTables.addKeyListener('/dash/gearDoor', function(key,value,isNew) { document.getElementById('gearDoor').innerText = value; }, true);
NetworkTables.addKeyListener('/dash/climberDoor', function(key,value,isNew) { document.getElementById('climberDoor').innerText = value; }, true);
NetworkTables.addKeyListener('/dash/battery', function(key,value,isNew) { document.getElementById('battery').innerText = value; }, true);
NetworkTables.addKeyListener('/dash/speed', function(key,value,isNew) {
    document.getElementById('speed').innerText = value;
    value.speed = HEIGHT - ((value / scales.speed)*HEIGHT);
 }, true);

//autoSelect
NetworkTables.addKeyListener('/dash/auto', function(key,value,isNew) {
    selectedAuto = document.getElementsByClassName('selectedAuto');
    if(selectedAuto.length > 0) { document.getElementsByClassName('selectedAuto')[0].setAttribute('class','autoItem'); }
    document.getElementsByClassName('autoItem')[value].setAttribute('class','autoItem selectedAuto');
}, true);
function sendAuto(id) { NetworkTables.putValue('/dash/auto', id); }

//graph
var canvas = document.getElementById('graph');
canvas.width = document.getElementById('dataWrapper').clientWidth;
canvas.height = document.getElementById('dataWrapper').clientHeight;
var WIDTH = canvas.clientWidth;
var HEIGHT = canvas.clientHeight;
var ctx = canvas.getContext('2d');

var key = [
    {
        name:"speed",
        color:"#00FFFF"
    },
    {
        name:"pressure",
        color:"#FF8C00"
    }
];
var scales = {
    speed:15,
    pressure:120
}
var value = {
    speed:10,
    pressure:30
}
var dataSets = {
    speed:[],
    pressure:[]
}
//NetworkTables.addKeyListener('/dash/speed', function(key,value,isNew) {  }, true);
NetworkTables.addKeyListener('/dash/pressure', function(key,value,isNew) { value.pressure = HEIGHT - ((value / scales.pressure)*HEIGHT); });

setInterval(function() {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    (dataSets.speed.length > WIDTH) ? dataSets.speed.splice(0,1) : null;
    (dataSets.pressure.length > WIDTH) ? dataSets.pressure.splice(0,1) : null;
    for(var point of dataSets.speed) { point.x--; }
    for(var point of dataSets.pressure) { point.x--; }
    dataSets.speed.push(new Point(value.speed));
    dataSets.pressure.push(new Point(value.pressure));
    
    ctx.beginPath();
    ctx.moveTo(dataSets.speed[0].x, dataSets.speed[0].y);
    for(var i=0;i<dataSets.speed.length;i++) { ctx.lineTo(dataSets.speed[i].x,dataSets.speed[i].y); }
    ctx.strokeStyle = key[0].color;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(dataSets.pressure[0].x, dataSets.pressure[0].y);
    for(var i=0;i<dataSets.pressure.length;i++) { ctx.lineTo(dataSets.pressure[i].x,dataSets.pressure[i].y); }
    ctx.strokeStyle = key[1].color;
    ctx.stroke();

}, 50);
function Point(y) {
    this.x = WIDTH;
    this.y = y;
}