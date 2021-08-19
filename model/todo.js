const mongoose = require('mongoose');
const baseModel = require('./base-model')
const Schema = mongoose.Schema


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ... baseModel
});

module.exports = todoSchema;
