const mongoose=require('mongoose');
const Schema=mongoose.Schema

const NoteSchema=new Schema({
    noteuser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'NoteUser'
    },
   
    websiteName:{
        type:String,
        required:true
    },
    websiteUrl:{
        type:String,
        required:true 
    },

    websitePass:{
        type:String,
        required:true,
    },


  



});


const Note = mongoose.model('Note',NoteSchema)
module.exports=Note;