const Projects = require('../../database/models/Projects.model')
const ProjectsList = require('../../database/models/ProjectsList.model')

exports.getProject = async (req, res) => {
    try {
        const { params: { projectId } } = req
        if (!projectId) {
            const allProjects = await Projects.find({})
            res.status(200).send(allProjects)
        }
        const oneProject = await Projects.find({ _id: projectId })
        res.status(200).json(oneProject[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.createProject = (req, res) => {
    try {
        const { body } = req
        const { title, address, description, picturesUrl, technicsSpecifications } = body
        const project = new Projects({
            title,
            address,
            description,
            picturesUrl,
            technicsSpecifications
        })
        project.save(async (error, dbProject) => {
            if (error) {
                console.log(error)
                return res.status(400).json({ success: false })
            }
            const { _id, title, address } = dbProject
            const listProject = new ProjectsList({
                projectId: _id,
                projectName: title,
                projectAddress: address
            })
            listProject.save(async (error, dbList) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json({ success: false })
                }
                return res.status(200).json({
                    sucess: true,
                    listId: dbList._id,
                    projectData: dbProject
                })
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.updateProject = (req, res) => {
    
}

exports.deleteProject = (req, res) => {
    
}

exports.listProjects = async (req, res) => {
    try {
        const getListProjects = await ProjectsList.find({})
        res.status(200).send(getListProjects)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}