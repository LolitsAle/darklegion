const mongoose = require('mongoose')
const validator = require('validator')

const transaction = new mongoose.Schema({
    seri: {
        type: String,
        required: true
    },
    cardid: {
        type: String,
        required: true
    }

},{})