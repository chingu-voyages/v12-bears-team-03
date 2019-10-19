const passport = require('passport');

// Passport strategies
const GoogleStrategy = require('passport-google-oauth').Strategy;

// need User for strategies
const User = require('../models/User');

// passport-local-mongoose takes care of comparing passwords, etc
// Configure passport-local to use User model for authentication (local strategy)
passport.use(User.createStrategy());
passport.use(GoogleStrategy);

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());
 


