const mongoose = require('mongoose')
const { schema } = require('./userModel')

const CouponSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true,
    },
    expiresOn: {
        type: Date,
        required: true,
    },
    offerPrice: {
        type: Number,
        required: true,
    },
    minimumPrice: {
        type: Number,
        required: true,
    },
    isList: {
        type: Boolean,
        default: true,
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]


})

const Coupon = mongoose.model('coupon', CouponSchema)
module.exports = Coupon