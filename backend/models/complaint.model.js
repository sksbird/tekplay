const bcrypt = require('bcryptjs');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: config.constants.COLLECTION_USER, required: true },
    heading: { type: String, required: true },
    description: { type: String, default: null },
    status: { type: String, enum:['pending', 'approved', 'rejected'], default: 'pending' },
    createDate: { type: Date, default: Date.now() }, 
    updateDate: { type: Date, default: Date.now() }, 
    isDeleted: { type: Boolean, default: false },  
    deleteDate: { type: Date, default: null } 
});

const complaintCommentSchema = new Schema({
    complaint: { type: Schema.Types.ObjectId, ref: config.constants.COLLECTION_COMPLAINT, required: true },
    comment: { type: String, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: config.constants.COLLECTION_USER, required: true },
    createDate: { type: Date, default: Date.now() }
});

module.exports.complaints = mongoose.model(config.constants.COLLECTION_COMPLAINT, complaintSchema);
module.exports.comments = mongoose.model(config.constants.COLLECTION_COMPLAINT_COMMENT, complaintCommentSchema);