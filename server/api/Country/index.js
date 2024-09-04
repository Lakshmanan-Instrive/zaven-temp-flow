const {
    Schema,
} = require('mongoose');
const {
    dbConn,
} = require('../../system/db/mongo');

const countrySchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    status: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    dial_code: {
        type: Number,
    },
}, {
    timestamps: true,
});

const Country = dbConn.model('Country', countrySchema, 'countries');

module.exports = Country;