const express = require('express')
const Quiz = require('../models/M_quiz.js')
const Question = require('../models/M_question.js')
//const auth = require('../middleware/admin_auth.js')
const router = new express.Router()
const formaidable  = require("formidable")
const path = require("path")
const fs  = require("fs-extra")
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./uploaded/quiz/"));
  },
  filename: (req, file, cb) => {
    var  timestamp =  + new Date()
    var  fileName = file.originalname.toLowerCase().split(' ').join('-');
    var  lastDot = fileName.lastIndexOf('.');
    var  onlyname = fileName.substring(0, lastDot);
    var  fileExtention = fileName.split(".")[1];
    var  temp  = `${onlyname}${timestamp}.${fileExtention}`;
    cb(null, temp)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

router.post('/quiz/add', upload.array('files',10), async (req,res)=>{
    
   const obj = JSON.parse(JSON.stringify(req.body));
   console.log(obj)
   
    //insert quiz//
    const quiz  = new Quiz(obj)
    var result_q =  await quiz.save();
    console.log(result_q._id);
    let my_quiz_id = result_q._id;
    // insert question //
    const ques_obj  =  JSON.parse(obj.ques);//convert to obj
    for(var i = 0 ; i < ques_obj.length ; i++)
    {
      const ques  = new Question({...ques_obj[i],quiz:my_quiz_id})
      var result_qes =  await ques.save();
      console.log(result_qes)
    }
    
    // const reqFiles = []
    // const url = req.protocol + '://' + req.get('host')
    // for (var i = 0; i < req.files.length; i++) {
    //   reqFiles.push(url + '/quiz/' + req.files[i].filename)
    // }
    // console.log(reqFiles)
})

router.get('/quiz/show', async (req,res)=>{
  Question.
  find({quiz:"5f6338fa1e6c4021900f7f70"}).
  populate('Quiz').
  exec(function (err, data) {
    if (err) return handleError(err);
    console.log(data);
    res.send(data)
    // prints "The author is Ian Fleming"
  });
})


// router.post('/quiz/upload', upload.single('upload'), async (req, res) => {
//     const data  = req.file.buffer
//     res.send(data)
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })



module.exports = router