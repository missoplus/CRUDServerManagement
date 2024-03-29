const express=require('express')
const logger = require('morgan');
const jwtSecret = require('./config/jwt')
const bodyParser = require('body-parser');
const servers = require('./routes/servers') ;
const users = require('./routes/users');
const groups = require('./routes/groups');
const requestLogger = require('./middleware/request.middleware')
const mongoose = require('./config/db'); //database configuration
const jwtMiddleware = require('./middleware/jwt.middleware')
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const app=express()
app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//app.use(requestLogger);
// public route
app.use('/users', users);
// private route
app.use('/servers', jwtMiddleware, servers);
app.use('/groups', jwtMiddleware, groups);
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
    console.log(err);

    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else
        res.status(500).json({message: "Something looks wrong :( !!!"});
});
app.listen(8000, function(){
    console.log('Node server listening on port 8000');
});
