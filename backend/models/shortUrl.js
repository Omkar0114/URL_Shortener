const mongoose = require('mongoose')
const {Schema} = mongoose;
const shortid = require("shortid")

const shortUrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortenedUrl: {
        type: String,
        required: true,
        default: shortid.generate
    }
})

module.exports = mongoose.model("ShortUrl", shortUrlSchema)