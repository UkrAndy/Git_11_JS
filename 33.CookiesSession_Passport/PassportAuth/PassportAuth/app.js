const mongoose = require("mongoose");
const express = require("express");
const path=require("path");
const app = express();
const jsonParser = express.json();
const util=require('util');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
const productsRouter=require("./routers/productsRouter")
const usersRouter=require("./routers/userRouter")
app.use(express.static(__dirname + "/public"));
require("./config/Auth");
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;


// var passport = require('passport')
//     , LocalStrategy = require('passport-local').Strategy;
//
//const auth=require("./config/auth");
/*
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var flash = require('connect-flash');

app.use(flash());

const User=require("./models/User")

passport.use(new LocalStrategy(
 (username, password, done) => {
        console.log("Email11 : "+ username);
    User.findOne({ 'email':username })
        .then((user) => {
            console.log("Email : "+ user.username);
            if(!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }

            return done(null, user);
        }).catch(done);
}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
*/


var session = require("express-session"),
    bodyParser = require("body-parser");
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


//---------------------
app.get('/login',function (req,res) {
    res.redirect("loginForm.html")
})


const urlencodedParser = bodyParser.urlencoded({extended: false});
app.post('/loginn1',urlencodedParser ,function (req,res) {
    User.findOne({ email:req.body.email })
        .then((user) => {
            console.log("Email1 : "+ user.email);
            if(!user || !user.validatePassword(req.body.password)) {
                console.log("bad");
                //return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }
else
                console.log("ok");
            //return done(null, user);
        });//.catch(done);
});

// app.post('/loginn',  passport.authenticate('local'),
//     function(req, res) {
//     console.log(req.user.email);
//         // If this function gets called, authentication was successful.
//         // `req.user` contains the authenticated user.
//         //res.redirect('/users/' + req.user.username);
//     });
app.post('/loginn',  passport.authenticate('local', { successRedirect:'/', //'AddProductForm.html',
    failureRedirect: '/login' }));

app.get("/secret",function (req,res) {
    if(req.user)
    res.send("Okkkk");
    else
        res.send("No");
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.get("/",function (req,res) {
    //res.sendFile('index.html')
    res.render("index",{user:req.user});
})
mongoose.connect("mongodb://localhost:27017/Productsdb", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});




