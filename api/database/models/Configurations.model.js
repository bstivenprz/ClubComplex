const mongoose = require('mongoose')
let Schema = mongoose.Schema
let configurationSchema = new Schema({
    name: {
        type: String
    },
    value: {
        type: String
    }
})

module.exports = mongoose.model('Configuration', configurationSchema)