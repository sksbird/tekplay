const bcrypt = require('bcryptjs');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: config.constants.COLLECTION_USER, required: true },
    heading: { type: String, required: true },
    description: { type: String, default: null },
    createDate: { type: Date, default: Date.now() }, 
    updateDate: { type: Date, default: Date.now() }, 
    isDeleted: { type: Boolean, default: false },  
    deleteDate: { type: Date, default: null } 
});

module.exports.complaints = mongoose.model(config.constants.COLLECTION_COMPLAINT, complaintSchema);