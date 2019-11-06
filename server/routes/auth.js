const express = require('express');
const cors = require('cors');
const passport = require('passport');

const authController = require('../controllers/AuthController');

const router = express.Router();

function isLoggedIn(req, res, next) {
  // passport adds this to the request object
  if (req.isAuthenticated()) {
      return next();
  } 
  res.redirect('/login');
}

// use as middleware for routes that need auth
// passport.authenticate('jwt', {session: false})
// example
// router.get(
//      '/path',
//      passport.authenticate('jwt', {session: false}),
//      (req, res) => ....
// )

// for testing auth route that needs token/cookie once user has logged in
router.get('/testauth', passport.authenticate('local', { session: false }), (req, res) => {
  res.send('success!');
});

// All routes in this file start with `api/auth`

/*  @route   GET api/auth/test
    @desc    Test auth route
    @access  Public */
router.get('/test', (req, res) => res.json({ msg: 'Auth Route reached' }));

/*  @route   GET api/auth/users
    @desc    Test route to get all users
    @access  Public */
router.get('/users', authController.getUsers);

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.options('/register', cors());
router.post('/register', cors(), authController.validate('register'), authController.register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.postLogin);

// @route   GET api/auth/google
// @desc    Redirect user to Google.com for authorization
// @access  Public
router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/forms'],
  failureRedirect: '/',
  session: true
  }), 
  (req, res) => {
    console.log("req",req)
    console.log("res",res)
    res.redirect('/')
    //authController.googleLogin(req, res)
  }
);

// @route   GET api/auth/google/callback
// @desc    Set session cookie
// @access  Public
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }),
    (req, res) => {
      console.log("auth controller")
      res.redirect('/')
      //authController.googleLogin(req, res)
    }
);

// @route   GET api/auth/current
// @desc    Return current user
// @access  Private
router.get('/current', authController.getCurrentUser);

// @route   GET api/auth/logout
// @desc    Logout user
// @access  Public
router.get('/logout', authController.logout);

module.exports = router;
