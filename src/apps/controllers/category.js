const category = (req, res) => {
    res.render("admin/categories/category");
};
const add_category = (req, res) => {
    res.render("admin/categories/add_category");
};
const edit_category = (req, res) => {
    res.render("admin/categories/edit_category");
};
module.exports = {
    category: category,
    add_category: category,
    edit_category: edit_category
}
