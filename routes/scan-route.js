const express = require('express');
const path = require('path')
const fs = require('fs');
const router = express.Router();

const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: '/Users/kennethcarroll/Developer/TheBrewJudge/BrewScanService/thebrewjudge-ddb5c39f98e2.json'
});

const image = '/Users/kennethcarroll/Developer/TheBrewJudge/BrewScanService/routes/test.jpg';

router.post('/image', (req, res, next) => {
    console.log('Begin Scan');
    const scan = async () => {
        const [result] = await client.textDetection(image).catch(err => console.error(err));
        const labels = result.textAnnotations;
        console.log('Texts: ');
        labels.forEach(label => console.log(label.description));
    }
    scan().then(res.sendStatus(200));
    
})

module.exports = router;