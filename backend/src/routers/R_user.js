const express = require('express')
const User = require('../models/M_user')
const auth = require('../middleware/auth')
const router = new express.Router()
const formaidable  = require("formidable")
const path = require("path")
const fs  = require("fs-extra")
const { update } = require('../models/M_user')


uploadImage = async (files, doc) => {
  if (files.imageURL != null) {
    var fileExtention = files.imageURL.name.split(".")[1];
    doc.imageURL = `${doc._id}.${fileExtention}`;
    var newpath =
      path.resolve("./uploaded/images/") + "/" + doc.imageURL;

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.imageURL.path, newpath);

    // Update database
    let result = User.findOneAndUpdate({ _id: doc._id }, {imageURL: doc.imageURL});
    return result;
  }
};


uploadResume = async (files, doc) => {
  if (files.resumeURL != null) {
    var fileExtention = files.resumeURL.name.split(".")[1];
    doc.resumeURL = `${doc._id}.${fileExtention}`;
    var newpath =
      path.resolve("./uploaded/resume/") + "/" + doc.resumeURL;

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }

    await fs.moveSync(files.resumeURL.path, newpath);

    // Update database
    let result = User.findOneAndUpdate({ _id: doc._id }, {resumeURL: doc.resumeURL});
    return result;
  }
};


router.post('/users', async (req, res) => {
    try{
      const form = new formaidable.IncomingForm()
      form.parse(req, async (error,fields,files) =>
      {   
          const user  = new User(fields)
          const user_file  = files ; 

          await User.find({email : user.email}, async function (err, docs) 
          {
            if (docs.length == 1) {
                 res.json({ result: false, message: JSON.stringify(error) }); 
            }else{               
                  let result =  await user.save();
                  await  uploadImage(user_file,result)
                  await  uploadResume(user_file,result)
                  res.json({result: true , message: JSON.stringify(result)})
            }
          });
      }
    )
    }catch(error){
       res.json({ result: false, message: JSON.stringify(error) });
    }
})


router.put("/users/update", auth , (req, res)=>{
  try {
    const form = new formaidable.IncomingForm()
    form.parse(req, async (error, fields, files) => 
    {
        const user  = new User(fields)
        const user_file  = files;

        let result = await User.findOneAndUpdate({ "_id": user._id }, 
        { "$set": { 

          "th_prefix"  :  user.th_prefix,
          "th_firstname": user.th_firstname,
          "th_lastname" : user.th_lastname,
          "eng_prefix"  : user.eng_prefix,
          "eng_firstname" : user.eng_firstname,
          "eng_lastname"  : user.eng_lastname, 
          "nationality"  : user.nationality,
          "phone_number" : user.phone_number,
          "phone_number_famaily" : user.phone_number_famaily,
          "person_relationship"  : user.person_relationship,
          "eng_address"   : user.eng_address,
          "date_birthday" : user.date_birthday,
          "job_level" : user.job_level,
          "job_position" : user.job_position,
          "job_salary" : user.job_salary,
          "age": user.age,
          "education" : user.education,
          "gpa" : user.gpa

        }},{ new: true })

        await uploadImage(user_file, fields);
        await uploadResume(user_file,fields);

        res.json({result: true , message: JSON.stringify(result)})

    }); 
  } catch (error) {
        res.json({result: false , message: JSON.stringify(result)})
  }
})


  
router.post('/users/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({result:true,user,token })
    } catch (e) {
      res.send({result:false})
  }
})




router.post('/users/logout', auth, async (req, res) => {
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




router.get('/users/profile', auth, async (req, res) => {
    let profile  = req.user;
    res.send({profile})
})




router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/test', async (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
   console.log(fullUrl)
})




// router.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.remove()
//         res.send(req.user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })





module.exports = router