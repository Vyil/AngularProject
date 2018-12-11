const mongoose = require('../database/mongodb');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:[true,'Firstname is required']
    },
    lastName:{
        type:String,
        required:[true,'Lastname is required']
    },
    userName:{
        type:String,
        required:[true,'Username is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    gold:{
        type:Number,
        default:0
    },
    champions:[{
        type:Schema.Types.ObjectId,
        ref:'champion'
    }],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:'message'
    }]
});

UserSchema.pre('remove',function(next){
    console.log('User pre middleware called')
    const Champion = mongoose.model('champion');
    Champion.deleteMany({owner:this._id})
    .then(()=>next());
});

// hash the password
// UserSchema.pre('save', function(next){
//     var user = this;
//     if (!user.isModified('password')) return next();
 
//     bcrypt.genSalt(10, function(err, salt){
//         if(err) return next(err);
 
//         bcrypt.hash(user.password, salt, function(err, hash){
//             if(err) return next(err);
 
//             user.password = hash;
//             next();
//         });
//     });
// });
  
  // checking if password is valid
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

UserSchema.methods.checkPassword = function(password,cb){
    bcrypt.compare(password,this.password, function(err,res){
        console.log('compared')
        if(err){
            console.log(err+'erreur')
            return cb(err,null);
        } else {
            console.log('truee '+res)
            return cb(res);
        }
    });
};

const User = mongoose.model('user',UserSchema);
module.exports = User;