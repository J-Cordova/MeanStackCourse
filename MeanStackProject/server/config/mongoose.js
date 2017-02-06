var mongoose = require('mongoose');
var crypto = require('crypto');

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


    var userSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String
    });    

    userSchema.methods = 
    {
        authenticate: function(password)
        {
            return hashpwd(this.salt, password) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err,collection)
    {
        if(collection.length == 0)
        { 
            var salt = createSalt();
            var hash = hashpwd(salt, 'JCordova');
            User.create({firstName: 'Jordan', lastName: 'Cordova', userName:'JCordova', salt: salt, hashed_pwd:hash});

            salt = createSalt();
            hash = hashpwd(salt, 'FCordova');
            User.create({firstName: 'Forrest', lastName: 'Cordova', userName:'FCordova', salt: salt, hashed_pwd:hash});

            salt = createSalt();
            hash = hashpwd(salt, 'HCordova');
            User.create({firstName: 'Henry', lastName: 'Cordova', userName:'HCordova', salt: salt, hashed_pwd:hash});
        }
    });
}

function createSalt()
{ 
    return crypto.randomBytes(128).toString('base64');
}

function hashpwd(salt, pwd)
{
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
    // deprecated return hmac.update(pwd).digest('hex');
}