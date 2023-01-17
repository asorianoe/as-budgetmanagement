const express = require('express');
const router = express.Router();
const { getAccounts} = require('../controller/AccountController');



router.get('/account', getAccounts);

module.exports = router;