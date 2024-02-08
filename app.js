const express       = require("express")
const bodyParser    = require("body-parser")
const handlebars    = require("express-handlebars")
const path          = require("path")
const flash         = require("connect-flash")
const session       = require("express-session")
const mongoose      = require("mongoose")
const app           = express()
const passport      = require("passport")
const { isLogged }      = require("./helpers/isLogged.js")
// Armazenar cookies
const MongoStore    = require("connect-mongo")
require("./config/auth")(passport)

const user          = require("./routes/user")
const calendario    = require("./routes/calendario")
const mongoUrl      = "mongodb://localhost/CalendarioEventos"

// -- CONFIGURATIONS -- //

// Express Session
app.use(session({
    secret: "calendarioeventos",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/CalendarioEventos',
        autoRemove: 'native'
      })
}))

// Passport


app.use(passport.initialize())
app.use(passport.session({
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 120 * 60 * 10000 }
}))

// Body Parser
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// Handlebars
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// Flash
app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg   = req.flash("success_msg")
    res.locals.error_msg    = req.flash("error_msg")
    res.locals.error        = req.flash("error")
    res.locals.user         = req.user || null
    next()
})

// Mongoose
mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/CalendarioEventos").then(() => {
    console.log("[OK] Conectado ao MongoDB")
}).catch((error) => {
    console.log(`[ERROR] Erro ao se conectar com o MongoDB: ${error}`)
})

// Static files path for express

app.use(express.static(path.join(__dirname, "public")))

// -- ROUTES -- //

app.get("/", isLogged, (req, res) => {
    res.render("calendario/calendario")
})

// USER route
app.use("/usuario", user)

// CALENDARIO route
 
app.use("/calendario", calendario)

// EXPRESS SERVER

const PORT = "8081"
app.listen(PORT, () => {
    console.log(`[OK] Servidor express rodando em http://localhost:${PORT}`)
})