const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const service = require('./service');
const utilsChecks = require('../../system/utils/checks');

const { ObjectId } = mongoose.Types;

const create = async (params) => {
    const add = await service.create(params);
    if (!add._id) {
        throw boom.badRequest('Something went wrong. Please try again.');
    }
    const result = {
        message: 'City Details',
        detail: add,
    };
    return result;
};

const cityByAsean = async (params) => {
    const list = await service.cityByAsean(params);
    if (!utilsChecks.isArray(list) || utilsChecks.isEmptyArray(list)) {
        throw boom.notFound('No City Found');
    }
    const result = {
        message: 'City Details',
        detail: list,
    };
    return result;
};

const cityByAseanId = async(params) => {
    const list = await service.cityByAseanId(params);
    if (!utilsChecks.isArray(list) || utilsChecks.isEmptyArray(list)) {
        throw boom.notFound('No City Found');
    }
    const result = {
        message: 'City Details',
        detail: list,
    };
    return result;
};

const cityByAseanIds = async(params) => {
    params.aseanIds = JSON.parse(params.aseanIds);
    const aseanIdsObjArray = [];
    if (params.aseanIds.length > 0) {
        params.aseanIds.forEach((val, key) => {
            aseanIdsObjArray[key] = ObjectId(val.toString());
        });
    }
    params.aseanIds = aseanIdsObjArray;
    const list = await service.cityByAseanIds(params);
    if (!utilsChecks.isArray(list) || utilsChecks.isEmptyArray(list)) {
        throw boom.notFound('No City Found');
    }
    const result = {
        message: 'City Details',
        detail: list,
    };
    return result;
};

const cityByAseanIdAndType = async(params) => {
    const list = await service.cityByAseanIdAndType(params);
    if (!utilsChecks.isArray(list) || utilsChecks.isEmptyArray(list)) {
        throw boom.notFound('No City Found');
    }
    const result = {
        message: 'City Details',
        detail: list,
    };
    return result;
};

const getAllByParams = async() => {
    const getList = await service.list();
    if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
        throw boom.notFound('No City Found');
    }
    const result = {
        message: 'City Details',
        detail: getList,
    };
    return result;
};

module.exports = {
    create,
    cityByAsean,
    cityByAseanId,
    cityByAseanIds,
    cityByAseanIdAndType,
    getAllByParams,
};