const mongoose = require('mongoose');
const { Category } = require('../models/category.model');
const get_categories_list = (req, res, next) => {
    res.send('Hi I am milind')
}
const get_category_from_id = (req, res, next) => {
    next();
}

const add_category = async (req, res, next) => {
    let newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.send(savedCategory);
    }
    catch (error) {
        res.status(500).send(error);
        throw new Error(error);
    }
}

const remove_category = (req, res, next) => {

}

const update_category = (req, res, next) => {

}

module.exports = { get_categories_list, get_category_from_id, add_category, remove_category, update_category }