const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    salesPrice: {
        type: Number,
        required: true
    },
    productOffer: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    productImage: {
        type: [String],
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "out of stock", "discontinued"],
        default: "available",
        required: true
    }


},{
    timestamps:true
})
const Product = mongoose.model('product', productSchema)
module.exports = Product