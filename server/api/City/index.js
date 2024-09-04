const {
    Schema,
} = require('mongoose');
const {
    dbConn,
} = require('../../system/db/mongo');

const citySchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    aseanId: {
        type: Schema.Types.ObjectId,
        ref: 'Asean',
    },
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: '',
    },
    code: {
        type: String,
    },
    serial: {
        type: Number,
    },
    province: {
        type: String,
    },
    provinceId: {
        type: Schema.Types.ObjectId,
        ref: 'Province',
    },
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    status: {
        type: Number,
        required: true,
        default: 1,
    },
    'createdAt/$date': {
        type: String,
    },
    'updatedAt/$date': {
        type: String,
    },
    updatedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const City = dbConn.model('City', citySchema, 'cities');

module.exports = City;