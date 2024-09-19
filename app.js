const express = require('express')
const app = express()
const env = require('dotenv').config()
const path = require('path')
const db = require('./config/db')
const session = require('express-session')
const bodyparser = require('body-parser')
const cors = require('cors')
const passport = require('./config/passport')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
db()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
    }
}))




app.use(passport.initialize())
app.use(passport.session())


app.set('view engine', 'ejs')
app.set('views', [path.join(__dirname, 'views/user'), path.join(__dirname, 'views/admin')])
app.use(express.static(path.join(__dirname, "public")))




app.use('/', userRoutes)
app.use('/admin', adminRoutes)
app.listen(3000, () => {
    console.log("server is running on port 3000");

})

module.exports = app