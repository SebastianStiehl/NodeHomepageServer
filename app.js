var express = require('express'),
  config = require('./config/config'),
  app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

process.on('SIGTERM', function () {
  if (app === undefined) return;
  app.close(function () {
    // Disconnect from cluster master
    process.disconnect && process.disconnect();
  });
});
