module.exports.registerPost = (req, res, next) =>{
    //validate
    if(!req.body.fullName){
        req.flash('error', `Họ tên không được để trống!`);
        res.redirect("back");
        return;
   }

   if(!req.body.email){
    req.flash('error', `Email không được để trống!`);
    res.redirect("back");
    return;
    }

    if(!req.body.password){
        req.flash('error', `Password không được để trống!`);
        res.redirect("back");
        return;
    }


    next();
}

module.exports.loginPost = (req, res, next) =>{
    //validate
   if(!req.body.email){
    req.flash('error', `Email không được để trống!`);
    res.redirect("back");
    return;
    }

    if(!req.body.password){
        req.flash('error', `Password không được để trống!`);
        res.redirect("back");
        return;
    }

    next();
}

module.exports.forgotPasswordPost = (req, res, next) =>{
    //validate
   if(!req.body.email){
    req.flash('error', `Email không được để trống!`);
    res.redirect("back");
    return;
    }
    
    next();
}
