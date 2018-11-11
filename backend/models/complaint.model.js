const bcrypt = require('bcryptjs');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    
});

module.exports.complaints = mongoose.model(config.constants.COLLECTION_COMPLAINT, complaintSchema);