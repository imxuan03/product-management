const productRoute = require("./product.route")
const homeRoute = require("./home.route")
const userRoute = require("./user.route")
const userMiddleWare = require("../../middlewares/client/user.middleware");
module.exports = (app)=>{
    // exports để trở thành hàm, để bỏ qua bên indexedDB.js 

    app.use(userMiddleWare.inforUser);

    
    app.use('/',homeRoute );
    app.use('/products', productRoute );
    app.use('/user', userRoute );

    app.use('/user', userRoute );
    
}