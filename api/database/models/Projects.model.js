const mongoose = require('mongoose')

let projectSchema = new mongoose.Schema({
    title: {
        type: String
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    picturesUrl: {
        type: Array
    },
    technicsSpecifications: {
        purpose: {
            type: String
        },
        builtArea: {
            type: Number
        },
        profitableArea: {
            type: Number
        },
        salableArea: {
            type: Number
        },
        estimatedInvestment: {
            type: Number
        },
        estimatedProfit: {
            type: Number
        },
        costEffectiveness: {
            type: Number
        },
        tir: {
            type: Number
        },
        marketRatio: {
            type: Number
        },
        complexRatio: {
            type: Number
        },
        complexIndex: {
            type: Number
        },
        titles: {
            type: Number
        },
        availablesTitles: {
            type: Number
        },
        titleValue: {
            type: Number
        },
        titleIncome: {
            type: Number
        }
    }
})

module.exports = mongoose.model('Project', projectSchema)