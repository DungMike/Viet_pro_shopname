const checkLogin = (req, res, next) => {
    if (req.session.mail && req.session.pass) {
        return res.redirect("/admin/dashboard");
    }
    next();
    console.log(req.session.mail, req.session.pass, +"x");
}

const checkAdmin = (req, res, next) => {
    if (!req.session.mail || !req.session.pass) {
        return res.redirect("/admin/login");
    }
    next();
}
const checkUser = (req, res, next) => {
    if (!req.session.mail || !req.session.pass) {
        return res.redirect(`/admin/login?redirect=${req.originalUrl}`);
    }
    next();
}

module.exports = {
    checkAdmin: checkAdmin,
    checkLogin: checkLogin,
    checkUser: checkUser
}