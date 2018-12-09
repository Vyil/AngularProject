const User = require('../models/user');
const errorModel = require('../models/errorModel');
const auth = require('../authentication/authentication');

module.exports ={

    createNewUser(req,res){
        console.log('CreateNewUser called: '+req.body);
        User.findOne({userName:req.body.userName})
        .then(result=>{
            if(result){
                res.status(409).send(new errorModel(409,'Username already exists'))
            } else {
                const newUser = new User(req.body,{});
                newUser.save()
                .then(result=>{
                    res.status(200).json({message:"Created user: "+result});
                    return;
                })
                .catch(err=>{
                    res.status(400).send(new errorModel(400,'Error occured: '+err));
                    return;
                });
            }
        })
        .catch(err=>{
            res.status(409).send(new errorModel(409,'Username already exists: '+err))
        })        
    },

    getUser(req,res){
        console.log('getUser called');
        var queryParam = req.query.getSelf;
        let token = req.get('Authorization')
                
        //Find all
        if(!queryParam){
            User.find({})
            .then(result=>{
                if(result){
                    res.status(200).json(result);
                    return;
                } else {
                    res.status(404).send(new errorModel(400,'Something went wrong, no results found'));
                    return;
                }                
            })
            .catch(error=>{
                res.status(400).errorModel(400,'Error occoured: '+error);
                return;
            })
            //Find by query
        } else if(queryParam == 'yes'){
            if(!token){
                res.status(401).json(new errorModel(401, 'Not authorized, no valid token'));
                return;
            }
            let cleanToken = token.substr(7)
            let cleanedName = auth.decodeToken(cleanToken).sub;
            User.findOne({userName:cleanedName})
            .then(result=>{
                res.status(200).json(result);
                return;
            })
            .catch(err=>{
                res.status(500).send(new errorModel(500,'Error occured: '+err))
                return;
            })
        }else{
            res.status(404).send(new errorModel(404,'Unknown request'));
            return;
        }
    },

    getById(req,res){
        let idUrl = req.params.id;

        User.findOne({_id:idUrl})
        .then(result=>{
            if(!result){
                res.status(404).send(new errorModel(404,'User with given ID not found'));
                return;
            } else{
                res.status(200).json(result);
                return;
            }
        })
        .catch(err=>{
            res.status(400).send(new errorModel(400,'Error occured: '+err));
            return;
        })
    },

    editUser(req,res){
        console.log('editUser called');
        let token = req.get('Authorization')

        let idUrl = req.params.id;
        let firstname=req.body.firstName;
        let lastname=req.body.lastName;
        let username=req.body.userName;

        if(req.body.gold){
            res.status(403).send(new errorModel(403,'You are not allowed to edit gold'));
        }

        User.findOneAndUpdate({_id:idUrl},{firstName:firstname,lastName:lastname,userName:username})
        .then(result=>{
            res.status(200).send(new errorModel(200,'User updated'));
        })
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Something went wrong trying to update the user: '+err));
        })
    },

    deleteUser(req,res){
        console.log('deleteUser called');
        let idUrl = req.params.id;

        User.findOneAndRemove({_id:idUrl})
        .then(result=>{
            res.status(200).send(new errorModel(200,'User with ID: '+idUrl+' removed'));
        })
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Something went wrong trying to remove the user'));
        })
    }
}