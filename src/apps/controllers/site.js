const CategoryModle = require("../models/category");
const ProductModel = require("../models/products");
const CommentModel = require("../models/comments");
const transporter = require("../../common/transporter");
const UserModel = require("../models/user");
const config = require("config");
const ejs = require("ejs");
const path = require("path");
// const session = require("express-session");

const home = async(req, res) => {
    const LatesProducts = await ProductModel.find({
        is_stock: true,
    }).limit(6).sort({ _id: -1 });
    // console.log(LatesProducts);
    const FeaturedProducts = await ProductModel.find({
        is_stock: true,
        featured: true,
    }).limit(6).sort({ _id: -1 });
    // console.log(FeaturedProducts);
    res.render("site/index", { LatesProducts: LatesProducts, FeaturedProducts: FeaturedProducts });
};

const category = async(req, res) => {
    const id = req.params.id;
    const category = await CategoryModle.findById(id);
    // console.log(category);
    const title = category.title;
    // console.log(title);
    const products = await ProductModel.find({
        cat_id: id,
    }).sort({ _id: -1 });

    res.render("site/category", { title, products });
};
const product = async(req, res) => {
    const id = req.params.id;
    // console.log(id);
    const product = await ProductModel.findById(id);
    // console.log(product);

    const comments = await CommentModel.find({ prd_id: id });
    // console.log(comments);
    res.render("site/product", { product, comments });
};
const search = async(req, res) => {
    const keyword = req.query.keyword || "";
    // console.log(keyword);
    const filter = {};
    if (keyword) {
        filter.$text = { $search: keyword };
    }


    const products = await ProductModel.find(filter);
    // console.log(products);
    res.render("site/search", { keyword, products });
};
const cart = (req, res) => {
    const products = req.session.cart;
    // console.log(products);
    res.render("site/cart", { products, totalPrice: 0 });
};
const success = (req, res) => {
    res.render("site/success");
};
// const chat = async(req, res) => {
//         const userID = req.session._id;
//         const users = await UserModel.find({
//             _id: { $nin: [userID] }
//         });

//         const rooms = await RoomModel
//             .find({
//                 users: { $all: [userID] }
//             })
//             .populate({ path: "users" });
//         res.render("chat", { users, rooms });

//     }
// sua lai router phan chat
var code = Math.random().toString(36).substring(2, 8);
const session = require("express-session");

const addToCart = async(req, res) => {
    const body = req.body;
    const items = req.session.cart;

    // console.log(items);
    let isUpdate = false;
    // mua lai san pham da mua roi

    items.map((item) => {
        if (body.id === item.id) {
            isUpdate = true;
            item.qty += parseInt(body.qty);
        }
        return item;
    });
    // mua 1 san pham moi
    if (!isUpdate) {
        const product = await ProductModel.findById(body.id);
        items.push({
            id: product._id,
            name: product.name,
            price: product.price,
            img: product.thumbnail,
            qty: parseInt(body.qty),
        });
    };
    req.session.cart = items;
    res.redirect("/cart");

    // console.log(req.session.cart);
}


const order = async(req, res) => {
    const items = req.session.cart;
    const body = req.body;
    // lay duong dan den thu muc view
    const viewPath = req.app.get("views");
    /// compile ejs sang html de gui maill cho khach
    const html = await ejs.renderFile(
        path.join(viewPath, "site/email-order.ejs"), {
            name: body.name,
            phone: body.phone,
            mail: body.mail,
            add: body.add,
            // url: config.get("app.url"),
            totalPrice: 0,
            items,
        }
    );

    // gui mail
    await transporter.sendMail({
        to: body.mail,
        from: "dung Mike",
        subject: "xac nhan don hang tu dungMike shop",
        html,
    });
    // console.log("ahahaha3");


    req.session.cart = [];
    res.redirect("success");
}


const updateCart = (req, res) => {
    const items = req.session.cart;
    const products = req.body.products;
    items.map((item) => {
        if (products[item.id]) {
            item.qty = parseInt(products[item.id]["qty"]);
        }
    });
    session.cart = items;
    res.redirect("/cart");
}
const delCart = (req, res) => {
    const items = req.session.cart;
    const id = req.params.id;
    items.map((item, key) => {
        if (item.id === id) {
            items.splice(key, 1);
        }
    });
    req.session.cart = items;
    res.redirect("cart");
}
const login = (req, res) => {
    res.render("site/login/loginUser", { data: {} })
}
const postLogin = async(req, res) => {
    const mail = req.body.mail;
    console.log(mail);
    const pass = req.body.pass;
    console.log(pass);
    let err;


    const users = await UserModel.find({ email: mail, password: pass });
    console.log(users);
    if (mail == "" || pass == "") {
        err = "Thong tin lhoong duoc de trong";
    } else if (users.length > 0) {
        req.session.mail = mail;
        req.session.pass = pass;
        req.session._id = users[0]._id;
        req.session.nameUser = users[0].full_name;
        console.log(session);
        res.redirect("/", );
    } else {
        err = "Tai khoan khong hop le"
    }
    res.render("site/login/loginUser", { data: { err: err } });
}
const forgotPass = async(req, res) => {
    res.render("site/login/forgotPass")


}
const forgotPassSendmail = async(req, res) => {
    const mail = req.body.mail;
    console.log(mail);
    const userMail = await UserModel.find({ email: mail });
    // var idUserForgotPass= userMail["_id"];
    // console.log(idUserForgotPass);
    const iduserMail = userMail[0]._id;
    console.log(iduserMail);
    console.log(userMail);
    if (userMail) {

        console.log(code);
        // console.log(session)
        // req.session.codePass = code;
        const viewPath = req.app.get("views");
        const html = await ejs.renderFile(
            path.join(viewPath, "site/login/email-code.ejs"), { code });
        // gui mail
        await transporter.sendMail({
            to: mail,
            from: "dung Mike",
            subject: "xac nhan code de dat lai mat khau",
            html,
        });
        console.log("sended mail");
        res.redirect("/receiveCode/" + iduserMail);
    } else {
        alert("Sorry, email is not registed. ");
        res.redirect("/forgotPass")
    }

}
const receiveCode = (req, res) => {
    console.log(req.params);
    console.log("1");
    const id = req.params.id;
    console.log(id + "      2");
    res.render("site/login/receiveCode", { id })
}
const postReceiveCode = (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    console.log(id);
    const codeReceive = req.body.code;
    if (codeReceive === code) {
        res.redirect("/remakePassWord/" + id);
    } else {
        res.redirect("/receiveCode");
    }
}
const remakePassWord = (req, res) => {

    const id = req.params.id;
    console.log(id);
    res.render("site/login/remakePassWord", { id });

}
const postRemakePassWord = async(req, res) => {
    const id = req.params.id;
    console.log("3    " + id);
    if (req.body.user_pass == req.body.user_re_pass) {
        // userMail["password"] = req.body.user_pass;
        const userHaveNewpass = await UserModel.findById(id);
        console.log(userHaveNewpass);
        const newUser = {
            full_name: userHaveNewpass.full_name,
            email: userHaveNewpass.email,
            password: req.body.user_pass,
            role: userHaveNewpass.role,
        }
        await UserModel.updateOne({ _id: id }, { $set: newUser });
        res.redirect("/login");
    } else {
        res.redirect(req.originalUrl);
    }
}
const register = (req, res) => {
    res.render("site/register/register");
}
const postRegister = async(req, res) => {
    const body = req.body;
    console.log(body);
    const newUser = {
        full_name: body.user_full,
        email: body.user_mail,
        password: body.user_pass,
        role: body.user_level,
    }
    if (newUser["password"] == body.user_re_pass) {

        new UserModel(newUser).save();
        res.redirect("/login");
    }
}

module.exports = {
    home: home,
    category: category,
    cart: cart,
    success: success,
    product: product,
    search: search,
    addToCart: addToCart,
    updateCart: updateCart,
    delCart: delCart,
    order: order,
    login: login,
    postLogin: postLogin,
    forgotPass: forgotPass,
    receiveCode: receiveCode,
    postReceiveCode: postReceiveCode,
    remakePassWord: remakePassWord,
    postRemakePassWord: postRemakePassWord,
    register: register,
    postRegister: postRegister,
    forgotPassSendmail: forgotPassSendmail
}