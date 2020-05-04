const AuthenticationController = require('../controllers/Authentication.controller')

module.exports = (app) => {
    app.post('/authentication/login', AuthenticationController.logIn)
    app.post('/authentication/signup', AuthenticationController.signUp)
    app.post('/authentication/verifysession', AuthenticationController.verifySession)
}