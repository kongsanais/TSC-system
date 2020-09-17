const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const questionSchema = new mongoose.Schema({
    question:{
        type: String,
        trim: true
    },
    ans: {
        type: Array
    },
    quiz: { type: Schema.Types.ObjectId, ref: 'Quizs' },
},)
 

const Question = mongoose.model('Question', questionSchema ,'Questions')

module.exports = Question