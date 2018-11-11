'use strict'

module.exports.isLogin = () => {
    return (req, res, next) => {
        return next();
    }
}

