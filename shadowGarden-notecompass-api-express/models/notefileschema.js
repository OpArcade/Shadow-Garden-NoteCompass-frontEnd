const mongoose = require("mongoose");

const NoteFileSchema = new mongoose.Schema({
    fileName : {type:String,required:true},
    uploadedBy : {type:String,required:true},
    fileDownloadUrl : {type:String,required:true},
    courseName : {type:String,required:true},
    subjectName : {type:String,required:true},
    semesterNumber : {type:String,required:true},
    uploadedBy : {type:String,required:true}
},
    {timestamps:true},
);

module.exports = mongoose.model("NoteFile",NoteFileSchema);
