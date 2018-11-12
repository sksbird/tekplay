'use strict'

const joi = require('joi');

module.exports.validateParams = (schema, field) => {

    return (req, res, next) => {
        const result = joi.validate({ param: req['params'][field] }, schema);
       
        if (result.error) {
            return res.status(400).json({ response: false, message: result.error.message });
        } else {
            if (!req.value) {
                req.value = {};
            }
            if (!req.value['params']) {
                req.value['params'] = {};
            }
            req.value['params'][field] = result.value.param;
            return next();
        }
    }
};

module.exports.validateBody = (schema) => {
    
    return (req, res, next) => {
        const result = joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).json({ response: false, message: result.error.message });
        } else {
            if (!req.value) {
                req.value = {};
            }
            if (!req.value['body']) {
                req.value['body'] = {};
            }
            req.value['body'] = result.value;
            return next();
        }
    }
};

module.exports.validateUnique = (model, field, params = false) => {

    return (req, res, next) => {
       
        let data = req['body'][field] || req['params'][params];
        let query = { [field]: data };

        if (typeof (data) === 'undefined' || data.length === 0) {
            return next();
        }      

        model.findOne(query).where('isDeleted').equals(false).exec().then(result => {
            if (result) {
                return res.status(200).json({ response: false, message: `${field} already exists` });
            } else {
                return next();
            }
        }).catch(error => {
            return res.status(500).json({ response: false, message: error.message });
        });
    }
};

module.exports.validateIdAvailability = (model, field) => {

    return (req, res, next) => {
        
        let id = req['params'][field] || req['body'][field];
        let query = { '_id': id, 'isDeleted': false }

        model.findOne(query).exec().then(result => {
            if (result) {
                return next();
            } else {
                return res.status(200).json({ response: false, message: `${field} has not been found to perform ${req.method.toLowerCase()} request` });
            }
        }).catch(error => {
            return res.status(500).json({ response: false, message: error.message });
        });
    }
}

