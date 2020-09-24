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
    try {

    const obj = JSON.parse(JSON.stringify(req.body));
    //insert quiz//
    const quiz  = new Quiz(obj)
    var result_q =  await quiz.save();
    let my_quiz_id = result_q._id;


    // only record quiz//
    const reqFiles = []
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(req.files[i].filename)
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
        { $push: {quiz_question:my_ques_id }},
       function (error, success) {
          if (error) {
             console.log(error);
          } else {
            console.log(success);
          }
      });

    }
    res.send({ result: true, message: JSON.stringify(result_qes)}) 
  }
  catch(error){
    console.log(error)
    res.json({ result: false, message: JSON.stringify(error)});
  }
})




router.post('/quiz/remove', async (req, res) => {
  try {
      let q_id = req.body.quiz_id
      const quiz = await Quiz.findOneAndDelete({ _id: q_id})
      const question  = await Question.deleteMany({ Idquiz: q_id}) 
      res.json({ quiz: quiz, question: question,result: true});
  } catch (e) {
      res.status(500).send(e)
  }
})


router.get('/quiz/quiz_list', async (req,res)=>{
  let quiz_list  = await Quiz.find({}).sort({createdAt: -1})
  res.send({quiz_list})
})


router.post('/quiz/show', async (req,res)=>{
  let q_id = req.body.q_id;
  Quiz.findOne()
  .populate('quiz_question')
  .where('_id').equals(q_id)
  .exec(function (err, show_quiz) {
    if (err) return handleError(err);
    //console.log(show_quiz)
    res.json({show_quiz})
  });
})


router.post('/quiz/edit_question', upload.single('file'), async (req,res)=>{
  try {
    let temp_file
    temp_file = req.file == undefined || req.file == null ? temp_file = null : temp_file = req.file.filename
    const obj = JSON.parse(JSON.stringify(req.body));
    const ans_array = JSON.parse(obj.ans)
    const filter = { _id: req.body.question_id};

    var update; 

    if(temp_file == null){
      update = { question: req.body.ques ,ans:ans_array}
    }else{
      update = { question: req.body.ques ,ans:ans_array,img:temp_file}
    }
  
    let data = await Question.findOneAndUpdate(filter, update,{new: true});
    res.send({ result: true, message: JSON.stringify(data)}) 
  }
  catch(error){
    console.log(error)
    res.json({ result: false, message: JSON.stringify(error)});
  }
})


router.post('/quiz/add_question', upload.single('file'), async (req, res) => {
  try {
    let temp_file
    temp_file = req.file === undefined ? temp_file = null : temp_file = req.file.filename;
    
    const obj = JSON.parse(JSON.stringify(req.body));
    const ans_array = JSON.parse(obj.ans)
    const ques  = new Question({question:obj.question,ans:ans_array,img:temp_file,Idquiz:obj.quiz_id})
        
    Quiz.findOneAndUpdate({ _id: obj.quiz_id },{ $push: {quiz_question:ques._id }},
     function (error, success) {
        if (error) {
           console.log(error);
        } else {
          console.log(success);
        }
    });

    var result_qes =  await ques.save();
    res.send({ result: true, message: JSON.stringify(result_qes)}) 
  } catch (e)
  {
     console.log(e)
     res.status(500).send(e)
  }
})



router.post('/quiz/remove_question', async (req, res) => {
  try {
      let quiz_id = req.body.quiz_id
      let ques_id = req.body.ques_id
      //for delete id in [quiz] //
      const quiz = await Quiz.updateOne({ "_id": quiz_id },{ "$pull": { "quiz_question": ques_id } })
      const question  = await Question.deleteOne({ _id: ques_id}) 
      res.json({result: true});

  } catch (e) {
    console.log(e)
      res.status(500).send(e)
  }
})




module.exports = router