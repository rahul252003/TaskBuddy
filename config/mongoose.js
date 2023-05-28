const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/');
const db = mongoose.connection;
// error
db.on('error',console.error.bind(console,'erroe connecting to db'));
// up and running then message
db.once('open',function(){
    console.log('Success fully connected to the database')
});