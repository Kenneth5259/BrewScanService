const express = require('express');
const router = express.Router();

const imageController = require('../controller/image-controller');



//const image = '/Users/kennethcarroll/Developer/TheBrewJudge/BrewScanService/routes/test.jpg';

router.post('/image', imageController.handleNewImage);

module.exports = router;