const config = {};  
const conn = `mongodb+srv://sandeepdb:sandeepdb@cluster0.ndwqz0e.mongodb.net/?retryWrites=true&w=majority`;

const mongoose = require("mongoose");


const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(conn, {
            maxPoolSize:100,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;