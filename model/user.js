const mongoose = require('mongoose');
const baseModel = require('./base-model')
const MD5 = require('../util/md5');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: value => MD5(value),
        select: false
    },
    image: {
        type: String,
        default: null,
    },
    ... baseModel
});

module.exports = userSchema;
