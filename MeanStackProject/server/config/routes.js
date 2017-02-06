var auth = require('./auth');

module.exports = function(app)
{
    app.get('/partials/*', function (req, res)
    {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res)
    {
        req.logout();// logout function is provided by passport
        res.end();
    });

    app.get('*', function (req, res)// matches all routes or coordinate routes between client and server
    {
       res.render('index', 
       {
           bootstrappedUser: req.user
       }); 
    });  
    
}