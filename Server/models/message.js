const mongoose = require('../database/mongodb');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type:String,
        required:[true,'Message content is required']
    },
    recipient:{
        //optional?
        type:Schema.Types.ObjectId,
        ref:'user'
    }
});

const Message = mongoose.model('message',MessageSchema);
module.exports = Message;