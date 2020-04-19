const Users = require('../controllers/Users.controller')
module.exports = (app) => {
  app.route('/users')
  .post(Users.createUser)
  .get(Users.getAllUsers);

  app.route('/users/:userId')
    .get(Users.getOneUser)
    .put(Users.updateUser)
    .delete(Users.deleteUser);

  app.param('userId', Users.getByIdUser);
}