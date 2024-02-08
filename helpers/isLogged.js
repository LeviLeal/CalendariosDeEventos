module.exports = {
    isLogged: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash("error_msg", "Entre primeiro!")
        res.redirect("/usuario/logar")
    }
}