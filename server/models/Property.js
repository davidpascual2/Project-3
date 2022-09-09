const { Schema } = require('mongoose');

const propertySchema = new Schema({

    city: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String, //??????

    },
    propertyId: {
        type: String,
    },
    bed: {
        type: String
    },
    bath: {
        type: String
    },
    lot: {
        type: String
    },
    sqft: { //size?
        type: String
    },
    year: {
        type: String
    }

});

module.exports = propertySchema;