const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://djim_user:wachtwoord@gameproject-ynno3.mongodb.net/test?retryWrites=true');
//mongoose.connect('mongodb://localhost/game_project');
mongoose.connection
    .once('open',()=>{
        console.log('open')})
    .on('error',(error)=>{
        console.warn('Warning: ',error);
    });

module.exports = mongoose;
