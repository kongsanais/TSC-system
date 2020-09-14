const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    dep_name:{
        type: String 
    },
},{
    timestamps: true
})
 

const Dep = mongoose.model('Dep', userSchema ,'Deps')

module.exports = Dep