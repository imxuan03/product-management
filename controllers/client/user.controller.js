const md5 = require('md5')
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");

const generateHelper = require("../../helpers/generate");
// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register",{
        pageTitle: "Đăng kí tài khoản"
    });
}

// [POST] /user/registerPost
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted:false
    })

    if(existEmail){
        req.flash('error', `Email đã tồn tại!`);
        res.redirect("back");
        return;
    }

    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();
    

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login",{
        pageTitle: "Đăng nhập tài khoản"
    });
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email:email,
        deleted:false,
    })

    if(!user){
        req.flash('error', `Email không tồn tại!`);
        res.redirect("back");
        return;
    }

    if(user.password != md5(password)){
        req.flash('error', `Sai mật khẩu!`);
        res.redirect("back");
        return;
    }
    if(user.status == "inactive"){
        req.flash('error', `Tài khoản bị khóa!`);
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}


// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password",{
        pageTitle: "Quên mật khẩu"
    });
}


// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {

    const email = req.body.email;

    const user = await User.findOne({
        email:email,
        deleted:false,
    })

    if(!user){
        req.flash('error', `Email không tồn tại!`);
        res.redirect("back");
        return;
    }

    // Việc 1: tạo mã OPT, email và lưu thông tin yêu cầu vào User.collection forgot-password
    const opt = generateHelper.generateRandomNumber(8);
    const objectForgotPassword = {
        email: email,
        opt:opt,
        expireAt: Date.now()
    }
    
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Việc 2: Gửi mã OPT qua email 

    res.redirect(`/user/password/opt?email=${email}`);
}


// [GET] /user/password/opt
module.exports.optPassword = async (req, res) => {

    const email = req.query.email;

    res.render("client/pages/user/opt-password",{
        pageTitle: "Nhập mã OPT",
        email:email
    });

}

// [Post] /user/password/opt
module.exports.optPasswordPost = async (req, res) => {
    const email = req.body.email;
    const opt = req.body.opt;

    const result = await ForgotPassword.findOne({
        email: email,
        opt: opt,
    })

    console.log(result);
    if(!result){
        req.flash('error', `OPT không hợp lệ`);
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email:email
    })

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
}

