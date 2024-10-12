const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/medicoreDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to medicoreDB Sucessfully");
}).catch(err => {
    console.error('MongoDB connection error:', err); 
    //console.log("Failed to connect to db");
console.log(err)
});


