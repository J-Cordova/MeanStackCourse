var passport = require('passport');

exports.authenticate = function (req, res, next)
{
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function (err, user)
    {
        if (err) { return next(err); }

        if (!user) 
        {
            res.send({ success: false });
        } 
        else //proper login
        {
            req.logIn(user, function (err)
            {
                if (err) 
                {
                    return next(err);
                }
                else
                {
                    res.send({ success: true, user: user })
                }
            })
        }
    });
    //acutally call method defined above
    auth(req, res, next);
}

exports.requireApiLogin = function (req,res, next) // middleware to preempt all the calls with autorization
{
        if(req.isAuthenticated() == false) // given by passport
        {
            res.status(403);
            res.end();
        }
        else
        {
            next();
        }    
}


exports.requiresRole = function(role)
{
    return function(req,res,next)
    {
        if( (req.isAuthenticated() == false) || req.user.roles.indexOf(role) == -1)
        {
            res.status(403);
            res.end();
        }
        else
        {
            next();
        }
    }
}