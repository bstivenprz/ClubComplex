exports.shopItem = (req, res) => {
    try {
        const itemInfo = req.body
        const { userId, titleName, quantity, total } = itemInfo
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}