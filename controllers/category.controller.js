const mongoose = require('mongoose');
const get_categories_list = (req, res, next) => {
    res.send('Hi I am milind')
}
const get_category_from_id = (req, res, next) => {
    next();
}

const add_category = (req, res, next) => {

}

const remove_category = (req, res, next) => {

}

const update_category = (req, res, next) => {

}

module.exports = { get_categories_list, get_category_from_id, add_category, remove_category, update_category }