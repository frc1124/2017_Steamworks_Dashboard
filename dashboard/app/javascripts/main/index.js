var electron, path, json;

path = require('path');
json = require('../../package.json');

electron = require('electron');

electron.app.on('ready', function() {
  var window;

  window = new electron.BrowserWindow({
    title: json.name,
    width: json.settings.width,
    height: json.settings.height
  });

  window.loadURL('http://localhost:8888/main.html');

  window.on('closed', function() {
    window = null;
  });

});

const exec = require('child_process').exec;
exec('C:\\Users\\Shmish\\Documents\\GitHub\\2017_Steamworks_Dashboard\\dashboard\\app\\javascripts\\main\\my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
