const UserController = require('../controllers/User.controller')
module.exports = (app) => {
    app.put('/users/edit/:id', UserController.editUserProfile)
}