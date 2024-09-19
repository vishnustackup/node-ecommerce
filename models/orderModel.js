const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Address = require('./addressModel')
const OrderSchema = new mongoose.Schema({

    userId: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },
    OrderedItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            default: 0
        },




    }],
    totalPrice: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0
    },
    finalamount: {
        type: Number,
        required: true
    },
    Address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    invoiceDate: {
        type: Date,

    },
    status: {
        type: String,
        required: true,
        enum: ["pending","processing","shipped","delivered","cancelled","return request","returned"]
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    couponApplied: {
        type: Boolean,
        default: false,
    },


})

const Cart = mongoose.model('cart', OrderSchema)

module.exports = Cart