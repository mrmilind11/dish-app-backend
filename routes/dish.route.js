const express = require('express');
const route = express.Router();

const { get_dish_list, add_dish, update_dish, delete_dish } = require('../controllers/dish.controller');
const auth = require('../middleware/auth')
route.get('/', auth, get_dish_list);
route.post('/', auth, add_dish);
route.put('/', auth, update_dish);
route.delete('/', auth, delete_dish);