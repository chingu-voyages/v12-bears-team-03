const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/User');

// Validate Sign Up form input
exports.validate = (method) => {
    switch (method) {
      case 'register': {
          return [
            body('email', 'Invalid email')
              .trim()
              .exists()
              //.normalizeEmail()
              .isEmail(),
            body('password', 'Invalid password. Password must have at least one upper case character, one special character, and be at least 6 digits long. ')
              .trim()
              .exists()
              .isLength({ min: 6 })
              .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
          ]      
      }
      default: {
        return null;
      }
    }
  };

  // Register a new user
exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.session)
    // format the error from validatorResult
    const errorFormatter = ({
      location, msg, param, value, nestedErrors
    }) => `${msg}`;
  
    const errors = validationResult(req).formatWith(errorFormatter);
  
    // If there are validation errors from express-validator
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      const existingEmail = await User.findByUsername(email);
  
      if (existingEmail) {
        return res
          .status(400)
          .json({ error: 'An account is already associated with this email. Please login or choose another one.' });
      }
  
      try {
          const newUser = await User.register(new User({"email": email}), password, (err, user) => {
            if(err) {
              res.status(500).json(err);
            }
            const authenticate = User.authenticate();
            authenticate(email, password, (err, result) => {
              if(err) {
                res.status(err.status || 401).json(err);
              }
              req.session.userId = result._id;
              req.session.save();
              res.json(result);
            });
          });
        } catch (err) {
          res.json({success: false, message: "An error occurred: ", err})
        }
    }
};

exports.getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.json({
        message: 'Success',
        data: users
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ err });
    });
};

exports.postLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }, (err, user) => {
        if(err || !user) {
          res.status(err.status || 401).send({err})
        } else {
          req.session.userId = result._id;
          req.session.save();
          res.status(200).send("logged in");
        }
    });
      
  } catch(err) {
    console.log(err);
  }
};

exports.getCurrentUser = (req, res) => res.json({ msg: 'Current user' });