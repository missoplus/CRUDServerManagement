//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/kerio';
mongoose.connect(mongoDB);
module.exports = mongoose;