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

MessageSchema.post('remove',function(){
    console.log('Remove middleware called')
    const User = mongoose.model('user');
    User.findOne({_id:this.recipient})
    .then(result=>{
        result.messages.remove(this._id)
        result.save();
    })
});

const Message = mongoose.model('message',MessageSchema);
module.exports = Message;