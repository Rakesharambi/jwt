const express = require("express");
const { signUp, userVerification, getUser } = require("../Controllers/user");
const { logIn } = require("../Controllers/user");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/logIn").post(logIn);                //password : rakeshar                         
router.route("/verify").get(userVerification, getUser);

module.exports = router;