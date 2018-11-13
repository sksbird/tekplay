'user strict'

const options = require('./options.config');

const constants = {};

constants.TRUE = true;
constants.FALSE = false;

constants.LIBRARY_ACCESS = 'db.access.lib.js';

constants.COLLECTION_AUTH = `${options.tablePrefix}_auth`;
constants.COLLECTION_USER = `${options.tablePrefix}_users`;
constants.COLLECTION_COMPLAINT = `${options.tablePrefix}_complaints`;
constants.COLLECTION_COMPLAINT_COMMENT = `${options.tablePrefix}_complaints_comments`;

module.exports = constants;


