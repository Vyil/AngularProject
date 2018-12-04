const mongoose = require('../database/mongodb');
const Schema = mongoose.Schema;

const ChampionSchema = new Schema({
    name:{
        type:String,
        required:[true,'Champion Name is required']
    },
    level:{
        type:Number
    },
    quality:{
        type:String
    }
});

const Champion = mongoose.model('champion', ChampionSchema);
module.exports= Champion;