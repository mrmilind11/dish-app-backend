const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const categoryController = require('../controllers/category.controller');

router.get('/', auth, categoryController.get_categories_list);
router.get('/:id', auth, categoryController.get_category_from_id);
router.post('/', auth, categoryController.add_category);
router.put('/', auth, categoryController.update_category);
router.delete('/', auth, categoryController.remove_category);
module.exports = router;