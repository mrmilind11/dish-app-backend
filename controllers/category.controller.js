const mongoose = require('mongoose');
const { ErrorHandler } = require('../startup/errorHandler');
const { Category, validateNewCategory, validateUpdateCategory } = require('../models/category.model');
const get_categories_list = async (req, res, next) => {
    try {
        const categoryList = await Category.find().select('-__v')
        res.send(categoryList);
    }
    catch (error) {
        return next(new ErrorHandler(500, error));
    }
}
const get_category_from_id = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(new ErrorHandler(400, 'Not a valid id'));
    try {
        const category = await Category.findById(id).select('-__v')
        console.log('category', category)
        if (!category) return next(new ErrorHandler(500, 'No category with given id found'))
        res.send(category);
    }
    catch (error) {
        return next(new ErrorHandler(500, error));
    }
}

const add_category = async (req, res, next) => {
    let newCatData = req.body;
    const { error } = validateNewCategory(newCatData);
    if (error) return next(new ErrorHandler(400, error.details[0].message));
    let newCategory = new Category(newCatData);
    newCategory._id = new mongoose.Types.ObjectId();
    try {
        let savedCategory = await newCategory.save();
        delete savedCategory['__v'];
        res.send(savedCategory);
    }
    catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
}

const remove_category = async (req, res, next) => {
    let id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(new ErrorHandler(400, 'Not a valid id'));
    try {
        const deletedCat = await Category.findByIdAndDelete(id).select('-__v');
        res.send(deletedCat);
    }
    catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
}

const update_category = async (req, res, next) => {
    let catData = req.body;
    const { error } = validateUpdateCategory(catData);
    if (error) return next(new ErrorHandler(400, error.details[0].message));
    try {
        const updatedCategory = await Category.findByIdAndUpdate(catData._id, { $set: catData }, { new: true }).select('-__v');
        if (updatedCategory) {
            res.send(updatedCategory)
        }
        else {
            return next(new ErrorHandler(500, 'Could not find category with same id'));
        }

    }
    catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
}

module.exports = { get_categories_list, get_category_from_id, add_category, remove_category, update_category }