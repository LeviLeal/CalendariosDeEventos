const express       = require("express")
const router        = express.Router()
const mongoose      = require("mongoose")
const {isLogged}    = require("../helpers/isLogged.js")

router.get("/", isLogged, (req, res) => {
    res.render("calendario/calendario")
})

module.exports = router