// { _id: 59e1ee9d72431e489a15905e,
//     email: 'anshul@gmail.com',
//     password: '$2a$10$w1ROnKIdRDt5UkueqKkd7u3W6eDexes9gRT8F5ievawQNrUrA1WLa',
//     __v: 0,
//     profile:
//     { age: 12,
//         bio: 'asfsdf',
//         occupation: 'knadssadf',
//         picture: 'https://gravatar.com/avatar/a22e80116c69354e2d2abb10bb1b1cd8?s=200&d=wavatar',
//         name: 'Anshul Wadhawan' } }


let router = require('express').Router();
let mongoose = require('mongoose');
const User = require('../models/users');
const Stories = require('../models/stories');
const passport = require('../config/passport');
const async = require('async');
const moment = require('moment');

router.get('/', function (req, res ,next) {
    res.render('main/home');
})

function checkLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/mood',function (req, res, next) {
    if(req.user){
        res.render('main/landing');
    }
    else
        res.redirect('/login');
});

router.get('/stories', checkLoggedIn,function (req, res, next) {
    let happiness = parseInt(req.query.happiness);
    Stories.find({happiness: {$gt:-1}}).sort({happiness:-1}).populate('author').exec(function (err, result) {
        if(err) return next(err);
        User.findById(req.user._id, function (err, user) {
            if(err) return next(err);
            res.render('main/stories',{
                happiness: happiness,
                stories : result,
                liked : user.liked
            });
        })
    });
});

router.get('/my-posts', checkLoggedIn,function (req, res, next) {

    Stories.find({author : req.user._id}).populate('author').exec(function (err, result) {
        if(err) return next(err);
        User.findById(req.user._id, function (err, user) {
            if(err) return next(err);
            res.render('main/myPosts',{
                stories : result,
                liked : user.liked,
                picture : user.profile.picture
            });
        })
    });
});

router.post('/stories',function (req, res, next) {
    let story = new Stories();
    story.author = req.user._id;
    story.happiness = req.body.happiness;
    story.text = req.body.text;
    story.created_at = moment().format("MMM Do YY");

    story.save(function (err) {
        if(err){
            return next(err);
        }
        res.redirect('/stories?happiness='+req.body.happiness);
    });
});

router.get('/profile',checkLoggedIn,function (req,res) {
    User.findOne({ _id: req.user._id }, function(err, user) {
        if (err) return next(err);
        res.render('accounts/profile', { user: user });
    });
});

router.post('/like', function (req, res, next) {
    let id = req.body.id;

    async.waterfall([
        function (callback) {
            Stories.findById(id, function (err, story) {
                if(err) return next(err);
                story.likes+=1;
                story.save(function (err) {
                    if(err) return next(err);
                    callback(null);
                });
            });
        },
        function () {
            User.findById(req.user._id, function (err, user) {
                if(err) next(err);
                user.liked.push(id);
                user.save(function (err) {
                    if(err) return next(err);
                    if(req.body.happiness<50)
                        res.redirect('/stories?happiness='+(parseInt(req.body.happiness)+1));
                    else
                        res.redirect('/stories?happiness='+req.body.happiness);
                });
            });
        }
    ])
});

router.get('/login',function (req, res) {
    if(req.user) return res.redirect('/');
    res.render('accounts/login',{message : req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/mood',
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
    user.profile.age = req.body.age;
    user.profile.occupation = req.body.occupation;
    user.profile.bio = req.body.bio;
    user.profile.picture = user.gravatar();
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
                req.logIn(user,function (err) {
                    if(err) return next(err);
                    res.redirect('/mood');
                });
            });
        }
    });
});

router.get('/logout',function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;