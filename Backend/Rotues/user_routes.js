const express = require("express")
const userRouter = express.Router()
const { registerUser, loginUser, Logout, userProfile } = require("../controllers/user_controllers")
const { userMiddleware } = require("../middleware/userauth")

userRouter.post("/register", registerUser)
userRouter.get("/check",userMiddleware ,(req,res)=>{
     const reply={
        fullname: req.user.fullname,
        email: req.user.email,
        _id: req.user._id,
        role: req.user.role
     }

       res.status(200).json({
        user: reply,
        message: "User is verified"
    })
} )
userRouter.post("/login", loginUser)
userRouter.post("/logout", userMiddleware, Logout)
userRouter.get("/profile", userMiddleware, userProfile)

module.exports = userRouter