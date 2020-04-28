const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../database/models/User.model')
module.exports = (req, res) => {
    let body = req.body
    User.findOne({ email: body.email }, (error, dbUser) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                err: error
            })
        }

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        }

        if (!bcrypt.compareSync(body.password, dbUser.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        }

        let token = jwt.sign({
            user: dbUser
        }, process.env.SEED_AUTENTICATION, {
            expiresIn: process.env.EXPIRATION_TOKEN
        })

        res.json({
            ok: true,
            user: dbUser,
            authorizationToken: token
        })
    })
}