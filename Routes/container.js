const express = require('express');
const router = express.Router();
const containerController = require('../controller/containerCont.js');

router.post('/', containerController.createContainer);

module.exports = router;
