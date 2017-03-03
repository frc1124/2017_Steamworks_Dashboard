var key = [
    {
        name:"speed",
        color:"#00FFFF"
    },
    {
        name:"pressure",
        color:"#FF8C00"
    },
    {
        name:"time",
        color:"#FF0000"
    },
    {
        name:"battery",
        color:"#00FF00"
    }
];
var scales = {
    speed:15,
    pressure:120,
    time:135,
    battery:14
}
var value = {
    speed:10,
    pressure:30,
    time:135,
    battery:13
}
var dataSets = {
    speed:[],
    pressure:[],
    time:[],
    battery:[]
}

//status
NetworkTables.addKeyListener('dash/status/comms', function() {}, true);
NetworkTables.addKeyListener('dash/status/code', function() {}, true);
NetworkTables.addKeyListener('dash/status/battery', function() {}, true);
NetworkTables.addKeyListener('dash/status/cam', function() {}, true);
NetworkTables.addKeyListener('dash/status/pressure', function() {}, true);

//map buttons
NetworkTables.addKeyListener('/dash/gearDoor', function(key,value,isNew) { document.getElementById('gearDoor').innerText = value; }, true);
NetworkTables.addKeyListener('/dash/time', function(key,value,isNew) { document.getElementById('time').innerText = value; }, true);
NetworkTables.addKeyListener('/dash/climberDoor', function(key,value,isNew) { document.getElementById('climberDoor').innerText = value; }, true);
NetworkTables.addKeyListener('/dash/battery', function(key,value,isNew) { document.getElementById('battery').innerText = value; }, true);
NetworkTables.addKeyListener('/dash/speed', function(key,value,isNew) {
    document.getElementById('speed').innerText = value;
    value.speed = HEIGHT - ((value / scales.speed)*HEIGHT);
 }, true);
 NetworkTables.addKeyListener('/dash/centerLine', function(key,value,isNew) { centerLine = value / 640 * canvasTwo.width; });

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


//NetworkTables.addKeyListener('/dash/speed', function(key,value,isNew) {  }, true);
NetworkTables.addKeyListener('/dash/pressure', function(key,value,isNew) { value.pressure = HEIGHT - ((value / scales.pressure)*HEIGHT); });
NetworkTables.addKeyListener('/dash/time', function(key,value,isNew) { value.time = HEIGHT - ((value / scales.time)*HEIGHT); });
NetworkTables.addKeyListener('/dash/battery', function(key,value,isNew) { value.battery = HEIGHT - ((value / scales.battery)*HEIGHT); });

setInterval(function() {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    (dataSets.speed.length > WIDTH) ? dataSets.speed.splice(0,1) : null;
    (dataSets.pressure.length > WIDTH) ? dataSets.pressure.splice(0,1) : null;
    (dataSets.time.length > WIDTH) ? dataSets.time.splice(0,1) : null;
    (dataSets.battery.length > WIDTH) ? dataSets.battery.splice(0,1) : null;
    for(var point of dataSets.speed) { point.x--; }
    for(var point of dataSets.pressure) { point.x--; }
    for(var point of dataSets.time) { point.x--; }
    for(var point of dataSets.battery) { point.x--; }
    dataSets.speed.push(new Point(value.speed));
    dataSets.pressure.push(new Point(value.pressure));
    dataSets.time.push(new Point(value.time));
    dataSets.battery.push(new Point(value.battery));
    
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

    ctx.beginPath();
    ctx.moveTo(dataSets.time[0].x, dataSets.time[0].y);
    for(var i=0;i<dataSets.time.length;i++) { ctx.lineTo(dataSets.time[i].x,dataSets.time[i].y); }
    ctx.strokeStyle = key[2].color;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(dataSets.battery[0].x, dataSets.battery[0].y);
    for(var i=0;i<dataSets.battery.length;i++) { ctx.lineTo(dataSets.battery[i].x,dataSets.battery[i].y); }
    ctx.strokeStyle = key[3].color;
    ctx.stroke();

}, 50);
function Point(y) {
    this.x = WIDTH;
    this.y = y;
}



var centerLine;
var canvasTwo = document.getElementById('canvasTwo');
canvasTwo.width = canvasTwo.clientWidth;
canvasTwo.height = canvasTwo.clientHeight;
var ctxTwo = canvasTwo.getContext('2d');
setInterval(function() {
    ctxTwo.clearRect(0,0, canvasTwo.width,canvasTwo.height);
    ctxTwo.beginPath();
    ctxTwo.moveTo(centerLine,0);
    ctxTwo.lineTo(centerLine,canvasTwo.height);
    ctxTwo.strokeStyle = '#FF0000';
    ctxTwo.stroke();
},50);

//Vision code
var myTracker = new tracking.Tracker('target');
tracking.ColorTracker.registerColor('green', function(r, g, b) { return( (r>50 && g>200 && b>50) ? true : false ); });
var colors = new tracking.ColorTracker(['green']);
var trackerTask = tracking.track('#camFeed', colors);
colors.on('track', function(event) { NetworkTables.putValue( '/jsVision/offset', (event.data.length === 0) ? 0 : ((event.data[0].x+event.data[1].x)/2)+((event.data[0].width+event.data[1].width)/2) ); });