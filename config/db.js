const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://' + DB_USER_PASS + '@cluster0.drert.mongodb.net/test', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (!err) console.log('Mongodb connected');
        else console.log(`Connection error: ${err}`);
    }
    )