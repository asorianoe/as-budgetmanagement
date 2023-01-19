const express = require('express');
const router = express.Router();
const { getAccounts, saveTransaction, saveAccount, saveTranfer, getTranfers} = require('../controller/AccountController');
const { infoPerson} = require('../controller/UserController');
const { getCategories, getCurrencies, getTypes} = require('../controller/ConfigController');


router.get('/person_info', infoPerson);
router.get('/account', getAccounts);
router.post('/account', saveAccount);
router.post('/account/tranfer', saveTranfer);
router.post('/account/:accId/transaction', saveTransaction);
router.get('/tranfer', getTranfers);

router.get('/categories', getCategories);
router.get('/types', getTypes);
router.get('/currencies', getCurrencies);


module.exports = router;