const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const categoryController = require('../controllers/category.controller');

router.get('/', auth, categoryController.get_categories_list);
router.get('/:id', categoryController.get_category_from_id);
router.post('/', categoryController.add_category);
router.put('/', categoryController.update_category);
router.delete('/', categoryController.remove_category);
module.exports = router;