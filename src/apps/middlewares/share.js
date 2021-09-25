const CategoryModel = require("../models/category");
const UserModel = require("../models/user");
module.exports = async(req, res, next) => {

    res.locals.categories = await CategoryModel.find();
    res.locals.totalCartItems = req.session.cart.reduce((total, product) => total + product.qty, 0);
    res.locals.nameUser = req.session.nameUser;
    next();
}