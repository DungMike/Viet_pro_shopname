const mongoose = require("../../common/database")();

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
});

const CategoryModle = mongoose.model("Category", categorySchema, "categories");
module.exports = CategoryModle;