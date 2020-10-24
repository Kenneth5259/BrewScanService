const express = require('express');
const router = express.Router();

router.get('/test', (req, res, next) => {
    console.log('Test Rout Get');
    res.sendStatus(200);
})

module.exports = router;