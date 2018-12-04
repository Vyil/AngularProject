const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/game_project');
mongoose.connection
    .once('open',()=>{
        console.log('open')})
    .on('error',(error)=>{
        console.warn('Warning: ',error);
    });

module.exports = mongoose;
