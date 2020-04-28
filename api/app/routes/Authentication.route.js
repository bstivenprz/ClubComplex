const LoginController = require('../controllers/Login.controller')
const SignUpController = require('../controllers/SignUp.controller')
module.exports = (app) => {
    app.post('/login', LoginController)
    app.post('/signup', SignUpController)
}