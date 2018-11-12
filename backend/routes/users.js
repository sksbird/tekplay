'use strict'

const helpers = require('../helpers');
const Models = require('../models');
const Controllers = require('../controllers');

module.exports = (router, passport) => {

    router.use((req, res, next) => {

        passport.authenticate('basic', { session: false }, (err, result) => {

            if (err) { return res.json({ error: err || 'Invalid Token' }).end() }

            if (!result) { return res.json({ error: err || 'Invalid Token' }).end() }

            if (!req.user) {
                req.user = {};
            }

            req.user = result;
            return next();

        })(req, res, next);
    });

    router.get('/', Controllers.User.getUsers);

    router.get('/:id',
        [
            helpers.validations.validateParams(helpers.schemas.idSchema, 'id')
        ],
        Controllers.User.getUser
    );

    router.post('/new',
        [
            helpers.validations.validateBody(helpers.schemas.userInsert),
            helpers.validations.validateUnique(Models.User.users, 'email'),
        ],
        Controllers.User.addUser
    );

    router.put('/edit/:id',
        [
            helpers.validations.validateParams(helpers.schemas.idSchema, 'id'),
            helpers.validations.validateIdAvailability(Models.User.users, 'id'),
            helpers.validations.validateBody(helpers.schemas.userUpdate)            
        ],
        Controllers.User.updateUser
    );

    router.delete('/delete/:id',
        [
            helpers.validations.validateParams(helpers.schemas.idSchema, 'id'),
            helpers.validations.validateIdAvailability(Models.User.users, 'id')
        ],
        Controllers.User.deleteUser
    );

}
