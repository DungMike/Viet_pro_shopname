const express = require("express");

// const app = express();
const router = express.Router();

// router.get("/test", (req,res) => {
//     res.send("test")
// });

const SiteController = require("../apps/controllers/site")

// router site 



// require middleware
const AdminMiddleware = require("../apps/middlewares/admin");
const UploadMiddleware = require("../apps/middlewares/upload");
const shareMiddleware = require("../apps/middlewares/share");
const ChatControler = require("../apps/controllers/chat");
const CategoryControler = require("../apps/controllers/category")
    // const TestControler = require("../apps/controllers/test");
const AdminControler = require("../apps/controllers/admin")
    // const AuthControler = require("../apps/controllers/auth");
const ProductControler = require("../apps/controllers/products");
const UserControler = require("../apps/controllers/users");
const { Router } = require("express");
router.get("/admin/login", AdminMiddleware.checkLogin, AdminControler.login);
router.post("/admin/login", AdminMiddleware.checkLogin, AdminControler.postLogin);
router.get("/admin/logout", AdminMiddleware.checkAdmin, AdminControler.logout);
router.get("/admin/dashboard", AdminMiddleware.checkAdmin, AdminControler.dashboard);
// rounter.get("/admin/login", AdminControler.);
/////////////////////////////////////////////////
router.get("/admin/products", AdminMiddleware.checkAdmin, ProductControler.index);
router.get("/admin/products/create", AdminMiddleware.checkAdmin, ProductControler.create);
router.post("/admin/products/create", UploadMiddleware.single("thumbnail"), AdminMiddleware.checkAdmin, ProductControler.postCreate);
router.get("/admin/products/edit/:id", AdminMiddleware.checkAdmin, ProductControler.edit);
router.post("/admin/products/edit/:id", UploadMiddleware.single("thumbnail"), AdminMiddleware.checkAdmin, ProductControler.postEdit);
router.get("/admin/products/delete/:id", AdminMiddleware.checkAdmin, ProductControler.del);
// app.get("/", (req,res)=> {
//     res.send("Vị đắng vị cay mới là ruouVị ngọt vị sầu mới là yêuDẫu biết rượu say ta vẫn uốngDẫu biết tình bạc lòng vẫn yêu");
// });
/////////////////////
router.get("/admin/users", AdminMiddleware.checkAdmin, UserControler.user);
router.get("/admin/users/add", AdminMiddleware.checkAdmin, UserControler.add_user);
router.post("/admin/users/add", AdminMiddleware.checkAdmin, UserControler.postAdd_user);
router.post("/admin/users/edit/:id", AdminMiddleware.checkAdmin, UserControler.postEdit_user);
router.get("/admin/users/edit/:id", AdminMiddleware.checkAdmin, UserControler.edit_user);
router.get("/admin/users/delete/:id", AdminMiddleware.checkAdmin, UserControler.delete_user);

/////////////////////
router.get("/admin/category", AdminMiddleware.checkAdmin, CategoryControler.category);
router.get("/admin/category/edit", AdminMiddleware.checkAdmin, CategoryControler.edit_category);
router.get("/admin/category/delete", AdminMiddleware.checkAdmin, CategoryControler.add_category);

// site
router.get("/forgotPass", SiteController.forgotPass)
router.post("/forgotPass", SiteController.forgotPassSendmail)
router.get("/receiveCode/:id", SiteController.receiveCode)
router.post("/receiveCode/:id", SiteController.postReceiveCode)
router.get("/remakePassWord/:id", SiteController.remakePassWord)
router.post("/remakePassWord/:id", SiteController.postRemakePassWord)



router.get("/login", SiteController.login)
router.post("/login", SiteController.postLogin)

/// register
router.get("/register", SiteController.register)
router.post("/register", SiteController.postRegister)



router.get("/delCart-:id", SiteController.delCart)
router.post("/updateCart", SiteController.updateCart);
router.post("/add-to-cart", SiteController.addToCart);
router.get("/", SiteController.home)
router.get("/chat", AdminMiddleware.checkUser, ChatControler.chat)
router.get("/category-:slug-:id", SiteController.category)
router.get("/product-:slug.:id", SiteController.product)
router.get("/search", SiteController.search)
router.get("/cart", SiteController.cart)
router.get("/success", SiteController.success)
router.post("/order", SiteController.order)
module.exports = router;
// bai tap ve nha: 1 model merxit
//                  2