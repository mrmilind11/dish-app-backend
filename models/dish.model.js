const mongoose = require('mongoose');
const { Category } = require('./category.model');
const { User } = require('./user.model');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const DishSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true, unique: true, maxlength: 150 },
    description: { type: String, maxlength: 1500 },
    vegType: { type: String, enum: ['VEG', 'NON_VEG'], required: true },
    time: { type: String, required: true },
    timeUnit: { type: String, enum: ['MIN', 'HOUR'], required: true },
    difficulty: { type: String, enum: ['EASY', 'MODERATE', 'HARD', 'EXPERT'], required: true },
    ingredientsList: [{ name: { type: String, required: true }, quantity: { type: String, required: true } }],
    steps: [{ type: String }],
    imageUrl: { type: String },
    categories: [{ type: mongoose.Types.ObjectId, ref: Category }],
    createdBy: { type: mongoose.Types.ObjectId, ref: User }
})
const Dish = mongoose.model('dish', DishSchema, 'dish');

const validateNewDish = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().max(150),
        description: Joi.string().max(1500),
        vegType: Joi.string().valid('VEG', 'NON_VEG').required(),
        time: Joi.number().required(),
        timeUnit: Joi.string().valid('MIN', 'HOUR').required(),
        difficulty: Joi.strict().valid('EASY', 'MODERATE', 'HARD', 'EXPERT').required(),
        ingredientsList: Joi.array().items(Joi.object({
            name: Joi.string().required(), quantity: Joi.string().required()
        })),
        steps: Joi.array().items(Joi.string().required()),
        imageUrl: Joi.string(),
        categories: Joi.array().items(Joi.objectId()),
        createdBy: Joi.objectId()
    })
    return schema.validate(data);
}
module.exports.Dish = Dish;
module.exports.validateNewDish = validateNewDish;