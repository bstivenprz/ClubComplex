const mongoose = require('mongoose')

let Schema = mongoose.Schema

let projectsListSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId
    },
    projectName: {
        type: String
    },
    projectAddress: {
        type: String
    }
})

module.exports = mongoose.model('ListProject', projectsListSchema)