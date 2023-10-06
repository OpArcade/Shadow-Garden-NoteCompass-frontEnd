const mongoose = require("mongoose");


const CoursesSchema = new mongoose.Schema({
    courseName : {type:String,required:true},
    numberOfSemesters : {type:Number,required:true},
},
    {timestamps:true},
);

module.exports = mongoose.model("Courses",CoursesSchema);
