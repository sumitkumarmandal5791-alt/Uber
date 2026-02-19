const { captionModel } = require("../models/caption.models")
const redisClient = require("../database/reddis")
const jwt = require("jsonwebtoken")

const registerCaption = async (req, res) => {
    try {
        const { fullname: { firstname, lastname }, email, password, vehicle: { color, plate, capacity, vehicleType } } = req.body
        console.log(firstname, lastname, email, password, color, plate, capacity, vehicleType)

        if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType)
            throw new Error("All fields are mandatory")

        const isCaption = await captionModel.findOne({ email })
        if (isCaption)
            throw new Error("caption already exisits")

        const hashPassword = await captionModel.hashPassword(password)


        const caption = await captionModel.create({ fullname: { firstname, lastname }, email, password: hashPassword, vehicle: { color, plate, capacity, vehicleType } })

        const token = caption.generateToken()

        res.cookie("token", token)
        res.status(201).json({ message: "Caption registered successfully", caption })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginCaption = async (req, res) => {
    try {
        const { email, password } = req.body


        if (!email || !password)
            throw new Error("All fields are mandatory")


        const caption = await captionModel.findOne({ email })
        if (!caption) {
            return res.status(404).json({ message: "Caption not found" })
        }


        const isPasswordValid = await caption.comparePassword(password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = caption.generateToken()

        res.cookie("token", token, { httpOnly: true, secure: true })
        res.status(200).json({ message: "Caption logged in successfully", caption })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const LogoutCaption = async (req, res) => {
    try {
        //valide the token ki user logout hona chatah hai

        //Token Add kar dunga Reddis ke blockList me
        const { token } = req.cookies;

        const payload = jwt.decode(token)

        await redisClient.set(`token:${token}`, "Blocked")
        await redisClient.expireAt(`token:${token}`, payload.exp)

        //expire the cokkies ans sent to user
        res.cookie("token", null, { maxAge: new Date(Date.now()) });
        res.send("Logout successfully")
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const captionProfile = async (req, res) => {
    try {
        res.status(200).json(req.caption)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { registerCaption, loginCaption, LogoutCaption, captionProfile }