const express = require("express");
const Courses = require("../models/courseschema");
const route = express.Router();
// The parent path of all is "*host-url*/api/courses/*next-routes*"


route.get("/getCourseByName",async(req,res)=>{
    try{
        const courseName = req.query.courseName;
        const result = await Courses.findOne({courseName:courseName});
        res.status(200).json({course:result,success:true});
    }catch(error){
        res.status(500).json({success:false});

    }
});



route.get('/getAllCourses',async(req,res)=>{
    try{
        const result = await Courses.find({});
        res.status(200).json({courses:result});
    }catch(error){
        res.status(500).json({message:error.message});
    }
    
});

route.post("/addCourse",async(req,res)=>{
    try{
        const course = await Courses.create({
            courseName : req.body.courseName,
            numberOfSemesters : req.body.numberOfSemesters,
        });
       res.status(200).json({course:course,success:true});
    }catch(error){
        res.status(400).json({success:false,message: error.message});
    }
});

route.put("/updateCourse",async(req,res)=>{
    try{
       await Courses.updateOne({_id:req.body._id},{
            courseName: req.body.courseName,
            numberOfSemesters : req.body.numberOfSemesters,
        });
        res.status(200).json({success:true});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
});

route.delete("/deleteCourse",async(req,res)=>{
    try{
        const courseId = req.query.courseId;
        await Courses.deleteOne({_id:courseId});
        res.status(200).json({success:true});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
});

module.exports = route;
