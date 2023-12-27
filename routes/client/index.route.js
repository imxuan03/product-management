const productRoute = require("./product.route")
const homeRoute = require("./home.route")

module.exports = (app)=>{
    // exports để trở thành hàm, để bỏ qua bên indexedDB.js 
    app.use('/',homeRoute );
    app.use('/products', productRoute );
    
}