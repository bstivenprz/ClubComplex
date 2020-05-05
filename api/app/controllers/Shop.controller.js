const User = require('../../database/models/User.model')
exports.shopItem = (req, res) => {
    try {
        const { userId, total } = req.body
        User.findOneAndUpdate({ _id: userId }, {
            $push: {
                transactions: [
                    {
                        trasactionName: 'Compra de título',
                        transactionValue: total,
                        transactionDate: new Date()
                    }
                ]
            }
        }, (err, doc) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }

            return res.status(200).json({
                success: true,
                user: doc
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}