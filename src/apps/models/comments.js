const { mongo } = require('mongoose');
// goi file lien ket vs mongo 
const mongoose = require('../../common/database')();
// su dung schma de dinh dang du lieu xuat ra

const commentSchema = mongoose.Schema({
    prd_id: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    full_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    body: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
});

const CommentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = CommentModel;