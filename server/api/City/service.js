const mongoose = require('mongoose');
const City = require('./index');

const { ObjectId } = mongoose.Types;

const create = async(params) => {
    const newCity = await City.create(params);
    return newCity;
};

const cityByAsean = async(params) => {
    const result = await City.aggregate(
        [{
            $match: {
                asean: {
                    $eq: params.asean,
                },
                status: {
                    $eq: 1,
                },
            },
        },
        {
            $sort: {
                serial: 1,
            },
        },
        {
            $project: {
                _id: 1,
                asean: 1,
                name: 1,
                type: 1,
                serial: 1,
                status: 1,
            },
        },
        ],
    );
    return result;
};

const cityByAseanId = async(params) => {
    const result = await City.aggregate(
        [{
            $match: {
                aseanId: {
                    $eq: ObjectId(params.aseanId.toString()),
                },
                status: {
                    $eq: 1,
                },
            },
        },
        {
            $sort: {
                serial: 1,
            },
        },
        {
            $project: {
                _id: 1,
                asean: 1,
                name: 1,
                type: 1,
                serial: 1,
                status: 1,
            },
        },
        ],
    );
    return result;
};

const cityByAseanIds = async(params) => {
    const result = await City.aggregate(
        [{
            $match: {
                aseanId: {
                    $in: params.aseanIds,
                },
                status: {
                    $eq: 1,
                },
            },
        },
        {
            $sort: {
                serial: 1,
            },
        },
        {
            $project: {
                _id: 1,
                asean: 1,
                name: 1,
                type: 1,
                serial: 1,
                status: 1,
            },
        },
        ],
    );
    return result;
};

const cityByAseanIdAndType = async(params) => {
    const result = await City.aggregate(
        [{
            $match: {
                aseanId: {
                    $eq: ObjectId(params.aseanId.toString()),
                },
                type: {
                    $eq: params.type,
                },
                status: {
                    $eq: 1,
                },
            },
        },
        {
            $sort: {
                serial: 1,
            },
        },
        {
            $project: {
                _id: 1,
                asean: 1,
                name: 1,
                type: 1,
                serial: 1,
                status: 1,
            },
        },
        ],
    );
    return result;
};

const list = async() => {
    const result = await City.aggregate(
        [{
            $match: {
                status: {
                    $eq: 1,
                },
            },
        },
        {
            $sort: {
                name: 1,
            },
        },
        ],
    );
    return result;
};

module.exports = {
    create,
    cityByAsean,
    cityByAseanId,
    cityByAseanIds,
    cityByAseanIdAndType,
    list,
};