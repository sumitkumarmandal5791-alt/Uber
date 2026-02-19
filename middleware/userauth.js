const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user")
const redisClient = require("../database/reddis")

const userMiddleware = async (req, res, next) => {
    try {
        // tems and condtion to verify token
        const { token } = req.cookies;
        if (!token)
            throw new Error("Unauthorized 1")

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const { _id } = payload;


        if (!_id)
            throw new Error("Unauthorized 2")

        const user = await userModel.findById(_id)

        if (!user)
            throw new Error("Unauthorized 2")

        //check in the database of reddis whether this 
        // token is blacklisted or not
        const blockListToken = await redisClient.exists(`token:${token}`)
        if (blockListToken)
            throw new Error("Unauthorized 3")


        //user ko varify kare ke baad usse related saare info ko req.user me store kar diya hai 
        //taki user se related koi bhi information mil skae
        req.user = user;
        //token verified ans it is valid user
        next()

    }
    catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    userMiddleware
}