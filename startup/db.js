const mongoose = require('mongoose');

module.exports = async function () {
    try {
        await mongoose.connect('mongodb+srv://milz11:' + process.env.mongoDbPass + '@clustermil-drz4u.mongodb.net/test?retryWrites=true&w=majority',
            { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
        console.log('Connected to MongoDB..')
    }
    catch (error) {
        throw new Error(error);
    }
}