const express = require('express');
const router = express.Router();
const imageController = require('../controller/imgCont');

router.post('/', imageController.createImage);

module.exports = router;