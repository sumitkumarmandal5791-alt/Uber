const express = require("express")
const captionRouter = express.Router()
const { registerCaption, loginCaption, LogoutCaption, captionProfile } = require("../controllers/caption.controllers")
const { captionMiddleware } = require("../middleware/captionauth")

captionRouter.post("/register", registerCaption)
captionRouter.post("/login", loginCaption)
captionRouter.post("/logout", captionMiddleware, LogoutCaption)
captionRouter.get("/check", captionMiddleware, (req, res) => {
    const reply = {
        fullname: req.caption.fullname,
        email: req.caption.email,
        _id: req.caption._id,
        vehicle: req.caption.vehicle
    }

    res.status(200).json({
        caption: reply,
        message: "Caption is verified"
    })
})
captionRouter.get("/profile", captionMiddleware, captionProfile)

module.exports = captionRouter
