const User = require('../models/user');
const Message = require('../models/message');
const errorModel = require('../models/errorModel');
const auth = require('../authentication/authentication');

module.exports = {

    postMessage(req,res){
        console.log('PostMessage called');
        
        let token = req.get('Authorization')
        let cleanToken = token.substr(7)
        let cleanedid = auth.decodeToken(cleanToken).sub;
        
        const newMessage = new Message(req.body,{});
        newMessage.author = cleanedid;
        newMessage.save()
        .then(
            User.findOne({_id:req.body.recipient})
            .then(result =>{
                result.messages.push(newMessage)
                return result.save();
            })
        )
        .then(res.status(200).send(new errorModel(200,"created message: "+req.body.content)))
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Something went wrong: '+err))
        })
    },

    deleteMessage(req,res){
        console.log('DeleteMessage called');

        let token = req.get('Authorization')
        if(!token){
            res.status(401).json(new errorModel(401, 'Not authorized, no valid token')).end();
        }
        let cleanToken = token.substr(7)
        let cleanedid = auth.decodeToken(cleanToken).sub;

        Message.findOne({_id:req.params.id})
        .then(result=>{
            if(result){
                User.findOne({_id:cleanedid})                
                .then(rcpnt=>{
                    if(result.recipient.toString() == rcpnt._id.toString()){
                        result.remove()
                        res.status(200).send(new errorModel(200, 'Removed message: '+result))
                        return;
                    } else if(result.author == cleanedid){
                        result.remove()
                        res.status(200).send(new errorModel(200, 'Removed message: '+result))
                        return;
                    } else{
                        res.status(401).send(new errorModel(401, 'Not authorized, no valid token'))
                        return;
                    }
                })
                .catch(err=>{
                    res.status(500).json(err)
                    return;
                })
            } else {
                res.status(404).send(new errorModel(404,'No message found with given ID')).end();
            }
                   
        })
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Error occured(User not authorized to remove this message): '+err))
        })
    },

    getMessage(req,res){
        console.log('getMessage called')
        var queryParam = req.query.id;

        let token = req.get('Authorization')
        if(!token){
            res.status(401).json(new errorModel(401, 'Not authorized, no valid token')).end();
        }
        let cleanToken = token.substr(7)
        let cleanedid = auth.decodeToken(cleanToken).sub;

        if(!queryParam){
            console.log('no query param')
            User.findOne({_id:cleanedid})
            .then(rslt=>{
                Message.find({recipient:rslt._id})
                .then(result=>{
                    if(result){
                        res.status(200).json(result).end()
                    } else {
                        res.status(404).send(new errorModel(404,'Id not found')).end()
                    }
                })
            })        
            .catch(err=>{
                res.status(500).send(new errorModel(500,'Error occured: '+err)).end()
            })
        } else {
            console.log('query param')
            Message.find({recipient:queryParam})
            .then(result=>{
                res.status(200).json(result)
                return;
            })
            .catch(err=>{
                res.status(500).send(new errorModel(500,'Error occured (no results for given ID?): '+err))
                return;
            })
        }        
    }
}