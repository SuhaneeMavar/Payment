const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.on('connected', () => {
    console.log('Connected to the database..');
})

mongoose.connection.on('error', (error) => {
    console.log('Error on connection to the database..' + error);
})