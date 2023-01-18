const express = require('express');
const router = express.Router();
const { getAccounts, saveTransaction, saveAccount} = require('../controller/AccountController');
const { infoPerson} = require('../controller/UserController');
const { getCategories, getCurrencies} = require('../controller/ConfigController');


router.get('/person_info', infoPerson);
router.get('/account', getAccounts);
router.post('/account', saveAccount);
router.post('/account/:accId/transaction', saveTransaction);
router.get('/categories', getCategories);
router.get('/currencies', getCurrencies);


module.exports = router;