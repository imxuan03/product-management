const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {
        title: String,
        product_category_id:{
            type:String,
            default: "",
        },
        description:String,
        price:Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status:String,
        position:Number,
        slug: {
            type: String,
            slug: ["title", "subtitle"], 
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

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;