const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const SurveySchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    headers: [],
    answers: []
});

SurveySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Survey', SurveySchema);