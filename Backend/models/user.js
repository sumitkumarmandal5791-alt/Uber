const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { Schema } = mongoose
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "First name must be at least 3 characters long"],
            maxLength: [100, "First name cannot be more than 100 characters long"],
        },
        lastname: {
            type: String,
            minLength: [3, "Last name must be at least 3 characters long"],
            maxLength: [100, "Last name cannot be more than 100 characters long"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        immutable: true,
    },
    socketId: {
        type: String,
    }
}, { timestamps: true })

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10)
}

const userModel = mongoose.model("User", userSchema)
module.exports = { userModel }