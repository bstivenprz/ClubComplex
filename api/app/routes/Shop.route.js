const ShopController = require('../controllers/Shop.controller')
module.exports = (app) => {
    app.post('/shop/checkout', ShopController.shopItem)
}