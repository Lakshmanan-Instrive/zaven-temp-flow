const {
    Schema,
} = require('mongoose');
const {
    dbConn,
} = require('../../system/db/mongo');

const countryCodeSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    status: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const CountryCode = dbConn.model('CountryCode', countryCodeSchema, 'countryCodes');

module.exports = CountryCode;