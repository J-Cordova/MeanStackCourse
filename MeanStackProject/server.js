
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var env = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);

var User = mongoose.model('User');

passport.use(new LocalStrategy(
    function(username,password,done)
    {
        User.findOne({userName: username}).exec(function(err,user)
        {           
            return user && user.authenticate(password) ? done(null,user) : done(null,false); 
        });
    }
));

passport.serializeUser(function(user,done)
{
    return user ? done(null,user._id) : done(null,false); 
});

passport.deserializeUser(function(id,done)
{
    User.findOne({_id:id}).exec(function(err,user)
    {
        return user ? done(null,user) : done(null,false);
    })
});

require('./server/config/routes')(app);

app.listen(config.port);
console.log('Listening on port ' +config.port + '...');