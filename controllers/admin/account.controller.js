const Account = require("../../models/account.model")
const md5 = require('md5');

const systemConfig = require("../../config/system")

// [GET] /admin/accounts 
module.exports.index = async  (req, res) => {
    const records = await Account.find({
        deleted: false
    })

    res.render("admin/pages/accounts/index.pug",{
        pageTitle: "Danh sách tài khoản",
        records:records
    });
}


// [GET] /admin/accounts/create 
module.exports.create = async  (req, res) => {

    res.render("admin/pages/accounts/create",{
        pageTitle: "Tạo mới tài khoản",
    });
}

// [Post] /admin/accounts/createPost
module.exports.createPost = async  (req, res) => {
    req.body.password = md5(req.body.password)

    const record = new Account(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}