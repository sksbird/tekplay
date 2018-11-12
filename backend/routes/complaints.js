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

    router.get('/', Controllers.Complaint.getComplaints);

    router.get('/:id',
        [
            helpers.validations.validateParams(helpers.schemas.idSchema, 'id')
        ],
        Controllers.Complaint.getComplaint
    );

    router.post('/new',
        [
            helpers.validations.validateBody(helpers.schemas.complaintInsert)
        ],
        Controllers.Complaint.addComplaint
    );

    router.put('/edit/:id',
        [
            helpers.validations.validateParams(helpers.schemas.idSchema, 'id'),            
            helpers.validations.validateIdAvailability(Models.Complaint.complaints, 'id'),
            helpers.validations.validateBody(helpers.schemas.complaintUpdate)
        ],
        Controllers.Complaint.updateComplaint
    );

    router.delete('/delete/:id',
        [
            helpers.validations.validateParams(helpers.schemas.idSchema, 'id'),
            helpers.validations.validateIdAvailability(Models.Complaint.complaints, 'id')
        ],
        Controllers.Complaint.deleteComplaint
    );

}
