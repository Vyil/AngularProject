const User = require('../models/user');
const Message = require('../models/message');
const errorModel = require('../models/errorModel');

module.exports = {

    postMessage(req,res){
        console.log('PostMessage called');
        //TODO get author out of token or some sorts
        const newMessage = new Message(req.body,{});
        newMessage.save()
        .then(
            User.findOne({_id:req.body.recipient})
            .then(result =>{
                console.log(result+'<<<<<<<<<<<<<')
                result.messages.push(newMessage)
                return result.save();
            })
        )
        .then(res.status(200).send(new errorModel(200,"created message"+req.body.content)))
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Something went wrong: '+err))
        })
    }
}