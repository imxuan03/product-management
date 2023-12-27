
// [GET] /admin/products 
const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
    console.log(req.query.status);

    let find = {
        delete: false,
        status: "active"
    };

    const products = await Product.find({find});

    res.render("admin/pages/products/index.pug",{
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products
    });
}