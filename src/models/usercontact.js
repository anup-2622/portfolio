const mongoose = require("mongoose");

const userContact = new mongoose.Schema({
    Name : {
        type:String,
        required:true
    },
    Number : {
        type:String,
        required:true
    },
    Email : {
        type:String,
        required:true
    },
    Subject : {
        type:String,
        required:true
    },
    Message : {
        type:String,
        required:true
    }
})

// now we need to create a collections

const Contact = new mongoose.model("Contact", userContact);

module.exports = Contact;