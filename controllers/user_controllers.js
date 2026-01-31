const { userModel } = require("../models/user")
const { validate } = require("../validator/validator")

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

module.exports = { registerUser }