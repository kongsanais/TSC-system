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
   
    //insert quiz//
    const quiz  = new Quiz(obj)
    var result_q =  await quiz.save();
    let my_quiz_id = result_q._id;


    // only record quiz//
    const reqFiles = []
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/quiz/' + req.files[i].filename)
    }
    
    // insert question //
    const ques_obj  =  JSON.parse(obj.ques);//convert to obj
    for(var i = 0 ; i < ques_obj.length ; i++)
    {
      const ques  = new Question({...ques_obj[i],Idquiz:my_quiz_id,img:reqFiles[i]})
      var result_qes =  await ques.save();
      let my_ques_id = result_qes._id
      Quiz.findOneAndUpdate(
        { _id: my_quiz_id }, 
        { $push: {quiz_question:my_ques_id } },
       function (error, success) {
          if (error) {
             console.log(error);
          } else {
            console.log(success);
          }
      });
      console.log(result_qes)
    }

     
    res.send(result_qes)


})


router.get('/quiz/quiz_list', async (req,res)=>{
  let quiz_list  = await Quiz.find({}).sort({createdAt: -1})
  res.send({quiz_list})
})


router.get('/quiz/show', async (req,res)=>{

  // Quiz.find().populate('quiz_question').sort({createdAt: -1}).exec(function (err, data) {
  //   if (err) return handleError(err);
  //   console.log(data);
  //   res.send(data)
  // });

  Question.find().populate('quiz').
  exec(function (err, data) {
    if (err) return handleError(err);
    console.log(data);
    res.send(data)
  });

})



// router.post('/quiz/upload', upload.single('upload'), async (req, res) => {
//     const data  = req.file.buffer
//     res.send(data)
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })



module.exports = router