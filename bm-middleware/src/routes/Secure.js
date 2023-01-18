const express = require('express');
const router = express.Router();
const { getAccounts} = require('../controller/AccountController');
const { infoPerson} = require('../controller/UserController');


router.get('/person_info', infoPerson);
router.get('/account', getAccounts);


module.exports = router;