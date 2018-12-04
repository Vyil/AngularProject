const User = require('../models/user');
const errorModel = require('../models/errorModel');

module.exports ={

    createNewUser(req,res){
        console.log('CreateNewUser called');
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
    },

    getUser(req,res){
        console.log('getUser called');
        let idUrl = req.params.id;

        if(!idUrl){
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
        } else {
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
        }        
    },

    editUser(req,res){
        console.log('editUser called');
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