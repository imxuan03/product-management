const express = require('express');
const multer  = require('multer');
const router = express.Router();

const storageMulterHelper = require("../../helpers/storageMulter");
const storage = storageMulterHelper();

//những ảnh upload trong phần thêm sản phẩm
const upload = multer({storage: storage})

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

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
    validate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id", 
    upload.single("thumbnail"), 
    validate.createPost,
    controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;