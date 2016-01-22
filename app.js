var express = require('express'),
  config = require('./config/config'),
  app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

process.on('SIGTERM', function () {
  process.exit(0);
});
