const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    voyages: []
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    findByUsername: (model, queryParameters) => {
        return model.findOne(queryParameters);
      }
});

module.exports = mongoose.model('User', UserSchema);