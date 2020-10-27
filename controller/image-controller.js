const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const Image = require('../models/image-schema');

const handleNewImage = (req, res, next) => {
    console.log('Begin Scan');

    const decodeBase64 = async (base64Data) => {
        const imageBuffer = {
            type: 'image/jpeg',
            data: new Buffer.from(base64Data, 'base64')
        }
        await scan(imageBuffer.data)
            .then((text) => {
                const image = new Image({
                    base64: req.body.image.base64,
                    googleVisionResult: text,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    dateCreated: new Date()
                });
                image.save();
                res.json({text: text}).sendStatus(200);
            })
            .catch(err => console.error(err));
    }

    const scan = async (image) => {
        console.log('Image: ');
        console.log(image)
        const [result] = await client.textDetection(image).catch(err => console.error(err));
        console.log('Texts: ');

        // result.textAnnotations[0] contains the entire detection, new lines delimited by \n
        // results.textAnnotations[1 -> n-1] are each word
        console.log(result.textAnnotations[0].description);
        return result.textAnnotations[0].description;
        //labels.forEach(label => console.log(label.description));
    }
    //scan().then(res.sendStatus(200));

    //image in base 64 is always jpg when coming from expo camera module
    decodeBase64(req.body.image.base64);
};

module.exports = {
    handleNewImage
}