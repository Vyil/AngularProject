const mongoose = require('../database/mongodb');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author:{
        type:String,
        required:[true,'Author is required']
    },
    recipient:{
        type:String,
        required:[true,'Recipient is required']
    },
    content:{
        type:String,
        required:[true,'Message content is required']
    }
});

const Message = mongoose.model('message',MessageSchema);
module.exports = Message;