'use strict'


const config = require('../config');
const db = require('../lib/db.initialize.lib');
let processor = require(`.././lib/${config.constants.LIBRARY_ACCESS}`);

let Complaint = function () { }

module.exports = new Complaint();

Complaint.prototype.getComplaints = (req, res) => {

    let input = {};
    input.select = null;
    input.query = { 'is_deleted': false };

    processor.get(db, config.constants.COLLECTION_COMPLAINT, input).then(result => {
        res.status(result.statusCode).json({ response: true, count: result.data.length, data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, error: error.error });
    });

};

Complaint.prototype.getComplaint = (req, res) => {

    let input = {};
    input.select = null;
    input.query = { '_id': req.value.params.id,  'is_deleted': false };

    processor.getOne(db, config.constants.COLLECTION_COMPLAINT, input).then(result => {
        res.status(result.statusCode).json({ response: true, data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, error: error.error });
    });

};


Complaint.prototype.addComplaint = (req, res) => {

    let input = {};
    input.query = req.value.body;

    processor.create(db, config.constants.COLLECTION_COMPLAINT, input).then(result => {
        res.status(result.statusCode).json({ response: true, message: 'Complaint has been added', data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, message: 'Failed, try again', error: error.error });
    });
};

Complaint.prototype.updateComplaint = (req, res) => {

    let input = {};
    input.query = { '_id': req.value.params.id };
    input.body = req.value.body;
    input.body.updateDate = Date.now();
    input.data = { $set: input.body },
    input.options = { new: true };

    processor.update(db, config.constants.COLLECTION_COMPLAINT, input).then(result => {
        res.status(result.statusCode).json({ response: true, message: 'Complaint has been updated', data: result.data });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, message: 'Failed, try again', error: error.error });
    });
};

Complaint.prototype.deleteComplaint = (req, res) => {

    let input = {};
    input.query = { '_id': req.value.params.id };
    input.data = {};
    input.data.isDeleted = true;
    input.data.deleteDate = Date.now();
    input.options = { new: true };

    processor.delete(db, config.constants.COLLECTION_COMPLAINT, input).then(result => {
        res.status(result.statusCode).json({ response: true, message: 'Complaint has been deleted' });
    }).catch(error => {
        res.status(error.statusCode).json({ response: false, message: 'Failed, try again', error: error.error });
    });

};