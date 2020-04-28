const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let allowedRoles = {
  values: ["ADMIN", "USER"],
  message: '{VALUE} no es un role válido'
}

let userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es necesario']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  city: {
    type: String,
    required: [true, 'La ciudad es necesaria']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  role: {
    type: String,
    default: 'USER',
    required: [true],
    enum: allowedRoles
  }
})

userSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()
  delete userObject.password

  return userObject
}

userSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('User', userSchema)