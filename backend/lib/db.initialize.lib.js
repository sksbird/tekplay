'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
const constants = require('../config/constant');

const dbUri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST_NAME}:${process.env.HOST_PORT}/${process.env.DB_NAME}`;
const dbOptions = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0, // If not connected, return errors immediately rather than waiting for reconnect
    useNewUrlParser: true 
}

// Database Connectivity
mongoose.Promise = global.Promise;
mongoose.connect(dbUri, dbOptions).then(() => console.log('Connected to database')).catch((err) => console.log(`Database error: ${err}`));

const db = {};
const models = require('../models');

db[constants.COLLECTION_USER] = models.User.users;
db[constants.COLLECTION_COMPLAINT] = models.Complaint.complaints;

module.exports = db;

