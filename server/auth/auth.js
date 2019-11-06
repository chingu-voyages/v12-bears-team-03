const passport = require('passport');

// Passport strategies
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;;

// need User for strategies
const User = require('../models/User');

// passport-local-mongoose takes care of comparing passwords, etc
// Configure passport-local to use User model for authentication (local strategy)

//passport.use(User.createStrategy());
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    }); 
    passport.deserializeUser((profile, done)=> {
        User.findById(profile.id).then((user)=>{
            done(null, user)
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        });
    });
    passport.use(User.createStrategy());
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/auth/google/callback',
        scope: ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/drive.readonly'],
        passReqToCallback   : true
        },
        (req, token, refreshToken, profile, done) => {
            console.log(profile)
            console.log("req", req.user)
            User.findOne({'google.id': profile.id}).then((err,currentUser) => {
                if(err) {
                    console.log(err)
                    return done(err);
                }
                if(currentUser) {
                    console.log("current user", currentUser);
                    return done(null, currentUser)
                }
                else {
                    let newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = profile.token;
                    newUser.google.name = profile.name.displayName;
                    newUser.google.email = profile.emails[0].value;
                    newUser.google.token = token;
                    newUser.refreshToken = refreshToken;
                    newUser.save().then(newUser => {
                        console.log("new user created", newUser);
                        return done(null, newUser);
                    })
                }
            })
            
        })
    );
};



 


