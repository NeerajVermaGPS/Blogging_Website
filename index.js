const express = require('express');
const path = require('path');
const routers = require("./routes/indexRoutes")
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")
const { checkUserForAuthentication } = require("./middlewares/authMiddleware")
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkUserForAuthentication("token"))

app.use(routers)

app.use(express.static(path.resolve(__dirname, 'public')));

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}`)
})