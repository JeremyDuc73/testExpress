const {Router} = require("express")
const router = Router()
const appController = require("../controllers/appController");




router.post("/register",appController.register)

router.post("/login",appController.login)

router.get("/logout", appController.logout)


module.exports = router