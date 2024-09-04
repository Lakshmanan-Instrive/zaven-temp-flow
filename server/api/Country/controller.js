const boom = require('@hapi/boom');
const Country = require('./index');
const utilsChecks = require('../../system/utils/checks');

const list = async() => {
    const result = await Country.aggregate(
        [
            {
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
            {
                $project: {
                    _id: 1,
                    name: 1,
                    code: 1,
                    dial_code: 1,
                    status: 1,
                },
            },
        ],
    );
    return result;
};

const getAllByParams = async() => {
    const getList = await list();
    if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
        throw boom.notFound('No Country Found');
    }
    const result = {
        message: 'Country Details',
        detail: getList,
    };
    return result;
};

module.exports = {
    getAllByParams,
};