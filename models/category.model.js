const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { Dish } = require('./dish.model');
const { User } = require('./user.model');
const categorySchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, unique: true, required: true, trim: true, unique: true },
    description: { type: String, maxlength: 300, trim: true },
    imageUrl: { type: String, trim: true, default: '' },
    dishIdList: [{ type: mongoose.Types.ObjectId, ref: 'Dish' }],
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' }
})

validateNewCategory = function (data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).trim().required(),
        description: Joi.string().min(1).max(250).allow(''),
        imageUrl: Joi.string().max(500).allow(''),
        dishIdList: Joi.array(Joi.objectId()),
        createdBy: Joi.objectId()
    })
    return schema.validate(data);
}
validateUpdateCategory = function (data) {
    const schema = Joi.object({
        _id: Joi.objectId().required(),
        name: Joi.string().min(3).max(50).trim().required(),
        description: Joi.string().min(1).max(250).allow(''),
        imageUrl: Joi.string().max(500).allow(''),
        dishIdList: Joi.array(Joi.objectId()),
        createdBy: Joi.objectId()
    })
    return schema.validate(data);
}
const Category = mongoose.model('category', categorySchema, 'category');

module.exports.Category = Category;
module.exports.validateNewCategory = validateNewCategory;
module.exports.validateUpdateCategory = validateUpdateCategory;