const mongoose = require('../database/mongodb');
const Schema = mongoose.Schema;

const ChampionSchema = new Schema({
    name:{
        type:String,
        required:[true,'Champion Name is required']
    },
    level:{
        type:Number,
        default:1
    },
    quality:{
        type:String,
        default:'Bronze'
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
});

const Champion = mongoose.model('champion', ChampionSchema);
module.exports= Champion;