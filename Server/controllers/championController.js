const User = require('../models/user');
const Champion = require('../models/champion');
const errorModel = require('../models/errorModel');

module.exports = {

    createChampion(req,res){
        console.log('createChampions called');
        //TODO Assign to player
        const newChampion = new Champion(req.body,{});
        newChampion.save()
        .then(result=>{
            res.status(200).json({message:"Created champion: "+result});
        })
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Something went wrong'));
        })
    },

    getChampion(req,res){
        console.log('getChampion called');
        let idUrl = req.params.id;

        if(!idUrl){
            Champion.find({})
            .then(result=>{
                res.status(200).json(result);
            })
            .catch(err=>{
                res.status(500).send(new errorModel(500,'Error occured: '+err));
            })
        } else {
            Champion.findOne({_id:idUrl})
            .then(result=>{
                res.status(200).json(result);
            })
            .catch(err=>{
                res.status(500).send(new errorModel(500,'Error occured: '+err));
            })
        }
    },

    tradeChampion(req,res){
        //TODO
    }
}