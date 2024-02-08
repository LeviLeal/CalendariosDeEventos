const express           = require("express")
const mongoose          = require("mongoose")
const router            = express.Router()
require("../models/User")
const User              = mongoose.model("users")
const bcrypt            = require("bcryptjs")   
const passport          = require("passport")
const { isLogged }      = require("../helpers/isLogged.js")

// CADASTRAR

router.get("/cadastrar", isLogged, (req, res) => {
    res.render("users/page_cad")
})

router.post("/cadastrar", isLogged, (req, res) => {

    // Validacao
    let errors = []

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null)
        errors.push("Nome inválido")
    if (!req.body.password || typeof req.body.password == undefined || req.body.password == null)
        errors.push("Senha inválida")
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null)
        errors.push("E-mail inválido")

    // Se tiver errors, retorna usuario a pagina de cadastro e envia os erros
    if(errors.length > 0)
        res.render("users/page_cad", {errors : errors})
    else {
        User.findOne({email: req.body.email}).then((user) => {
            if (user) {
                res.flash("error_msg", "Já existe um usuário com este e-mail")
                res.redirect("/usuarios/cadastrar")
            } else {
                const newUser = new User ({
                    name        : req.body.name,
                    password    : req.body.password,
                    email       : req.body.email,
                })              

                // Encriptacao da senha e salvamento do usuario
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if(error) {
                            req.flash("error_msg", "Houve um erro durante o cadastro do usuário")
                            res.redirect("/usuarios/cadastrar")
                        }
                        console.log(newUser)
                        newUser.password = hash
                        newUser.save().then(() => {
                            req.flash("success_msg", "Usuário criado com sucesso")
                            res.redirect("/")
                        }).catch((error) => {
                            req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamente")
                        })
                    })
                })                
            }
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("  /")
        })
    }
})

// LOGAR

router.get("/logar", (req, res) => {
    res.render("users/page_login")
})

router.post("/logar", (req, res, next) => {
    // Authentication Method: Local
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuario/logar",
        failureFlash: true
    })(req, res, next)
})

// SAIR

router.get("/sair", isLogged, (req, res) => {
    req.logout(() => {
        req.flash("success_msg", "Deslogado com sucesso")
        res.redirect("/usuario/logar")
    })
})


// CONFIGURAR 

router.get("/configurar", isLogged, (req, res) => {


    res.render("users/page_config", {user: req.user.toJSON()})
})

router.post("/atualizar", isLogged, async (req, res) => {

    let userPassword = req.body.password
    let hashedPassword = null

    if (userPassword != "" && userPassword != null && typeof userPassword != undefined) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(userPassword, salt, (error, hash) => {
                if(error) {
                    req.flash("error_msg", "Houve um erro ao atualizar suas informações")
                    res.redirect("/usuarios/configurar")
                }
                hashedPassword = hash
            })
        })
    } 
    
    if (hashedPassword != null )
        password = hashedPassword
    else
        userPassword = req.user.password

    await User.updateOne({_id: req.user.id}, {$set: {
        email: req.body.email, 
        name: req.body.name, 
        password: userPassword }}
    )

    req.flash("success_msg", "Informações atualizadas!")
    res.redirect("/usuario/configurar")

})

router.post("/email", isLogged, async (req, res) => {
    let user = await User.findOne({email : req.body.email}).then((row) => {
        if (row)
            res.send(true)
        else
            res.send(false)
    })
})


module.exports = router