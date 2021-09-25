const UserModel = require("../models/user");
const fs = require("fs");
const path = require("path");



const user = async(req, res) => {
    const users = await UserModel.find();
    // console.log(users);
    res.render("admin/users/user", { users });
}
const add_user = (req, res) => {

    res.render("admin/users/add_user");
}
const edit_user = async(req, res) => {
    const id = req.params.id;
    const U = await UserModel.findById(id);
    console.log(U);
    res.render("admin/users/edit_user", { U });
}
const delete_user = async(req, res) => {
    const id = req.params.id;

    await UserModel.deleteOne({ _id: id });
    res.redirect("/admin/users");
}
const postEdit_user = (req, res) => {
    const id = req.params.id;
    const editUser = {
        full_name: body.full_name,
        email: body.user_mail,
        password: body.user_pass,
        role: body.user_level,
    }
    if (newUser["password"] == body.user_re_pass) {

        new UserModel(newUser).save();
        res.redirect("/admin/users");
    }
    res.render("admin/users/edit_user");
}
const postAdd_user = (req, res) => {
    const body = req.body;

    const newUser = {
            full_name: body.user_full,
            email: body.user_mail,
            password: body.user_pass,
            role: body.user_level,
        }
        // console.log(newUser);
        // console.log(newUser["password"]);
        // console.log(body.user_re_pass);

    if (newUser["password"] == body.user_re_pass) {

        new UserModel(newUser).save();
        res.redirect("/admin/users");
    }

}

module.exports = {
    delete_user: delete_user,
    postAdd_user: postAdd_user,
    postEdit_user: postEdit_user,
    user: user,
    add_user: add_user,
    edit_user: edit_user
};