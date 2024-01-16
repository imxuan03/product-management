const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategory = new mongoose.Schema(
    {
        title: String,
        parent_id: {
            type: String,
            default: "",
        },
        description:String,
        thumbnail: String,
        status:String,
        position:Number,
        slug: {
            type: String,
            slug: "title", 
            unique: true 
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    }, 
    { timestamps: true }
); // timestamp để tự động sinh ra time khi mình tạo mới, update dữ liệu
//https://mongoosejs.com/docs/timestamps.html

const ProductCategory = mongoose.model('ProductCategory', productCategory, "products-category");

module.exports = ProductCategory;