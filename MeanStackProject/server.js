var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var app = express();

//setsup stylus middleware
function compile(str, path)
{
    return stylus(str).set('filename', path);
}



app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
    {
        src: __dirname + 'public',
        compile: compile
    }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//static route handling
app.use(express.static(__dirname + '/public')); // Lets express know to serve up matching file from this directory gets favicon.ico
app.use(logger('dev'));


mongoose.Promise = require('bluebird');//global.Promise;

if (env === 'development')
{
    mongoose.connect('mongodb://localhost/multivision');
}
else
{
    mongoose.connect('mongodb://jordan:multivision@ds033096.mlab.com:33096/multivision');
}


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function ()
{
    console.log('db opened');
});
 
//Schemas
var messageSchema = mongoose.Schema(
{
    message: String
});

var Message = mongoose.model('message', messageSchema);
var mongoMessage;
Message.findOne({},function (err, messageDoc)
{
    console.log(messageDoc || 'No message');
    mongoMessage = messageDoc.message;
});


//End Schemas


app.get('/partials/:partialPath', function (req, res)
{
    res.render('partials/' + req.params.partialPath);
});


app.get('*', function (req, res)// matches all routes or coordinate routes between client and server
{
    res.render('index', {
        mongoMessage: mongoMessage
    });
});  



var port = process.env.PORT || 3030;

app.listen(port);

console.log('Listening on port ' + port + '...');