'user strict'

const config = require('../config');

const constants = {};

constants.TRUE = true;
constants.FALSE = false;
constants.COLLECTION_USER = `${config.options.tablePrefix}_users`;
constants.COLLECTION_COMPLAINT = `${config.options.tablePrefix}_compalints`;

module.exports = constants;


