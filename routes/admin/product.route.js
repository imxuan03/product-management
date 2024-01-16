const express = require('express');
const multer  = require('multer');
// const cloudinary = require('cloudinary').v2
// const streamifier = require('streamifier')
const router = express.Router();

// const storageMulterHelper = require("../../helpers/storageMulter");
// const storage = storageMulterHelper();

//những ảnh upload trong phần thêm sản phẩm
// cloudinary.config({ 
//     cloud_name: 'dnbjsfogw', 
//     api_key: '878548486153116', 
//     api_secret: 'OPQDpOM5QyCOQFWht9XadNOwsCc' 
//   });

const upload = multer()

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

//úp ảnh, vào thumbnail
//https://www.npmjs.com/package/multer
router.post(
    "/create", 
    upload.single("thumbnail"),
    uploadCloud.upload, 
    validate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id", 
    upload.single("thumbnail"), 
    uploadCloud.upload, 
    validate.createPost,
    controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;