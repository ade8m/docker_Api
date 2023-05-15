const express = require('express');
const router = express.Router();
const imageController = require('../controller/imgCont');

router.get('/', imageController.getDockerImages);

module.exports = router;