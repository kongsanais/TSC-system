const express = require('express')
const Admin = require('../models/M_admin')
const auth = require('../middleware/auth')
const router = new express.Router()
const formaidable  = require("formidable")
const path = require("path")
const fs  = require("fs-extra")



router.post('/admin/register', async (req, res) => {
    try{
      const form = new formaidable.IncomingForm()
      form.parse(req, async (error,fields,files) =>
      {   
          res.send(fields)
          const admin  = new Admin(fields)
          await Admin.find({email : admin.email}, async function (err, docs) 
            {
            if (docs.length == 1) {
                 res.json({ result: false, message: JSON.stringify(error) }); 
            }else{               
                  let result =  await admin.save();
                  res.json({result: true , message: JSON.stringify(result)})
            }
          });
      })
    }catch(error){
       res.json({ result: false, message: JSON.stringify(error) });
    }
})



router.post('/admin/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({result:true,user,token })
    } catch (e) {
      res.send({result:false})
  }
})


router.post('/admin/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router