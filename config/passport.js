const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

// Serialize And Deserialize

passport.serializeUser(function (user, done) {
    return done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id,function(err, user){
        done(err, user);
    });
});

// Middleware

passport.use('local-login',new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function (req, email, password, done) {
    User.findOne({email : email}, function (err, user) {
        if(err) return done(err, user);

        if(!user){
            console.log('Login : No User');
            return done(null, false, req.flash('loginMessage','No user has been found'));
        }

        if(!user.comparePassword(password)){
            console.log('Login : Wrong Password');
            return done(null, false, req.flash('loginMessage','Oops! Wrong Password'));
        }
        console.log('Access Granted');
        return done(null, user);
    });
}));

module.exports = passport;