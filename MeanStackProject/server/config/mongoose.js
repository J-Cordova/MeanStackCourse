var mongoose = require('mongoose');
var userModel = require('../models/User');
var courseModel = require('../models/Course');

module.exports = function(config)
{
    mongoose.Promise = require('bluebird');//global.Promise;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function ()
    {
    console.log('db opened');
    });

    userModel.createDefaultUser(); 
    courseModel.createDefaultCourses();  
}
