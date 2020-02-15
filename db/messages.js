const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object().keys({
    username: Joi.string(),
    subject: Joi.string(),
    message: Joi.string(),
    imageURL: Joi.string()
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {
    if (!message.username) message.username = 'Anonymous';

    const result = Joi.validate(message, schema);
    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
};

module.exports = {
    create,
    getAll
};
