const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const scoreSchema = new mongoose.Schema({
    score_data : {
        type: String,
        index: true 
    },
    user_id :{
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true 
    },
    quiz_id :
    { 
        type: Schema.Types.ObjectId, 
        ref: 'Quiz',
        index: true 
    }
},{
    timestamps: true
})
 
scoreSchema.index({quiz_id: 1, user_id:1, score_data: 1},{unique: true});

const Score = mongoose.model('Score', scoreSchema ,'Scores')
module.exports = Score