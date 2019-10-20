const express = require('express');
const cors = require('cors');
const passport = require('passport');

const authController = require('../controllers/AuthController');

const router = express.Router();

function isLoggedIn(request, response, next) {
  // passport adds this to the request object
  if (request.isAuthenticated()) {
      return next();
  }
  response.redirect('/login');
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

// @route   GET api/auth/current
// @desc    Return current user
// @access  Private
router.get('/current', authController.getCurrentUser);

module.exports = router;
