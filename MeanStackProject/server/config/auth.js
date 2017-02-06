var passport = require('passport');

exports.authenticate = function (req, res, next)
{
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
