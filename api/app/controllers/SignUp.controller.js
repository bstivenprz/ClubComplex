const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../database/models/User.model')
module.exports = (req, res) => {
    let body = req.body
    let { firstName, lastName, email, city, password, role } = body
    let user = new User({
        firstName,
        lastName,
        email,
        city,
        password: bcrypt.hashSync(password, 10),
        role
    })

    user.save((error, dbUser) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }
        res.json({
            ok: true,
            user: dbUser
        })
    })
}