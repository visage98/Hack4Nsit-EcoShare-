const express = require('express');
const morgan = require('morgan');
const bp = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const engine = require('ejs-mate');

const userRouter = require('./routes/user');

const session = require('express-session');
const cp = require('cookie-parser');
const flash = require('express-flash');
const config = require('./config/config');
const passport = require('./config/passport');
const MongoStore = require('connect-mongo')(session);

const app = express();

mongoose.connect(config.database,{useMongoClient : true}).then(function (db) {
    console.log("Connection Established");
}).catch(function (err) {
    console.log(err);
});

app.use('/',express.static(__dirname+'/public'));

app.use(morgan('dev'));
app.use(bp.json());
app.use(bp.urlencoded({extended : true}));

app.use(cp(config.secretKey));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret : config.secretKey,
    store : new MongoStore({url : config.database , autoReconnect: true})
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.engine('ejs',engine);
app.set('view engine','ejs');
app.use(userRouter);

app.listen(process.env.PORT ||  config.port,function(){
console.log("Server started on http://localhost:"+config.port);
});