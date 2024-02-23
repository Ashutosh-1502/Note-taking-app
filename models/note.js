const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    Note : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('Note',noteSchema);