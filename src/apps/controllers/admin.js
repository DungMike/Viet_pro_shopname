const UserModel = require("../models/user");

const login = (req, res) => {
    res.render("admin/login", { data: {} })
}


const postLogin = async(req, res) => {
    const mail = req.body.mail;
    console.log(mail);
    const pass = req.body.pass;
    console.log(pass);
    let err;
    const { redirect } = req.query;

    // if(mail == "" || pass == "") {
    //     alert = "Thong tin khong duoc de trong";
    // }
    // else if( mail == "hivk15c3@gmail.com" && pass == "22061997") {
    //    res.redirect("/admin/dashboard");
    // }
    // else if (
    //     alert = " Tai khoan khong hop le"
    // )
    // res.render("admin/login");
    const users = await UserModel.find({ email: mail, password: pass });
    if (mail == "" || pass == "") {
        return err = "Thong tin khong duoc de trong";
    } else if (users.length > 0) {
        req.session.mail = mail;
        req.session.pass = pass;
        req.session._id = users[0]._id;
        if (redirect) {
            return res.redirect("/chat");
        } else if (!redirect) {
            return res.redirect("/admin/dashboard");
        }

    } else {
        return err = "Tai khoan khong hop le";
    }
    res.render("admin/login", { data: { err: err } });
}

const logout = (req, res) => {
    req.session.mail = "";
    req.session.pass = "";
    res.render("admin/login");
}
const dashboard = (req, res) => {
    res.render("admin/dashboard");
}
module.exports = {
    login: login,
    postLogin: postLogin,
    logout: logout,
    dashboard: dashboard
}