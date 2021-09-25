const { mongo } = require('mongoose');

// goi file lien ket vs mongo
const mongoose = require('../../common/database')();

// su dung chema de dinh dang du lieu xuat ra

const productSchema = mongoose.Schema({
    cat_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },

    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        required: true,
    },


    description: {
        type: String,
        default: null
    },
    thumbnail: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: null
    },
    is_stock: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    promotion: {
        type: String,
        default: null
    },
    warranty: {
        type: String,
        default: null
    },
    accesspries: {
        type: String,
        default: null
    },

}, {
    timestamps: true,
});

const ProductModel = mongoose.model("product", productSchema, "products");
module.exports = ProductModel;