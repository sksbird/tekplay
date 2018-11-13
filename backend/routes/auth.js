'use strict'

const helpers = require('../helpers');
const Models = require('../models');
const Controllers = require('../controllers');

module.exports = (router) => {

    router.post('/authenticate', Controllers.Auth.authenticate);

}
