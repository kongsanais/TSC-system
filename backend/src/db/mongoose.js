
const config = require('./config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false , useUnifiedTopology: true  };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;