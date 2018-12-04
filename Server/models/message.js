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
    }
});

const Message = mongoose.model('message',MessageSchema);
module.exports = Message;