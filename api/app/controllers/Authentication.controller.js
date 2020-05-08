const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../database/models/User.model')
const generateReferralCode = require('../helpers/generateReferralCode.helper')
const sendEmailNotification = require('../helpers/sendEmailNotification.helper')
const updateInsights =  require('../helpers/updateInsights.helper')
const defaultProfilePic = '../../../web/src/resources/images/defaultProfilePicture.jpg'

require('dotenv').config({ path: path.join(__dirname, '../../config/.env') })

const seedJwtAuthentication = process.env.SEED_AUTENTICATION

exports.logIn = async (req, res) => {
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
                authenticationSuccess: false,
                error: {
                    message: "No existe un usuario registrado con este correo electrónico."
                }
            })
        }

        if (!bcrypt.compareSync(body.password, dbUser.password)) {
            return res.status(400).json({
                authenticationSuccess: false,
                error: {
                    message: "La contraseña es incorrecta."
                }
            })
        }

        let tokenExpiration = parseInt(process.env.EXPIRATION_TOKEN, 10)
        let token = jwt.sign({ user: dbUser }, seedJwtAuthentication, { expiresIn: tokenExpiration })
        res.json({
            authenticationSuccess: true,
            tokenAuthorization: token,
            user: dbUser
        })
    })
}

exports.signUp = async (req, res) => {
    try {
        let body = req.body
        let { signupFirstName, signupLastName, signupEmail, signupPhone, signupCity, signupPassword, signupReferralCode, role } = body

        const newUser = {
            firstName: signupFirstName,
            lastName: signupLastName,
            email: signupEmail,
            phone: signupPhone,
            city: signupCity,
            password: bcrypt.hashSync(signupPassword, 10),
            role,
            profilePic: defaultProfilePic,
            referralCode: generateReferralCode(6)
        }

        if (signupReferralCode && signupReferralCode.length) {
            const referralUser = await User.findOne({ referralCode: signupReferralCode }).exec()
            console.log(referralUser)
            if (referralUser) {
                newUser.referralByUser = referralUser._id
            } else {
                res.status(400).json({
                    success: false,
                    type: 'error',
                    message: 'El código de invitación no existe.'
                })
            }
        }

        let user = new User(newUser)

        user.save(async (error, dbUser) => {
            if (error) {
                let response = { succes: false }
                if (error.errors.email && error.errors.email.kind === "unique") {
                    response.type = "info"
                    response.message = "El correo electrónico ingresado ya está asociado a una cuenta."
                } else {
                    response.type = "error"
                    response.message = error
                }
                return res.status(400).json(response)
            }
    
            let textBody = `
            ¡Bienvenido! Creaste una cuenta en Club Complex y ya puedes ingresar a tu cuenta y comenzar a
            invertir en proyectos inmuebles desde internet.
            Ingresa a tu cuenta aquí http://${process.env.HOST}/login
            `
    
            let htmlBody = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=680px, initial-scale=1.0">
                <title>Notificación de registro</title>
            </head>
            <body>
                <p><strong>¡Bienvenido ${dbUser.firstName}!</strong></p>
                <p>Creaste una cuenta en Club Complex, ingresa y disfruta los beneficios de poder invertir en inmuebles desde la comodidad de tu hogar.</p>
                <a href="http://${process.env.HOST}/login"><strong>Ingresa a tu cuenta aquí http://${process.env.HOST}/login</strong></a>   
            </body>
            </html>
            `
    
            await sendEmailNotification(dbUser.email, "Registro Club Complex", textBody, htmlBody);

            const usersInApp = await User.countDocuments({}).exec();

            await updateInsights('users', usersInApp);
    
            res.json({
                success: true,
                userData: dbUser
            });
        })   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.verifySession = (req, res) => {
    try {
        const { body: { jwtClientSession } } = req;
        if (!jwtClientSession) {
            res.status(400).json({
                success: false,
                error: 'Ningún jwtClientSession enviado.'
            })
        }

        jwt.verify(jwtClientSession, seedJwtAuthentication, function(err, decoded) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(200).json({
                        authenticationSuccess: false,
                        error: 'Su sesión ha expirado, inicie sesión nuevamente.'
                    })
                }
            }
            
            return res.status(200).json({ authenticationSuccess: true, ...decoded })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}