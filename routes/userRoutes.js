const User = require("../models/user");
const express=require("express");
const router=express.Router();

const {getUser,getUserById}=require("../controllers/user")
const {isSignedin,isAuthenticated}=require("../controllers/auth")

router.param("userId",getUserById);
// get users info
router.get("/user/:userId",isSignedin,isAuthenticated,getUser)
module.exports=router;