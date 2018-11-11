'use strict'

const joi = require('joi');
const config = require('../config');


module.exports = {

    idSchema: joi.object().keys({
        param: joi.number().integer.min(1).required().error(new Error('ID is missing or invalid in parameters'))
    }),
    
    employeeInsert: joi.object().keys({
        name: joi.string().trim().allow(null).error(new Error('name is missing or invalid')),
        email: joi.string().trim().email().required().error(new Error('email is missing or invalid')),
        password: joi.string().min(3).max(50).required().error(new Error('password is require and should be min 3 and max 50 character is long')),     
        type: joi.string().valid(['customer', 'agent']).default('customer').error(new Error('type is should be customer or agent')),
        mobile_number: joi.string().trim().error(new Error('mobile_number should be valid mobile number')),
    })
   
};
