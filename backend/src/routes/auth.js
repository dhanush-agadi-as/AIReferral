const express = require('express');
const { register, login, refreshToken } = require('../controllers/authController');
const { validateRegister } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', login);
router.post('/refresh', refreshToken);

module.exports = router;
