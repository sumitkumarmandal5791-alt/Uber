const express = require("express")
const userRouter = express.Router()
const { registerUser, loginUser, Logout, userProfile } = require("../controllers/user_controllers")
const { userMiddleware } = require("../middleware/userauth")

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", userMiddleware, Logout)
userRouter.get("/profile", userMiddleware, userProfile)

module.exports = userRouter