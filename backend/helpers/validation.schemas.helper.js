'use strict'

const joi = require('joi');
const config = require('../config');


module.exports = {

    idSchema: joi.object().keys({
        param: joi.string().trim().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be valid objectID in parameters'))
    }),
    
    userInsert: joi.object().keys({
        name: joi.string().trim().allow(null).error(new Error('name is missing or invalid')),
        email: joi.string().trim().email().required().error(new Error('email is missing or invalid')),
        password: joi.string().min(3).max(50).required().error(new Error('password is require and should be min 3 and max 50 character is long')),     
        userType: joi.string().valid(['customer', 'agent']).default('customer').error(new Error('userType is should be customer or agent')),
        mobileNumber: joi.string().trim().min(10).max(10).required().error(new Error('mobileNumber should be valid mobile number')),
    }),

    userUpdate: joi.object().keys({
        name: joi.string().trim().allow(null).error(new Error('name is missing or invalid')),
        email: joi.string().trim().email().allow(null).error(new Error('email is missing or invalid')),    
        userType: joi.string().valid(['customer', 'agent']).default('customer').allow(null).error(new Error('userType is should be customer or agent')),
        mobileNumber: joi.string().trim().min(10).max(10).allow(null).error(new Error('mobileNumber should be valid mobile number')),
    }),

    complaintInsert: joi.object().keys({
        user: joi.string().trim().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('user should be valid objectID')),
        heading: joi.string().trim().required().error(new Error('heading is missing or invalid')),
        description: joi.string().trim().allow(null).required().error(new Error('description is missing or invalid'))
    }),

    complaintUpdate: joi.object().keys({
        heading: joi.string().trim().allow(null).error(new Error('heading is missing or invalid')),
        description: joi.string().trim().allow(null).required().error(new Error('description is missing or invalid'))
    }),   

};
