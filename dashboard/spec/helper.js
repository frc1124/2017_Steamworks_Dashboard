var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'Dashboard-darwin-x64', 'Dashboard.app', 'Contents', 'MacOS', 'Dashboard');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'Dashboard-linux-x64', 'Dashboard');
      default:
        throw 'Unsupported platform';
    }
  }
};
