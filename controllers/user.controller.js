const mongoose = require('mongoose');
const { User, validateLogin, validateSignUp } = require('../models/user.model');
const { ErrorHandler } = require('../startup/errorHandler');
const bcryptjs = require('bcryptjs');

const get_current_user = async (req, res, next) => {
    const userData = req.userData;
    if (userData) {
        res.send(userData);
    }
    else {
        return next(new ErrorHandler(403, 'Not logged in'));
    }
}
const get_all_users = async (req, res, next) => {
    const userList = await User.find().select({ '__v': 0 });
    res.send(userList);
};
const login_user = async (req, res, next) => {
    const loginData = req.body;
    const { error } = validateLogin(loginData);
    if (error) return next(new ErrorHandler(400, error.details[0].message));

    const user = await User.findOne({ 'email': loginData.email });
    if (!user) return next(new ErrorHandler(500, 'No matching user found'));
    try {
        const isValidPw = await bcryptjs.compare(loginData.password, user.password);
        if (!isValidPw) return next(new ErrorHandler(403, 'Invalid credentials'));
        const token = await user.generateAuthToken();
        res.send({ 'x-auth-token': token });
    }
    catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
};
const add_user = async (req, res, next) => {
    const signupData = req.body;
    const { error } = validateSignUp(signupData);
    if (error) return next(new ErrorHandler(400, error.details[0].message));

    const alreadyExistUser = await User.findOne({ 'email': signupData.email });
    if (alreadyExistUser) return next(new ErrorHandler(500, 'User already exists'));

    try {
        let userData = new User(signupData);
        userData._id = new mongoose.Types.ObjectId();
        const newUser = await userData.save();
        const token = await newUser.generateAuthToken();
        res.send({ 'x-auth-token': token });
    }
    catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
};

module.exports.get_current_user = get_current_user;
module.exports.add_user = add_user;
module.exports.login_user = login_user;
module.exports.get_all_users = get_all_users;