
// [GET] /admin/products 
const Product = require("../../models/product.model")

//hàm filterStatus từ helper 
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
module.exports.index = async (req, res) => {
    // filterStatus từ helper
    filterStatus = filterStatusHelper(req.query);

    let objectSearch = searchHelper(req.query);

    let find = {
        deleted: false
    };

    if(req.query.status)
        find.status = req.query.status;

    if(req.query.keyword){
        find.title = objectSearch.regex;
    }

    // pagination (phân trang)
    let initPagination = {
        currentPage: 1,
        limitItems:4
    }

    const countProducts = await Product.countDocuments(find);
    const objectPagination = paginationHelper(initPagination,req.query,countProducts);
    // end pagination 
    
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render("admin/pages/products/index.pug",{
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res)=>{
    const status = req.params.status;
    const id = req.params.id;
    
    await Product.updateOne({_id: id} , {status: status });
    
    res.redirect("back");
}