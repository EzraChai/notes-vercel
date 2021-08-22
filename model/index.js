const mongoose = require('mongoose');
const {dbURL} = require('../config/default.config')

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log("Mongo Database connect failure. ", err)
});

db.once('open', function () {
    // we're connected!
    console.log("Connected to MongoDB.")
});

module.exports = {
    User: mongoose.model('User',require('./user')),
    Todo: mongoose.model('Todo',require('./todo'))
}
