const path = require('path');
const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Routes
const authRoutes = require('./routes/auth');

// passport strategies
const auth = require('./auth/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// general error handler
const errorHandler = (err, req, res, next) => {
  res.send({ error: err.message.split(',') })
}

// Setup parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

// Setup session
app.use(session({
  secret: 'keyboard cat',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,   // don't save session if unmodified
  saveUninitialized: false  // don't create session until something stored
}));

mongoose.set('useUnifiedTopology', true);

app.use(passport.session());

// Enable cors
app.use(cors({ credentials: true, origin: true }));

// Need to read cookie
app.use(cookieParser());

// Configure passport middleware
app.use(passport.initialize()); 
app.use(passport.session()); 

// Routes will begin with `/api/auth`
app.use('/api/auth', authRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
