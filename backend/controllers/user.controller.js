'use strict'


const config = require('../config');
const db = require('../lib/db.initialize.lib');
let processor = require(`.././lib/${config.constants.LIBRARY_ACCESS}`);

let User = function () { }

module.exports = new User();

User.prototype.getUsers = (req, res) => {

    let input = {};
    input.select = '-password';
    input.query = { 'isDeleted': false };

    processor.get(db, config.constants.COLLECTION_USER, input).then(result => {
        res.status(result.statusCode).json({ response: true, count: result.data.length, data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, error: error.error });
    });

};

User.prototype.getUser = (req, res) => {

    let input = {};
    input.select = '-password';
    input.query = { '_id': req.value.params.id,  'isDeleted': false };

    processor.getOne(db, config.constants.COLLECTION_USER, input).then(result => {
        res.status(result.statusCode).json({ response: true, data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, error: error.error });
    });

};


User.prototype.addUser = (req, res) => {

    let input = {};
    input.query = req.value.body;

    processor.createWithPassword(db, config.constants.COLLECTION_USER, input).then(result => {
        res.status(result.statusCode).json({ response: true, message: 'User has been added', data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, message: 'Failed, try again', error: error.error });
    });
};

User.prototype.updateUser = (req, res) => {

    let input = {};
    input.query = { '_id': req.value.params.id };
    input.body = req.value.body;
    input.body.updateDate = Date.now();
    input.data = { $set: input.body },
    input.options = { new: true };

    processor.update(db, config.constants.COLLECTION_USER, input).then(result => {
        res.status(result.statusCode).json({ response: true, message: 'User has been updated', data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, message: 'Failed, try again', error: error.error });
    });
};

User.prototype.deleteUser = (req, res) => {

    let input = {};
    input.query = { '_id': req.value.params.id };
    input.data = {};
    input.data.isDeleted = true;
    input.data.deleteDate = Date.now();
    input.options = { new: true };

    processor.delete(db, config.constants.COLLECTION_USER, input).then(result => {
        res.status(result.statusCode).json({ response: true, message: 'User has been deleted' });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, message: 'Failed, try again', error: error.error });
    });

};