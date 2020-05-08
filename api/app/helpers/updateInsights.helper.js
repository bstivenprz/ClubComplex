const ConfigurationModel = require('../../database/models/Configurations.model')
module.exports = async function (nameInsight, valueInsight) {
    try {
        const configResponse = ConfigurationModel.findOne({ name: 'homeInsights' }, (err, doc) => {
            if (err) throw err
            const insights = JSON.parse(doc.value).map(insight => {
                if (insight.name === nameInsight) {
                    insight.number = valueInsight
                }

                return insight
            })
            const newValue = JSON.stringify(insights)
            const response = ConfigurationModel.updateOne({ _id: doc._id }, { name: doc.name, value: newValue }, (err, raw) => {
                if (err) {
                    console.log(err)
                    return false
                }
                console.log('Insights Updated!')
                return true
            })
            return response
        })

        return configResponse
    } catch (error) {
        throw error
    }
}