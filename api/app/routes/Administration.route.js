const AdministrationController = require('../controllers/Administration.controller')
module.exports = (app) => {
    app.get('/administration/insights', AdministrationController.getInsights)
    app.put('/administration/insights', AdministrationController.updateInsights)
}