const mongoose = require('mongoose')


const depSchema = new mongoose.Schema({
    dep_name:{
        type: String,
        unique: true,
        trim: true,
    },
},{
    timestamps: true
})
 

const Dep = mongoose.model('Dep', depSchema ,'Deps')

module.exports = Dep