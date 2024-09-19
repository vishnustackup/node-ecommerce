const mongoose = require('mongoose')
const BannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    startdate: {
        type: Date,
        required: true
    },

    enddate: {
        type: Date,
        required: true
    }
})

const Banner = mongoose.model('Banner', BannerSchema)

module.exports = Banner