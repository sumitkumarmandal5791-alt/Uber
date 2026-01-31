const { userModel } = require("../models/user")
const redisClient = require("../database/reddis")
const { validate } = require("../validator/validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerUser = async (req, res) => {
    try {
        const { fullname: { firstname, lastname }, email, password } = req.body


        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        validate({ firstname, email, password })

        //get the hash password


        const hashPassword = await userModel.hashPassword(password)
        //create user


        const user = await userModel.create({
            fullname: { firstname, lastname },
            email,
            password: hashPassword
        })



        const token = user.generateToken()

        res.cookie("token", token)
        return res.status(201).json({ message: "User registered successfully", user })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" + error.message })
    }
}

const loginUser = async (req, res) => {

    try {
        //user send emailid and password for login
        const { email, password } = req.body

        if (!email || !password)
            throw new Error("All fields are mandatory")

        //find the user in databse by emailid
        const person = await userModel.findOne({ email: email })

        if (!person)
            throw new Error("User not found")

        //cpmpare password given from user and stored in databse
        const isPasswordMatched = await bcrypt.compare(password, person.password)
        if (!isPasswordMatched)
            throw new Error("Invalid credential")

        //create Jwt token
        const token = person.generateToken()

        //send along with req.token inside the cookie
        res.cookie("token", token, { maxAge: 60 * 60 * 1000 })
        res.status(201).json({ message: "use loged in successfully", person })

    }
    catch (error) {
        res.status(400).send(error.message)
    }
}
const Logout = async (req, res) => {
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


const userProfile = async (req, res) => {
    return res.status(201).json(req.user)
}


module.exports = { registerUser, loginUser, Logout, userProfile }