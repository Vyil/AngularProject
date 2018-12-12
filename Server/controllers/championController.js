const User = require('../models/user');
const Champion = require('../models/champion');
const errorModel = require('../models/errorModel');
const auth = require('../authentication/authentication');

module.exports = {

    createChampion(req, res) {
        console.log('createChampions called');

        let token = req.get('Authorization')
        if (!token) {
            res.status(401).json(new errorModel(401, 'Not authorized, no valid token')).end();
            return;
        }
        let cleanToken = token.substr(7)
        let cleanedid = auth.decodeToken(cleanToken).sub;

        const newChampion = new Champion(req.body, {});

        User.findOne({
                _id: cleanedid
            })
            .then(rslt => {
                newChampion.owner = rslt;
                rslt.champions.push(newChampion);
                Promise.all([
                    rslt.save(),
                    newChampion.save()
                ])
            })
            .then(
                res.status(200).json({
                    message: "Created champion "
                })
            )
            .catch(err => {
                res.status(500).send(new errorModel(500, 'Something went wrong')).end();
            })
    },

    getChampion(req, res) {
        console.log('getChampion called');
        var queryParam = req.query.getByToken;
        let idUrl = req.params.id;


        if (!idUrl) {
            if (!queryParam) {
                Champion.find({})
                    .then(result => {
                        result.sort((a, b) => {
                            return b.level - a.level
                        })
                        res.status(200).json(result).end();
                    })
                    .catch(err => {
                        res.status(500).send(new errorModel(500, 'Error occured: ' + err)).end();
                    })
            } else {
                if (!queryParam == 'yes') {
                    res.status(404).send(new errorModel(404, 'Unknown query command, has to be yes')).end();
                    return;
                }
                let token = req.get('Authorization')
                if (!token) {
                    res.status(401).json(new errorModel(401, 'Not authorized, no valid token')).end();
                    return;
                }
                let cleanToken = token.substr(7)
                let cleanedid = auth.decodeToken(cleanToken).sub;
                User.findOne({_id: cleanedid})
                    .then(rslt => {
                        Champion.find({owner: rslt._id})
                            .then(result => {
                                res.status(200).json(result).end();
                                return;
                            })
                            .catch(err => {
                                res.status(500).send(new errorModel(500, 'Error occured: ' + err)).end();
                                return;
                            })
                    })
                    .catch(error => {
                        res.status(500).send(new errorModel(500, 'Error occured: ' + error)).end();
                        return;
                    })

            }
        } else {
            Champion.findOne({
                    _id: idUrl
                })
                .then(result => {
                    res.status(200).json(result).end();
                })
                .catch(err => {
                    res.status(500).send(new errorModel(500, 'Error occured: ' + err)).end();
                })
        }
    },

    getPlayerChampions(req, res) {
        let idUrl = req.params.id;
        let token = req.get('Authorization')
        if (!token) {
            res.status(401).json(new errorModel(401, 'Not authorized, no valid token')).end();
            return;
        }
        let cleanToken = token.substr(7)
        let cleanedName = auth.decodeToken(cleanToken).sub;

        Champion.find({
                owner: idUrl
            })
            .then(result => {
                if (result) {
                    res.status(200).json(result).end();
                } else {
                    res.status(404).send(new errorModel(404, 'No champions found for user')).end();
                }

            })
            .catch(err => {
                res.status(500).send(new errorModel(500, 'Error occured: ' + err)).end();
            })
    },

    tradeChampion(req, res) {
        //TODO
    },

    upgradeChampion(req,res){
        console.log('Upgrade champion called')
        let idUrl = req.params.id;
        let token = req.get('Authorization')
        var bodyParam = req.body.upgrade;
        if (!token) {
            res.status(401).json(new errorModel(401, 'Not authorized, no valid token')).end();
            return;
        }
        let cleanToken = token.substr(7)
        let cleanedid = auth.decodeToken(cleanToken).sub;


        if(bodyParam=='level'){
            User.findOne({_id:cleanedid})
            .then(rslt=>{
                if(rslt.gold>=200){
                    Champion.findOneAndUpdate({_id:idUrl},{$inc:{level:1}})
                    .then(result=>{
                        rslt.gold -=200;
                        rslt.save();
                        res.status(200).json({message:'Champion upgraded'}).end();
                        return;
                    })
                    .catch(err=>{
                        res.status(500).send(new errorModel(500,'Error occured: '+err)).end();
                        return;
                    })
                } else {
                    res.status(200).send(new errorModel(200,'You do not have enough gold!')).end();
                    return;
                }
            })
           
        } else if(bodyParam=='quality'){
            Champion.findOne({_id:idUrl})
            .then(result=>{
                if(result.quality == 'Bronze'){
                    result.quality = 'Silver'
                    result.save()
                    .then(
                        User.findOne({_id:cleanedid})
                        .then(rslt=>{
                            rslt.gold -=500;
                            rslt.save();
                            res.status(200).json({message:'Champion upgraded'}).end() 
                        })                                               
                    )
                    .catch(err=>{
                        res.status(500).send(new errorModel(500,'Error occured: '+err)).end();
                        return
                    })
                } else if(result.quality =='Silver'){
                    result.quality = 'Gold'
                    result.save()
                    .then(
                        User.findOne({_id:cleanedid})
                        .then(rslt=>{
                            rslt.gold -=500;
                            rslt.save();
                            res.status(200).json({message:'Champion upgraded'}).end() 
                        })                       
                    )
                    .catch(err=>{
                        res.status(500).send(new errorModel(500,'Error occured: '+err)).end();
                        return
                    })
                } else if(result.quality =='Gold'){
                    result.quality = 'Diamond'
                    result.save()
                    .then(
                        User.findOne({_id:cleanedid})
                        .then(rslt=>{
                            rslt.gold -=500;
                            rslt.save();
                            res.status(200).json({message:'Champion upgraded'}).end() 
                        })                          
                    )
                    .catch(err=>{
                        res.status(500).send(new errorModel(500,'Error occured: '+err)).end();
                        return
                    })
                } else {
                    res.status(200).send(new errorModel(200,'Calm down, champion has highest quality already!')).end();
                    return;
                }
            })
        }
    },

    deleteChampion(req,res){
        console.log('Delete champion called')
        let idUrl = req.params.id;
        let token = req.get('Authorization')
        if (!token) {
            res.status(401).json(new errorModel(401, 'Not authorized, no valid token')).end();
            return;
        }
        let cleanToken = token.substr(7)
        let cleanedid = auth.decodeToken(cleanToken).sub;

        Champion.findOne({_id:idUrl})
        .then( result =>{
            if(result.owner == cleanedid){
                result.remove()
                .then(res.status(200).json({mesage:'Champion removed'}).end())
            } else {
                res.status(401).send(new errorModel(401,'Not authorised to delete this champion').end())
            }
        })
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Error occured: '+err)).end();
        })
    }
}