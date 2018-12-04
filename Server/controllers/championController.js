const User = require('../models/user');
const Champion = require('../models/champion');
const errorModel = require('../models/errorModel');

module.exports = {

    createChampion(req,res){
        console.log('createChampions called');
        const newChampion = new Champion(req.body,{});
        newChampion.save()
        .then(result=>{
            res.status(200).json({message:"Created champion: "+result});
        })
        .catch(err=>{
            res.status(400).send(new errorModel(400,'Something went wrong'));
        })
    }
}