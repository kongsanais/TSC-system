const mongoose = require('mongoose')


const quizSchema = new mongoose.Schema({
    quiz_name:{
        type: String,
        unique: true,
        trim: true
    },
    quiz_type:{
        type: String,
        trim: true
    },
    quiz_time:{
        type: Number
    }
},{
    timestamps: true
})
 

const Quiz = mongoose.model('Quiz', quizSchema ,'Quizs')

module.exports = Quiz