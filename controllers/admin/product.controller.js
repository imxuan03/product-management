// [GET] /admin/products 
const Product = require("../../models/product.model")

const systemConfig = require("../../config/system")

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
    // sort     
    let sort={};
    if(req.query.sortKey&&req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }else{
        sort.position = "desc"
    }
    // end sort 
    
    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

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

// [GET] /admin/products/change-multi
module.exports.changeMulti = async (req, res)=>{
    //Cách viết 1 
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    //Cách viết 2
    // const  { type, ids} = req.body;
    
    console.log(type);
    console.log(ids);

    switch (type) {
        case "active":
        case "inactive":    
            await Product.updateMany({_id:{$in: ids}}, {status: type})
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany({_id:{$in: ids}}, {
                deleted: true,
                deletedAt: new Date()
            })
            req.flash('success', `Xóa trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            for(const item of ids){
                // console.log(item.split("-"));
                const [id, position] = item.split("-");
                // console.log(id);
                // console.log(position);
                await Product.updateOne({_id: id}, {position: position});
            }
            req.flash('success', `Thay đổi vị trí thành công ${ids.length} sản phẩm!`);
            break;
        default:
            break;
    }

    res.redirect("back");

}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res)=>{
   const id = req.params.id;
   console.log(id);

   //xóa vĩnh viễn
    //await Product.deleteOne({_id: id});
    //xóa mềm
    await Product.updateOne({_id: id}, {
        deleted: true, 
        deletedAt: new Date()
    });
    req.flash('success', `Xóa trạng thái thành công sản phẩm!`);
   res.redirect("back");

}

// [GET] /admin/products/create
module.exports.create = async (req, res)=>{

    res.render("admin/pages/products/create", {
        pageTitle: "Trang Tạo Mới Sản Phẩm"
    });
 
 }

 // [POST] /admin/products/create
module.exports.createPost = async (req, res)=>{

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position===""){
        const countProducts =await Product.countDocuments();
        req.body.position=countProducts+1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    

    //sửa tên thumbnail
    // if(req.file && req.file.filename){
    //     req.body.thumbnail = `/uploads/${ req.file.filename}`;
    // }

    //Lưu product vào bên trong CSDL
    const product = new Product(req.body);
    await product.save();

    res.redirect(`/${systemConfig.prefixAdmin}/products`);
 }
 // [GET] /admin/products/edit
 module.exports.edit = async (req, res)=>{
    try {
        const id = req.params.id;
        
        const product = await Product.findOne({
            _id: id,
            deleted: false
        })
    
        res.render("admin/pages/products/edit", {
            pageTitle: "Trang Chỉnh Sửa Sản Phẩm",
            product: product
        });
     
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`)

    }
 }

  // [PATCH] /admin/products/edit/:id
  module.exports.editPatch = async (req, res)=>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position===""){
        const countProducts =await Product.countDocuments();
        req.body.position=countProducts+1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    

    //sửa tên thumbnail
    if(req.file && req.file.filename){
        req.body.thumbnail = `/uploads/${ req.file.filename}`;
    }

    await Product.updateOne({_id:id}, req.body);

    
    req.flash('success', `Cập nhật thành công sản phẩm!`);
    res.redirect("back");
 }

  // [GET] /admin/products/detail
  module.exports.detail = async (req, res)=>{
    
    try {
        const id = req.params.id;
    
        const product = await Product.findOne({
            _id: id,
            deleted: false
        })

        res.render("admin/pages/products/detail", {
            pageTitle: "Chi Tiết Sản Phẩm",
            product: product
        });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`)
    }
    
 }

