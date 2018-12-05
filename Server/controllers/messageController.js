const User = require('../models/user');
const Message = require('../models/message');
const errorModel = require('../models/errorModel');
const auth = require('../authentication/authentication');

module.exports = {

    postMessage(req,res){
        console.log('PostMessage called');
        
        let token = req.get('Authorization')
        let cleanToken = token.substr(7)
        let cleanedName = auth.decodeToken(cleanToken).sub;
        
        const newMessage = new Message(req.body,{});
        newMessage.author = cleanedName;
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
        let cleanedName = auth.decodeToken(cleanToken).sub;

        Message.findOne({_id:req.params.id})
        .then(result=>{
            if(result){
                User.findOne({userName:cleanedName})
                .then(rcpnt=>{
                    if(result.recipient == rcpnt._id || result.author == cleanedName){
                        result.remove()
                        res.status(200).send(new errorModel(200, 'Removed message: '+result))
                    } else {
                        res.status(401).send(new errorModel(401, 'Not authorized, no valid token'))
                        return;
                    }
                })   
            } else {
                res.status(404).send(new errorModel(404,'No message found with given ID')).end();
            }
                   
        })
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Error occured(User not authorized to remove this message): '+err))
        })
    }
}