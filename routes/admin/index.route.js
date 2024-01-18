const systemConfig = require("../../config/system")

const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")
const accountRoutes = require("./account.route")
const productCategoryRoutes = require("./products-category.route")
const authRoutes = require("./auth.route")
const authMiddleWare = require("../../middlewares/admin/auth.middleware");
module.exports = (app)=>{
    // exports để trở thành hàm

    const PATH_ADMIN =  "/" + systemConfig.prefixAdmin ;   //"/admin"

    app.use(
        PATH_ADMIN+"/dashboard",
        authMiddleWare.requireAuth,
        dashboardRoutes
    );
    app.use(PATH_ADMIN+"/products",authMiddleWare.requireAuth, productRoutes);
    app.use(PATH_ADMIN+"/products-category", authMiddleWare.requireAuth, productCategoryRoutes);
    app.use(PATH_ADMIN+"/accounts", authMiddleWare.requireAuth, accountRoutes);
    app.use(PATH_ADMIN+"/auth", authRoutes);
    
}