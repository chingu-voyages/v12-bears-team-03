const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const VoyageSchema = new Schema({
    name: {
        type: String
    },
    members: []
});

VoyageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Voyage', VoyageSchema);