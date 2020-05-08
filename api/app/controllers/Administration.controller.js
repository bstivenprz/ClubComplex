const ConfigurationModel = require('../../database/models/Configurations.model')
const updateInsights = require('../helpers/updateInsights.helper')
exports.getInsights = (req, res) => {
    try {
        ConfigurationModel.findOne({ name: 'homeInsights' }, (err, doc) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Error obteniendo Insights de base de datos.',
                    error: err
                })
            }

            res.status(200).json({
                success: true,
                insights: JSON.parse(doc.value)
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Hubo un error al tratar de obtener los Insights de la base de datos.',
            error: error.message
        })
    }
}

exports.updateInsights = async (req, res) => {
    try {
        let { name, value } = req.query
        value = parseInt(value);
        const response = await updateInsights(name, value)
        if (!response) {
            res.status(400).send({
                success: false,
                insight: name,
                updated: false
            })
        }

        res.status(200).send({
            success: true,
            insight: name,
            updated: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Hubo un error al tratar de actualizar los Insights de la base de datos.',
            error: error.message
        })
    }
}