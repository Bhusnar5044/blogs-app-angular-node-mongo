const config = require('../../dbconfig.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
}
