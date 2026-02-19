const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { Schema } = mongoose
const bcrypt = require("bcrypt")

const captionSchema = new mongoose.Schema({
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
    },
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],

        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motocycle', 'auto']
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }

}, { timestamps: true })


captionSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

captionSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

captionSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10)
}

const captionModel = mongoose.model("Caption", captionSchema)
module.exports = { captionModel }