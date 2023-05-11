const express = require('express');
const router = express.Router();
const containerController = require('../controller/containerCont.js');

router.post('/', containerController.createContainer);
router.get('/:containerId/stop', containerController.stopContainer);


module.exports = router;
