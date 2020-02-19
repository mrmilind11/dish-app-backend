const mongoose = require('mongoose');
const Joi = require('joi');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, min: 3, max: 30, trim: true },
    password: { type: String, required: true, min: 5, max: 1024 }
})
UserSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password.trim(), salt);
})
UserSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ 'email': this.email, 'name': this.name, '_id': this._id }, process.env.jwtKey, { expiresIn: "10h" });
    return token;
}
UserSchema.methods.getPublicData = function () {
    return { 'name': this.name, 'email': this.email, '_id': this._id };
}
const User = mongoose.model('users', UserSchema, 'users');

const validateSignUp = function (data) {
    const schema = Joi.object({
        email: Joi.string().required().trim(),
        password: Joi.string().required().min(5),
        name: Joi.string().required(true).min(5).max(30)
    })
    return schema.validate(data);
}
const validateLogin = function (data) {
    const schema = Joi.object({
        email: Joi.string().required().trim(),
        password: Joi.string().required().min(5)
    })
    return schema.validate(data);
}
module.exports.User = User;
module.exports.validateSignUp = validateSignUp;
module.exports.validateLogin = validateLogin;