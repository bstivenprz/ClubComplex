const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  firstName: String,
  lastName: String
})

module.exports = mongoose.model('User', UserSchema)