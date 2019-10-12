const mongoose = require('mongoose');
const config = require('config');

const connectDB = async() => {
    try {
        await mongoose.connect(
            config.get('mongoURI'),
            {
                useCreateIndex:true,
                useFindAndModify: true,
                useNewUrlParser: true               
            }
        );
        console.log(`MongoDB is connected`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;