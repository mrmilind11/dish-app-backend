const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, unique: true, required: true, trim: true, unique: true },
    description: { type: String, maxlength: 300, trim: true },
    imageUrl: { type: String, trim: true, default: '' },
    dishCount: { type: Number, default: 0 }
})

validateNewCategory = function (data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).trim().required(),
        description: Joi.string().min(1).max(250).allow(''),
        imageUrl: Joi.string().max(500).allow(''),
        dishCount: Joi.number().min(0).max(10000)
    })
    return schema.validate(data);
}
validateUpdateCategory = function (data) {
    const schema = Joi.object({
        _id: Joi.objectId().required(),
        // _id: Joi.string().required(),
        name: Joi.string().min(3).max(50).trim().required(),
        description: Joi.string().min(1).max(250).allow(''),
        imageUrl: Joi.string().max(500).allow(''),
        dishCount: Joi.number().min(0).max(10000)
    })
    return schema.validate(data);
}
const Category = mongoose.model('category', categorySchema, 'category');

module.exports.Category = Category;
module.exports.validateNewCategory = validateNewCategory;
module.exports.validateUpdateCategory = validateUpdateCategory;