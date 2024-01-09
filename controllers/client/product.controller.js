// [GET] /products

const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});


    const newPrice = products.map(item => {
        item.PriceNew = (item.price - (item.price*item.discountPercentage)/100).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index.pug",{
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products
    });
}

 // [GET] /products/detail/:slug
 module.exports.detail = async (req, res)=>{
    
    try {
        const slug = req.params.slug;
        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        })
        res.render("client/pages/products/detail", {
            pageTitle: "Chi Tiết Sản Phẩm",
            product: product
        });
    } catch (error) {
        res.redirect("/")
    }
    
 }
