let router = require('express').Router();

const User = require('../models/users');
const passport = require('../config/passport');
const async = require('async');

function checkLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/profile',checkLoggedIn,function (req,res) {
    User.findOne({ _id: req.user._id }, function(err, user) {
        if (err) return next(err);
        res.render('accounts/profile', { user: user });
    });
});

router.get('/login',function (req, res) {
    if(req.user) return res.redirect('/');
    res.render('accounts/login',{message : req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));


router.get('/signup',function (req, res) {
    res.render('accounts/signup',{
        errors : req.flash('errors')
    });
});

router.post('/signup', function (req, res, next) {
    let user = new User();


    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    // user.profile.picture = user.gravatar();

    User.findOne({email : req.body.email}, function (err, existingUser) {
        if(existingUser){
            req.flash('errors','Account with this email address already exists.')
            return res.redirect('/signup');
        } else {
            user.save(function (err) {
                if(err){
                    return next(err);
                }
                return res.redirect('/profile');
            });
        }
    });
});

router.get('/logout',function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;