const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    isListed: {
        type: String,
        required: true
    },
    categoryOffer: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const category = mongoose.model('category', categorySchema)

module.exports = category