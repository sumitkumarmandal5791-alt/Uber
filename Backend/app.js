require("dotenv").config();
const express = require("express");
const { main } = require("./server");
const app = express();
const cors = require("cors");



app.use(cors());
app.use(express.json());

const InitalizeConnection = async () => {
    try {
        await Promise.all([main()])
        console.log("CONNECTED TO DATABASE")
        app.listen(process.env.PORT, () => {
            console.log("Server is Listening at Port Number:" + process.env.PORT)
        })

    }
    catch (error) {
        console.log("DATABASE CONNECTION FAILED" + error.message);

    }
}

InitalizeConnection();