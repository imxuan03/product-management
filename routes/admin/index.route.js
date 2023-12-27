const systemConfig = require("../../config/system")

const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")

module.exports = (app)=>{
    // exports để trở thành hàm

    const PATH_ADMIN =  "/" + systemConfig.prefixAdmin ;   //"/admin"

    app.use(PATH_ADMIN+"/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN+"/products", productRoutes);
    
}