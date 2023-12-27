// [GET] /products

const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });


    const newPrice = products.map(item => {
        item.PriceNew = (item.price - (item.price*item.discountPercentage)/100).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index.pug",{
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products
    });
}