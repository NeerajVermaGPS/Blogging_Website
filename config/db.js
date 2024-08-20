const mongoose = require('mongoose');

const connectToMongo = async (mongoURI) => {
    return mongoose.connect(mongoURI)
}

module.exports = {
    connectToMongo
}