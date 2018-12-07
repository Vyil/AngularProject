const User = require('../models/user');
const Champion = require('../models/champion');
const errorModel = require('../models/errorModel');
const auth = require('../authentication/authentication');

module.exports = {

    createChampion(req,res){
        console.log('createChampions called');

        let token = req.get('Authorization')
        let cleanToken = token.substr(7)
        let cleanedName = auth.decodeToken(cleanToken).sub;

        const newChampion = new Champion(req.body,{});

        User.findOne({userName:cleanedName})
        .then(rslt=>{
            newChampion.owner = rslt;
            rslt.champions.push(newChampion);
            Promise.all([
                rslt.save(),
                newChampion.save()
            ])            
        })        
        .then(
            res.status(200).json({message:"Created champion "})
        )
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
                result.sort((a,b)=>{return b.level-a.level})
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