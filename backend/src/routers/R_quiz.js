const express = require('express')
const Quiz = require('../models/M_quiz.js')
//const auth = require('../middleware/admin_auth.js')
const router = new express.Router()


router.post('/quiz/add', async (req, res) => {
    try{
        //const dep_name  = req.body.dep_name;
        console.log("test")
    }catch(error)
    {
       res.json({ result: false, message: JSON.stringify(error) });
    }
})




module.exports = router