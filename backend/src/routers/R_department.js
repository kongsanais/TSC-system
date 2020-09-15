const express = require('express')
const Dep = require('../models/M_department')
const auth = require('../middleware/admin_auth.js')
const router = new express.Router()


router.post('/department/add', auth , async (req, res) => {
    try{
        const dep_name  = req.body.dep_name
        const  data = new Dep({dep_name: dep_name})
        const  value = await data.save(); 
        res.json({result: true , message: JSON.stringify(value)})
    }catch(error)
    {
       res.json({ result: false, message: JSON.stringify(error) });
    }
})


router.delete('/department/:id', auth , async (req, res) => {
    try {
        const data = await Dep.findOneAndDelete({ _id: req.params.id})
        if (!data) {
            res.status(404).send()
        }
        res.send(data)
    } catch (e) {
        res.json(e);
    }
})


module.exports = router