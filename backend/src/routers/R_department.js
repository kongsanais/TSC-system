const express = require('express')
const Dep = require('../models/M_department')
const auth = require('../middleware/admin_auth.js')
const router = new express.Router()


router.post('/department/add', async (req, res) => {
    try{
        const dep_name  = req.body.dep_name
        let data = new Dep({dep_name: dep_name})
        data.save();
        res.json({result: true , message: JSON.stringify(data)})
    }catch(error){
        console.log(error)
       res.json({ result: false, message: JSON.stringify(error) });
    }
})





module.exports = router