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


//get json for export 
router.get('/report/export_json/engineer', async (req, res) => {
  let data = await User.aggregate([ 
    { $match: { role : "Production" } },
    { $project: { email: "$email" , 
        fullnameTH: { $concat: [ "$th_prefix"," ","$th_firstname", " ", "$th_lastname" ] } , 
        fullnameENG: { $concat:[ "$eng_prefix"," ","$eng_firstname", " ", "$eng_lastname" ] } , 
        nationality: "$nationality", phone_number: "$phone_number", phone_number_famaily: "$phone_number_famaily",
        person_relationship:"$person_relationship", 
        eng_address:"$eng_address", 
        date_birthday:"$date_birthday", 
        age:"$age", job_level:"$job_level",
        job_position:"$job_position", 
        job_salary:"$job_salary", 
        education:"$education", 
        degree_education:"$degree_education",
        majoy_education:"$majoy_education", 
        gpa:"$gpa", 
        createdDate: "$createdAt" }},
        
      ])
  res.json(data)
})




module.exports = router