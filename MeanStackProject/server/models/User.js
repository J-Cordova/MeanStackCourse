var mongoose = require('mongoose'); 
var encrypt = require('../utilities/encryption');
 
 var userSchema = mongoose.Schema(
    {                                   //using a string here returns the error message
        firstName: {type: String, required: '{PATH} is required!'},
        lastName: {type: String, required: '{PATH} is required!'},
        userName: {
            type: String,
            required: '{PATH} is required!',
            unique: true
        },
        salt: {type: String, required: '{PATH} is required!'},
        hashed_pwd: {type: String, required: '{PATH} is required!'},
        roles: [String]
    });    

    userSchema.methods = 
    {
        authenticate: function(password)
        {
            return encrypt.hashpwd(this.salt, password) === this.hashed_pwd;
        },
        hasRole : function(role)
        {
            return this.roles.indexOf(role) > -1;
        }
    }

    var User = mongoose.model('User', userSchema);


function createDefaultUser()
{
    User.find({}).exec(function(err,collection)
    {
        if(collection.length == 0)
        { 
            var salt = encrypt.createSalt();
            var hash = encrypt.hashpwd(salt, 'JCordova');
            User.create({firstName: 'Jordan', lastName: 'Cordova', userName:'JCordova', salt: salt, hashed_pwd:hash, roles: ['admin']});

            salt = encrypt.createSalt();
            hash = encrypt.hashpwd(salt, 'FCordova');
            User.create({firstName: 'Forrest', lastName: 'Cordova', userName:'FCordova', salt: salt, hashed_pwd:hash, roles: []});

            salt = encrypt.createSalt();
            hash = encrypt.hashpwd(salt, 'HCordova');
            User.create({firstName: 'Henry', lastName: 'Cordova', userName:'HCordova', salt: salt, hashed_pwd:hash});
        }
    });
}

exports.createDefaultUser = createDefaultUser;