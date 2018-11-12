const config = require('./options.config');
const basicStrategy = require('passport-http').BasicStrategy;
const model = require('../models');

module.exports.basic = function (passport) {
    
    passport.use(new basicStrategy((userid, password, done) => {      
    
        model.User.auth.findOne({ userKey: userid, userSecret: password }, function (err, result) {
            if (err) { return done(err); }
            if (!result) { return done(null, false); }
            return done(null, result);
          });
    }));
}