'user strict'

const config = require('../config');
const bcrypt = require('bcryptjs');

let Library = function () { };
module.exports = new Library();


Library.prototype.get = async (db, collection, input) => {

    try {
        const result = await db[collection].find(input.query).select(input.select).exec();
        if (!result) {
            return Promise.reject({ statusCode: 404 });
        } else {
            return Promise.resolve({ statusCode: 200, data: result });
        }
    } catch (e) {
        return Promise.reject({ statusCode: 500, error: e.message });
    }
};


Library.prototype.getPopulate = async (db, collection, input) => {

    try {
        const result = await db[collection].find(input.query).select(input.select).populate(input.populate).exec();
        if (!result) {
            return Promise.reject({ statusCode: 404 });
        } else {
            return Promise.resolve({ statusCode: 200, data: result });
        }
    } catch (e) {
        return Promise.reject({ statusCode: 500, error: e.message });
    }
};


Library.prototype.getOne = async (db, collection, input) => {

    try {
        const result = await db[collection].findOne(input.query).select(input.select).exec();
        if (!result) {
            return Promise.reject({ statusCode: 404, error: 'Not Found' });
        } else {
            return Promise.resolve({ statusCode: 200, data: result });
        }
    } catch (e) {
        return Promise.reject({ statusCode: 500, error: e.message });
    }

};


Library.prototype.getOnePopulate = async (db, collection, input) => {

    try {
        const result = await db[collection].findOne(input.query).select(input.select).populate(input.populate).exec();
        if (!result) {
            return Promise.reject({ statusCode: 404 });
        } else {
            return Promise.resolve({ statusCode: 200, data: result });
        }
    } catch (e) {
        return Promise.reject({ statusCode: 500, error: e.message });
    }

};


Library.prototype.create = (db, collection, input) => {

    let item = new db[collection](input.query);

    return item.save().then(result => {
        return Promise.resolve({ statusCode: 200, data: result });
    }).catch(error => {
        return Promise.reject({ statusCode: 500, error: error.message });
    });
};


Library.prototype.createWithPassword = (db, collection, input) => {

    let item = new db[collection](input.query);

    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject({ statusCode: 500, error: err });
            }
            bcrypt.hash(item.password, salt, (err, hash) => {
                if (err) {
                    reject({ statusCode: 500, error: err });
                }
                item.password = hash;
                item.save()
                    .then(result => {
                        return resolve({ statusCode: 200, data: result });
                    })
                    .catch(error => {
                        return reject({ statusCode: 500, error: error.message });
                    });
            });
        });
    });
};


Library.prototype.update = async (db, collection, input) => {

    let preValues = await db[collection].findOne(input.query).exec();

    return db[collection].findOneAndUpdate(input.query, input.data, input.options).then(result => {
        return Promise.resolve({ statusCode: 200, data: result });
    }).catch(error => {
        return Promise.reject({ statusCode: 500, error: error.message });
    });
};


Library.prototype.delete = async (db, collection, input) => {

    let preValues = await db[collection].findOne(input.query).exec();

    return db[collection].findOneAndUpdate(input.query, { $set: input.data }).then(result => {
        return Promise.resolve({ statusCode: 200, data: result });
    }).catch(error => {
        return Promise.reject({ statusCode: 500, error: error.message });
    });
};

