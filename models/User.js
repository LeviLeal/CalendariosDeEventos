const mongoose  = require("mongoose")
const Schema    = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

mongoose.model("users", User)
/*

Melhorias para depois

- Tornar nome de usuário único
- Impedir muitos logins em um curto espaço de tempo
- Resetar a senha com email

*/