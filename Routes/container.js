const express = require('express');
const router = express.Router();
const containerController = require('../controller/containerCont.js');

router.post('/New', containerController.createContainer);
router.get('/:containerId/start', containerController.startContainer);
router.get('/:containerId/stop', containerController.stopContainer);
router.get('/AllContainers', containerController.getAllContainers);
router.get('/startedContainers', containerController.getStartedContainers);
router.get('/stopAllContainers', containerController.stopAllContainers);


module.exports = router;
