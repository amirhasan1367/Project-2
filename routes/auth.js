var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);


app.get('/ridesticket', authController.ridesticket)


app.get('/rides', authController.rides)



app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/ridesticket',
                                                    failureRedirect: '/signup'}
                                                    ));


app.get('/dashboard',isLoggedIn, authController.dashboard);


app.get('/logout',authController.logout);


app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/ridesticket',
                                                    failureRedirect: '/signup'}
                                                    ));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}






