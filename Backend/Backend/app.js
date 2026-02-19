require("dotenv").config();
const express = require("express");
const { main } = require("./server");
const app = express();
const cors = require("cors");
const userRouter = require("./Rotues/user_routes");
const captionRouter = require("./Rotues/caption.routes");
const cookieParser = require('cookie-parser')
const redisClient = require("./database/reddis");

const allowedOrigin = (process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN_DEV)

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json());
app.use(cookieParser());


app.use("/user", userRouter)
app.use("/caption", captionRouter)

const InitalizeConnection = async () => {
    try {
        await Promise.all([main(), redisClient.connect()])
        console.log("CONNECTED TO DATABASE and REDIS")
        app.listen(process.env.PORT, () => {
            console.log("Server is Listening at Port Number:" + process.env.PORT)
        })

    }
    catch (error) {
        console.log("DATABASE/REDIS CONNECTION FAILED" + error.message);

    }
}

InitalizeConnection();