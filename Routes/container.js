const express = require('express');
const router = express.Router();
const containerController = require('../controller/containerCont.js');

router.post('/Add', containerController.createContainer);
router.get('/:containerId/stop', containerController.stopContainer);
router.get('/AllContainers', containerController.getAllContainers);


module.exports = router;
