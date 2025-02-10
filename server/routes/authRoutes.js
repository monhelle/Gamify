const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const verifyJwt = require("../middleware/verifyToken.js");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user", verifyJwt, authController.user)



module.exports = router;