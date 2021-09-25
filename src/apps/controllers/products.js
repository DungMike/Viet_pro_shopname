const CategoryModle = require("../models/category");
const ProductModel = require("../models/products");
const paginate = require("../../common/paginate");
const fs = require("fs");
const path = require("path");
const slug = require("slug");


const index = async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    skip = page * limit - limit;

    const total = await ProductModel.find().countDocuments();
    const totalPage = Math.ceil(total / limit);
    // 
    const products = await ProductModel.find()
        .populate({ path: "cat_id" })
        .skip(skip)
        .limit(limit)
        .sort({ "_id": -1 });



    // console.log(products);
    res.render("admin/products/product", {
        products: products,
        page: page,
        pages: paginate(page, totalPage),
        totalPage: totalPage
    });
}
const create = async(req, res) => {
    const categories = await CategoryModle.find();
    res.render("admin/products/add_product", { categories: categories });
}

const edit = async(req, res) => {
    const categories = await CategoryModle.find();
    const id = req.params.id;
    const products = await ProductModel.findById(id);


    res.render("admin/products/edit_product", { products: products, categories: categories });
}


const del = async(req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({ _id: id });
    res.redirect("/admin/products");

}
const postCreate = async(req, res) => {

    const body = req.body;
    const file = req.file;
    // console.log(file);
    const product = {
        description: body.description,
        cat_id: body.cat_id,
        price: body.price,
        status: body.status,
        featured: body.featured,
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name)
    }
    if (file) {
        const thumbnail = "products/" + file.originalname;
        product["thumbnail"] = thumbnail;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        new ProductModel(product).save();
        // console.log(product);
        res.redirect("/admin/products");
    }
}


const postEdit = async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    // console.log(body);
    // console.log(body.name)
    const file = req.file;
    // console.log(file);
    const product = {
        description: body.description,
        cat_id: body.cat_id,
        price: body.price,
        status: body.status,
        featured: body.featured,
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name)

    }
    if (file) {
        const thumbnail = "products/" + file.originalname;
        product["thumbnail"] = thumbnail;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        // console.log("aaaaa");
    }
    await ProductModel.updateOne({ _id: id }, { $set: product });
    res.redirect("/admin/products")

}
module.exports = {
    index: index,
    create: create,
    edit: edit,
    postCreate: postCreate,
    postEdit: postEdit,
    del: del
}