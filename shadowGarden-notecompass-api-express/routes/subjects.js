const express = require("express");
const route = express.Router();
const Subjects = require("../models/subjectschema");


route.get("/getSubjectByCourseAndSemester",async(req,res)=>{
    try{
        
        const courseName = req.query.courseName;
        const semesterNumber = req.query.semesterNumber;
        const result = await Subjects.find({
            courseName:courseName,
            semesterNumber:semesterNumber,
        });
        res.status(200).json({subjects:result,success:true});
    }catch(error){
        res.status(500).json({error:message.error,success:false});
    }
});


route.get("/getAllSubjects",async(req,res)=>{
    try{
        const subjects = await Subjects.find();
        res.status(200).json({subjects:subjects,success:true});

    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
});


route.post("/addSubject",async(req,res)=>{
    try{    
        const subject = await Subjects.create({
            subjectName : req.body.subjectName,
            courseName : req.body.courseName,
            semesterNumber : req.body.semesterNumber,
        });
        res.status(200).json({subject:subject,success:true});
    }catch(error){
        res.status(500).json({success:false,message:error.message});

    }
})

route.put("/updateSubject",async(req,res)=>{
    try{    
        await Subjects.updateOne({_id:req.body._id},
            {
                subjectName : req.body.subjectName,
                courseName : req.body.courseName,
                semesterNumber : req.body.semesterNumber,
            });
        res.status(200).json({success:true});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
})

route.delete("/deleteSubject",async(req,res)=>{
    try{
        const subjectId = req.query.subjectId;
        await Subjects.deleteOne({_id:subjectId});
        res.status(200).json({success:true});
    }catch(error){

    }
})

module.exports = route;