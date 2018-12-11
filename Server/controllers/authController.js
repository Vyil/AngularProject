const auth = require('../authentication/authentication');
const errorModel = require('../models/errorModel');
const User = require('../models/user');

module.exports = {

    login(req,res){
        console.log('Login called')

        let username = req.body.userName;
        let password = req.body.password

        if (!username || !password) {
            res.status(412).json(new ApiResponse(412, 'Missing login parameters')).end()
            return
        }

        User.findOne({userName:username})
        // .then(result=>{
        //     if(result.comparePassword(password)){
        //         res.status(200).json({message:"Logged in"})
        //     } else {
        //         res.status(401).json({message:'Rejected'})
        //     }
        // })
        .then(result=>{
            if(result.password == password){
                let token = auth.encodeToken(result._id);
                let resultObject = {
                    "token":token,
                    "Message:":"Succesful login for user: "+result.userName
                }
                res.status(200).json(resultObject)
            }else {
                res.status(401).json({message:'Rejected'})
            }
        })
        .catch(err=>{
            res.status(500).send(new errorModel(500,'Error occured: '+err))
        })
    }

}