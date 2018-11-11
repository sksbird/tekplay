const bcrypt = require('bcryptjs');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        firstname: { type: String, default: null,},
        lastname: { type: String, default: null },
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobileNumber: { type: String, default: null },
    password: { type: String, required: true },   
    userType: { type: String, enum:[], required: true },
    createBy: { type: Schema.Types.ObjectId, ref: config.constants.COLLECTION_USER, default: null },
    createDate: { type: Date, default: Date.now() }, 
    updateBy: { type: Schema.Types.ObjectId, ref: constants.COLLECTION_USER, default: null },
    updateDate: { type: Date, default: Date.now() }, 
    status: { type: Boolean, default: false },  
    deleteBy: { type: Schema.Types.ObjectId, ref: config.constants.COLLECTION_USER, default: null },
    deleteDate: { type: Date, default: null } 
});

module.exports.users = mongoose.model(config.constants.COLLECTION_USER, userSchema);