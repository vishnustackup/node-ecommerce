const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({

    brandName: {
        type: String,
        required: true
    },
    brandImage: {
        type: [String],
        required: true
    },
    isblocked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Brand = mongoose.model('brand', brandSchema)

module.exports = Brand