const express = require('express')
const app = express()
const env = require('dotenv').config()
const path = require('path')
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
db()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs')
app.set('views', [path.join(__dirname, 'views/user'), path.join(__dirname, 'views/admin')])
app.use(express.static(path.join(__dirname, "public")))




app.use('/', userRoutes)



app.listen(3000, () => {
    console.log("server is running on port 3000");

})

module.exports = app