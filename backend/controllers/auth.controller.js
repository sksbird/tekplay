'use strict'

const hat = require('hat');
const bcrypt = require('bcryptjs');
const config = require('../config')
let db = require('../lib/db.initialize.lib');

let processor = require(`.././lib/${config.constants.LIBRARY_ACCESS}`);

let Auth = function () { }
module.exports = new Auth();


Auth.prototype.authenticate = (req, res) => {

    let input = {};
    input.select = null;
    input.query = { $or: [{ 'email': req.body.email, isDeleted: false }, { 'mobileNumber': req.body.mobileNumber, isDeleted: false }] };

    processor.getOne(db, constants.COLLECTION_USER, input).then(user => {

        if (user.data.length === 0) {
            return res.json({ response: false, message: 'User not found' }).end();
        }

        bcrypt.compare(req.body.password, user.data.password, (err, isMatch) => {

            if (err) {
                return res.json({ response: false, error: error }).end();
            }

            if (!isMatch) {
                return res.json({ response: false, message: 'Invalid password' }).end();
            }

            let item = {};
            item.select = null;
            item.query = { $or: [{ 'email': user.data.email }, { 'email': config.options.defaultAuth.email }] };

            processor.getOne(db, constants.COLLECTION_EMPLOYEE, input).then(result => {

                if (result.data.length === 0) {
                    return res.json({ response: false, message: 'Token not found' }).end();
                }

                let data = {};
                data.authorization = "Basic " + btoa(result.data.userKey + ":" + result.data.userSecret);
                data.user = {};
                data.user.id =  user.data._id;
                data.user.name =  user.data.name;
                data.user.email =  user.data.email;
                data.user.mobileNumber =  user.data.mobileNumber;

                return res.json({ response: true, data: data }).end();

            }).catch(err => {
                return res.json({ response: false, message: err.message }).end();
            });            
        });

    }).catch(error => {
        return res.json({ response: false, message: error.message }).end();
    });

};


Auth.prototype.generateApi = (req, res) => {

    let token = hat.rack();
    let input = {};
    input.query = { _id: req.headers.userid };
    input.body = {};
    input.body.user = req.user._id
    input.body.email = req.headers.email;
    input.body.apikey = token();
    input.body.tokenExpired = req.headers.token_expired;
    input.body.createDate = Date.now()
    input.data = { $set: input.body };
    input.options = { upsert: true, new: true, setDefaultsOnInsert: true };

    processor.update(db, constants.COLLECTION_API_KEYS, input).then(result => {
        res.status(result.statusCode).json({ response: true, message: 'API keys has been generated', data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, message: 'Failed, try again', error: error.error });
    });
}