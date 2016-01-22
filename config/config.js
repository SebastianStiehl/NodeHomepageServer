var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    port = process.env.PORT || 8080;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodehomepageserver'
    },
    port: port
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodehomepageserver'
    },
    port: port
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodehomepageserver'
    },
    port: port
  }
};

module.exports = config[env];
