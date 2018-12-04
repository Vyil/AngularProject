const mongoose = require('../database/mongodb');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:[true,'Firstname is required']
    },
    lastName:{
        type:String,
        required:[true,'Lastname is required']
    },
    userName:{
        type:String,
        required:[true,'Username is required']
    },
    gold:{
        type:Number
    },
    champions:[{
        type:Schema.Types.ObjectId,
        ref:'champion'
    }],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:'message'
    }]
});

const User = mongoose.model('user',UserSchema);
module.exports = User;