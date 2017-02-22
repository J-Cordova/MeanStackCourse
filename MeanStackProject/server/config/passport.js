var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = mongoose.model('User');
module.exports = function ()
{
    passport.use(new LocalStrategy(
        function (username, password, done)
        {
            User.findOne({ userName: username }).exec(function (err, user)
            {
                return user && user.authenticate(password) ? done(null, user) : done(null, false);
            });
        }
    ));

    passport.serializeUser(function (user, done)
    {
        return user ? done(null, user._id) : done(null, false);
    });

    passport.deserializeUser(function (id, done)
    {
        User.findOne({ _id: id }).exec(function (err, user)
        {
            return user ? done(null, user) : done(null, false);
        })
    });
};