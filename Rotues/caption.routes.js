const express = require("express")
const captionRouter = express.Router()
const { registerCaption, loginCaption, LogoutCaption, captionProfile } = require("../controllers/caption.controllers")
const { captionMiddleware } = require("../middleware/captionauth")

captionRouter.post("/register", registerCaption)
captionRouter.post("/login", loginCaption)
captionRouter.post("/logout", captionMiddleware, LogoutCaption)
captionRouter.get("/profile", captionMiddleware, captionProfile)

module.exports = captionRouter
