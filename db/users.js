const Joi = require('joi');
const db = require('./connection');
const md5 = require("md5");

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    salt: Joi.string().required(),
    imageURL: Joi.string().uri()
});

const users = db.get('users');

function getAll() {
    return users.find();
}

function create(user) {
    console.log(user);

    if(user.password !== user.confirm_password){
        return Promise.reject("Passwords do not match", );
    }

    let salt = new Date().getTime();

    user.password = md5(`${user.confirm_password}${salt}`);
    user.salt = salt;

    return users.insert(user);

}

function login(request){

    return users.findOne({
        username: request.username
    }).then(response => {
        let reqHash = md5(`${request.password}${response.salt}`);
        if (reqHash === response.password){
            return response;
        }
        return Promise.reject();
    }).catch(function () {
        return Promise.reject();
    });
}

module.exports = {
    create,
    getAll,
    login
};
