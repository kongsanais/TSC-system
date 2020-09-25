const express = require('express')
const Dep = require('../models/M_department')
const auth = require('../middleware/admin_auth.js')
const router = new express.Router()


router.get('/department/department_list_withquiz/:_id', async (req, res) => {
    let id = req.params._id;
    let Dep_list  = await Dep.findOne({})
                   .populate('dep_quiz')
                   .where('_id').equals(id)
                   .sort({createdAt: -1})
    var res_data = Dep_list.dep_quiz;
    res.send({res_data})
})


router.get('/department/department_list', async (req,res)=>{
    let Dep_list  = await Dep.find({}).populate('dep_quiz').sort({createdAt: -1})
    res.send({Dep_list})
})



router.get('/department/get_only_depart', async (req,res)=>{
    let Dep_list  = await Dep.find({}).select('dep_name').sort({createdAt: -1})
    res.send({Dep_list})
})

  

router.post('/department/add', async (req, res) => {
    try{
        const  data = new Dep({dep_name: req.body.depart_name , dep_quiz : req.body.select_quiz})
        const  value = await data.save(); 
        res.json({result: true , message: JSON.stringify(value)})
    }catch(error)
    {
       res.json({ result: false, message: JSON.stringify(error) });
    }
})


router.post('/department/remove' , async (req, res) => {
    try {
        const data = await Dep.findOneAndDelete({ _id: req.body.depart_id})
        if (!data) {
            res.status(404).send()
        }
        res.send(data)
    } catch (e) {
        res.json();
    }
})


module.exports = router