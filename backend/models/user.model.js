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
    userType: { type: String, enum:['customer', 'agent'], default: 'customer' },
    createDate: { type: Date, default: Date.now() }, 
    updateDate: { type: Date, default: Date.now() }, 
    isDeleted: { type: Boolean, default: false },  
    deleteDate: { type: Date, default: null } 
});

const authSchema = new Schema({
    userEmail: { type: String, required: true, unique: true, lowercase: true },
    userKey: { type: String, required: true, unique: true },
    userSecret: { type: String, required: true },
    active: { type: Boolean, default: true },
    createDate: { type: Date, default: Date.now() }, 
});

const auth = mongoose.model(config.constants.COLLECTION_AUTH, authSchema);
module.exports.users = mongoose.model(config.constants.COLLECTION_USER, userSchema);
module.exports.auth = auth;

defaultAuth();

function defaultAuth() {

    auth.findOne({ userEmail: config.options.defaultAuth.email, userKey: config.options.defaultAuth.key }).exec().then(result => {
        if (!result) {
            const item = new auth({
                userEmail: config.options.defaultAuth.email,
                userKey: config.options.defaultAuth.key,
                userSecret: config.options.defaultAuth.secret,
            });
            item.save() .then(result => {
            }).catch(error => {
                throw new Error(error.message);
            });
        }   
    }).catch(error => {
        throw new Error(error.message);
    });
};