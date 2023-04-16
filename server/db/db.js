const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.2lfeuq2.mongodb.net/instagram?retryWrites=true&w=majority`);

module.exports=mongoose