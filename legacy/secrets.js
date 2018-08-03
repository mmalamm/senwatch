if (process.env.NODE_ENV === 'production') {
  exports.secrets = require('./prod');
} else {
  exports.secrets = require('./keys');
}
