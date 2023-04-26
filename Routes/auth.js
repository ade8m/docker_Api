const express = require('express');
const authctl = require("../controller/auth"); 
const router = express.Router();


router.post("/registre",authctl.registre);
router.post("/login",authctl.login);
module.exports = router;