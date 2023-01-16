const express = require('express');
const router = express.Router();
const { registerPerson, loginPerson } = require('../controller/UserController');

router.post('/register', registerPerson);
router.post('/login', loginPerson);

module.exports = router;