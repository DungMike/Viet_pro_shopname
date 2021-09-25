// goi file lien ket vs mongo
const mongoose = require('../../common/database')();

//su dung schema de dinh hinh lai callection user
const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["member", "admin"],
        default: "member"
    }


});
// bien schema vau dinh dang thanh model:
const UserModel = mongoose.model("Users", userSchema, "users", { __v: { type: Number, select: false } });
module.exports = UserModel;