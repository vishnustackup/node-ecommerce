const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: [{
        addresstype: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        phoneno: {
            type: String,
            required: true
        }

    }]




})

const Address = mongoose.model('address', addressSchema)

module.exports = Address