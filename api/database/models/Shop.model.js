const mongoose = require('mongoose')
let Schema = mongoose.Schema
let shop = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId
    }
})
