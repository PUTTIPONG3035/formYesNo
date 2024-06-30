const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie = require("cookie-parser")





const app = express();
app.use(express.json())
app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}));
app.use(cookie());

const userRouter = require('./routes/user')
const questionRouter = require('./routes/question')

app.use(userRouter.router)
app.use(questionRouter.router)

mongoose.connect("mongodb://127.0.0.1:27017/Demo");


app.listen(3001, () => {
    console.log("server is running")
})