const mongoose = require("mongoose");

const SubjectsSchema = new mongoose.Schema({
    subjectName: {type:String,required:true},
    courseName : {type:String,required:true},
    semesterNumber : {type:Number,required:true},// This is the particular semester number of that subject.
});


module.exports = mongoose.model("Subjects",SubjectsSchema); 
