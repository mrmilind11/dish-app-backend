const express = require('express');
const router = express.Router();

const { get_all_users, login_user, add_user } = require('../controllers/user.controller');

router.get('/all', get_all_users);
router.post('/signup', add_user);
router.post('/login', login_user);

module.exports = router;