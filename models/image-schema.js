const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    base64: String,
    googleVisionResult: String,
    latitude: Number,
    longitude: Number, 
    dateCreated: Date
});

module.exports = mongoose.model('Image', imageSchema);