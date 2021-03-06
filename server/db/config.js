const mongoose = require('mongoose');

// Set up MongoDb connection
const mongoURI = 'mongodb://localhost:27017/forumsight';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const db = mongoose.connection;

db.on('connected', () => { console.log('Connected to Mongoose!')});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;