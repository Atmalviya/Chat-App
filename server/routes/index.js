const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerUser");


router.post("/register", registerUser);
router.post('/login', loginUser)


module.exports = router;