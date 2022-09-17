const { Schema } = require('mongoose');

const propertySchema = new Schema({

//CHANGE AS NEEDED!!!
    propertyId: { //propertyId?
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String, //??????
    },
    baths: {
        type: Number
    },
    beds: {
        type: Number
    },
    photo: {
        type: String
    },
    link: {
        type: String
    },
    sqft: { //size?
        type: String
    },
    lot_size: {
        type: String
    }

});

module.exports = propertySchema;