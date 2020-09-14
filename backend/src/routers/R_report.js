const express = require('express')
const User = require('../models/M_user')
const auth_user = require('../middleware/auth')
const auth_admin = require('../middleware/admin_auth')
const router = new express.Router()
const formaidable  = require("formidable")
const path = require("path")
const fs  = require("fs-extra")
const { update } = require('../models/M_user')


//get all user list 
router.get('/report/alluser' ,async (req, res) => {
  let all_user = await User.find({})
                      .sort({createdAt: -1})
  res.send({all_user})
})


//get all engineer user
router.get('/report/alluser/engineer' ,async (req, res) => {
  let all_user = await User.find({})
                      .where('role').equals('Engineer')
                      .sort({createdAt: -1})
  res.send({all_user})
})

//get all production user
router.get('/report/alluser/production' ,async (req, res) => {
  let all_user = await User.find({})
                      .where('role').equals('Production')
                      .sort({createdAt: -1})
  res.send({all_user})
})

//get all filter by date 
router.post('/report/alluserByDate', async (req, res) => {
  try {
     let all_user_bydate = await User.find({ reg_date: { $gte: req.body.date_start , $lte:req.body.date_end } }).sort({ createdAt: -1});
     res.send({all_user_bydate})
  } catch (e) {
     res.send({result:false})
  }
})


//get by status all  
router.get('/report/count_status', async (req, res) => {
  let count_status = await User.aggregate([
   {$group:{ _id:{reg_status:"$reg_status"},count:{$sum:1}}},
   {$sort: { count: -1 } }// -1  DESC    //  1 ASC  
  ]);
  res.json(count_status)
})

// get by status all engineer
router.get('/report/count_status/engineer', async (req, res) => {
  let count_status = await User.aggregate([
  { $match: { role: "Engineer" } },
  { $group:{ _id:{reg_status:"$reg_status"},count:{$sum:1}}}, 
  {$sort: { count: -1 } }// -1  DESC    //  1 ASC  
  ]);
  res.json(count_status)
})

// get by status all production 
router.get('/report/count_status/production', async (req, res) => {
  let count_status = await User.aggregate([
  { $match: { role: "Production" } },
  { $group:{ _id:{reg_status:"$reg_status"},count:{$sum:1}}}, 
  {$sort: { count: -1 } }// -1  DESC    //  1 ASC  
  ]);
  res.json(count_status)
})

//get register count this year in 12 month  all 
router.get('/report/count_reg_year', async (req, res) => {
  var date = new Date()
  var d_year =  date.getFullYear()
  let count_status = await User.aggregate([
    { $project: { createdAt: "$createdAt", year :{ "$year" : new Date()}}},
    { $match: { year: d_year } },
    { $group: { _id : {month: { $month: "$createdAt" }, year: { $year: new Date() }  }, count: { $sum: 1 } } },
    { $sort :{"_id.month":1}}
  ]);
  res.json(count_status)
 })


 //get register count this year in 12 month engineer 
router.get('/report/count_reg_year/engineer', async (req, res) => {
  var date = new Date()
  var d_year =  date.getFullYear()
  let count_status = await User.aggregate([
    { $project: { createdAt: "$createdAt", year :{ "$year" : new Date()}, role: "$role"}},
    { $match: { $and: [{ role: 'Engineer' }, { year: d_year  }]}},
    { $group: { _id : {month: { $month: "$createdAt" }, year: { $year: new Date() }  }, count: { $sum: 1 } } },
    { $sort :{"_id.month":1}}
  ]);
  res.json(count_status)
 })


//get register count this year in 12 month production 
router.get('/report/count_reg_year/production', async (req, res) => {
  var date = new Date()
  var d_year =  date.getFullYear()
  let count_status = await User.aggregate([
    { $project: { createdAt: "$createdAt", year :{ "$year" : new Date()}, role: "$role"}},
    { $match: { $and: [{ role: 'Production' }, { year: d_year  }]}},
    { $group: { _id : {month: { $month: "$createdAt" }, year: { $year: new Date() }  }, count: { $sum: 1 } } },
    { $sort :{"_id.month":1}}
  ]);
  res.json(count_status)
 })


//get count all user  
router.get('/report/count_all_user', async (req, res) => {
  let count = await User.aggregate(
  [
   { $count: "userCount" },
  ]
)
  var value =  count[0].userCount
  res.json(value)
})


//get count all user  by role 
router.get('/report/count_all_user_by_role', async (req, res) => {
  let count = await User.aggregate(
  [
    { $group : {_id:"$role", count:{$sum:1}}},
    { $sort :{"_id": 1 }}
  ]
)
  res.json(count)
})


//get json export production // 
router.post('/report/get_json_export/production', async (req, res) => {
 let result = req.body
 let data_gender = req.body.gender
 let date_start = req.body.date_start
 let date_end = req.body.date_end
 var R_date_start = new Date(date_start); 
 var R_date_stop = new Date(date_end); 

 if (data_gender != null && date_start != null && date_end != null){
    var filter_data = {$and:[{role:'Production'},{gender:data_gender},{reg_date: { $gte: R_date_start, $lte: R_date_stop}}]}
 }else if (data_gender == null && date_start != null && date_end != null){
    var filter_data = {$and:[{role:'Production'},{reg_date: { $gte: R_date_start, $lte: R_date_stop}}]}
 }else {
    var filter_data = {$and:[{role:'Production'}]}
 }

 var data = await User.aggregate([
  { $match: filter_data},
  { $project: { 
    _id : "$_id",
    th_prefix : "$th_prefix",
    fullnameTH: { $concat: ["$th_firstname", " ", "$th_lastname" ] } ,
    eng_prefix : "$eng_prefix",
    fullnameENG: { $concat:["$eng_firstname", " ", "$eng_lastname" ] } ,
    nationality: "$nationality",
    phone_number: "$phone_number",
    phone_number_famaily: "$phone_number_famaily",
    person_relationship:"$person_relationship",
    eng_address:"$eng_address",
    age:"$age",
    degree_education:"$degree_education",
    majoy_education:"$majoy_education",
    gpa:"$gpa",
    createdDate: "$createdAt",
    }}
  ]);

  const filed_allowed = [];
  for (var i = 0; i < Object.keys(result).length-4 ; i++ ) {
    filed_allowed.push(result[i].filed);
  }//for

  //get name off fild in obj//
  if(data.length != 0){

  var data_check = Object.getOwnPropertyNames(data[0])

  const index = 1;
  for (var i = 0; i < filed_allowed.length; i++ ) {
    for (var j = 0; j < data_check.length; j++ ){
     if(filed_allowed[i] == data_check[j]) {
       // delete this element //
       const index = data_check.indexOf(data_check[j])
       data_check.splice(index);
      }
    }
  }//for
  
  for (var j = 0; j < data.length; j++ ) {
    for (var k = 0; k < data_check.length; k++ ){
          var val = data_check[k]
          delete data[j][val]
    }
  }//for

  }/// if end//////
  res.json(data)
})


//get json export engineer // 
router.post('/report/get_json_export/engineer', async (req, res) => {
  let result = req.body
  let date_start = req.body.date_start
  let date_end = req.body.date_end

  var R_date_start = new Date(date_start); 
  var R_date_stop = new Date(date_end); 
 
  var filter_data = {$and:[{role:'Engineer'},{reg_date: { $gte: R_date_start, $lte: R_date_stop}}]}

  var data = await User.aggregate([
   { $match: filter_data},
   { $project: { 
     _id : "$_id",
     th_prefix : "$th_prefix",
     fullnameTH: { $concat: ["$th_firstname", " ", "$th_lastname" ] } ,
     eng_prefix : "$eng_prefix",
     fullnameENG: { $concat:["$eng_firstname", " ", "$eng_lastname" ] } ,
     nationality: "$nationality",
     phone_number: "$phone_number",
     phone_number_famaily: "$phone_number_famaily",
     person_relationship:"$person_relationship",
     eng_address:"$eng_address",
     age:"$age",
     job_level:"$job_level",
     job_salary:"$job_salary",
     job_position:'$job_position',
     degree_education:"$degree_education",
     education:"$education",
     majoy_education:"$majoy_education",
     gpa:"$gpa",
     createdDate: "$createdAt",
     }}
   ]);
 
   const filed_allowed = [];
   for (var i = 0; i < Object.keys(result).length-5 ; i++ ) {
     filed_allowed.push(result[i].filed);
   }//for
 
   //get name off fild in obj//
   if(data.length != 0){
   var data_check = Object.getOwnPropertyNames(data[0])
 
   const index = 1;
   for (var i = 0; i < filed_allowed.length; i++ ) {
     for (var j = 0; j < data_check.length; j++ ){
      if(filed_allowed[i] == data_check[j]) {
        // delete this element //
        const index = data_check.indexOf(data_check[j])
        data_check.splice(index);
       }
     }
   }//for
   
   for (var j = 0; j < data.length; j++ ) {
     for (var k = 0; k < data_check.length; k++ ){
           var val = data_check[k]
           delete data[j][val]
     }
   }//for
 
   }/// if end//////
   res.json(data)
 })




module.exports = router