'use strict'

const btoa = require('btoa');
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

    processor.getOne(db, config.constants.COLLECTION_USER, input).then(user => {

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
            item.query = { active: true };

            processor.getOne(db, config.constants.COLLECTION_AUTH, item).then(result => {

                if (!result.data) {
                    return res.json({ response: false, message: 'Token not found' }).end();
                }

                let data = {};
                data.authorization = "Basic " + btoa(result.data.userKey + ":" + result.data.userSecret);
                data.user = {};
                data.user.id =  user.data._id;
                data.user.name =  user.data.name;
                data.user.type = user.data.userType;
                data.user.email =  user.data.email;
                data.user.mobileNumber =  user.data.mobileNumber;

                return res.json({ response: true, data: data }).end();

            }).catch(err => {
                return res.json({ response: false, message: err.error }).end();
            });            
        });

    }).catch(error => {
        return res.json({ response: false, message: error.error }).end();
    });

};


Auth.prototype.generateApi = (req, res) => {

}