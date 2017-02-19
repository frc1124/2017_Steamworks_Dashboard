//status
NetworkTables.addKeyListener('dash/status/comms', function() {}, true);
NetworkTables.addKeyListener('dash/status/code', function() {}, true);
NetworkTables.addKeyListener('dash/status/battery', function() {}, true);
NetworkTables.addKeyListener('dash/status/cam', function() {}, true);
NetworkTables.addKeyListener('dash/status/pressure', function() {}, true);

//autoSelect
function sendAuto(id) { NetworkTables.putValue('/dash/auto', id); }