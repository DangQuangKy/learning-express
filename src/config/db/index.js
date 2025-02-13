const mongoose = require('mongoose');
require('dotenv').config();
async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB!!!');
    } catch (error) {
        console.log('Error connecting to MongoDB');
        
    }
}

module.exports = { connect }
