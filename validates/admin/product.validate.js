module.exports.createPost = (req, res, next) =>{
    //validate
    if(!req.body.title){
        req.flash('error', `Tiêu đề không được để trống!`);
        res.redirect("back");
        return;
   }
   if(req.body.title.length<5){
    req.flash('error', `Tiêu đề phải ít nhất 5 kí tự!`);
    res.redirect("back");
    return;
    }    

    next();
}