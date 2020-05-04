const ProjectController = require('../controllers/Project.controller');
module.exports = (app) => {
    app.get('/listProjects', ProjectController.listProjects)
    app.get('/projects/:projectId?', ProjectController.getProject)
    app.post('/projects', ProjectController.createProject)
    app.put('/projects/:projectId', ProjectController.updateProject)
    app.delete('/projects/:projectId', ProjectController.deleteProject)
}