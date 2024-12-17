const express = require ('express')
const dbconnect = require ('./config/db')
const userRouter = require ('./routes/u.route')
const app = express()

app.use(express.json())
app.use("/user", userRouter);
app.listen(8090, () => {
    console.log("connecting on local host 8090")
    dbconnect()
})