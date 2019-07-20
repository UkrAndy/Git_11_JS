var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

//var flash = require('connect-flash');
//app.use(flash());

const User=require("../../models/User")

passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log("Email11 : "+ username);
        User.findOne({ 'email':username })
            .then((user) => {
                console.log("Email : "+ user.email);
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
