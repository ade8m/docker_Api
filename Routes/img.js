const express = require('express');
const router = express.Router();
const imageController = require('../controller/imgCont');

router.get('/', imageController.getDockerImages);
router.post('/Pull', imageController.pullImage);

module.exports = router;