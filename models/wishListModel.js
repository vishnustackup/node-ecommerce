const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        }
    }],

})

const Wishlist = mongoose.model('wishlist', wishListSchema)

module.exports = Wishlist