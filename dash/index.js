//status
NetworkTables.addKeyListener('dash/status/comms', function() {}, true);
NetworkTables.addKeyListener('dash/status/code', function() {}, true);
NetworkTables.addKeyListener('dash/status/battery', function() {}, true);
NetworkTables.addKeyListener('dash/status/cam', function() {}, true);
NetworkTables.addKeyListener('dash/status/pressure', function() {}, true);

//autoSelect
NetworkTables.addKeyListener('/dash/auto', function(key,value,isNew) {
    document.getElementsByClassName('selectedAuto')[0].setAttribute('class','autoItem');
    document.getElementsByClassName('autoItem')[value].setAttribute('class','autoItem selectedAuto');
});
function sendAuto(id) { NetworkTables.putValue('/dash/auto', id); }

//graph
var canvas = document.getElementById('graph');
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
NetworkTables.addKeyListener('/dash/speed', function(key,value,isNew) { value.speed = value; });
NetworkTables.addKeyListener('/dash/pressure', function(key,value,isNew) { value.pressure = pressure; });

setInterval(function() {
    (dataSets.speed.length > WIDTH) ? dataSets.speed.splice(0,1) : null;
    (dataSets.pressure.length > WIDTH) ? dataSets.pressure.splice(0,1) : null;
    for(point in dataSets.speed) { point.x--; }
    for(point in dataSets.pressure) { point.x--; }
    
    ctx.beginPath();
    ctx.moveTo(dataSets.speed[0].x, dataSets.speed[0].y);
    for(var i=0;i<dataSets.speed.length;i++) { ctx.lineTo(dataSets.speed[i].x,dataSets.speed[i].y); }
    ctx.stroke();
}, 100);
function Point(y) {
    this.x = WIDTH;
    this.y = y;
}