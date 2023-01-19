const accountDao = require('../dao/AccountDao');


module.exports.getAccounts = async (req, res, next) => {
  const args = { userId: req.person.userId };
  try {
    const { rows } = await accountDao.fetchAll(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.saveAccount = async (req, res, next) => {
  var accId = req.params.accId;
  const args = {
                  alias:req.body.alias,
                  currency:req.body.currency, 
                  initialBalance:req.body.initialBalance, 
                  userId:req.person.userId
                };
  try {
    const { rows } = await accountDao.saveAccount(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.saveTransaction = async (req, res, next) => {
  var accId = req.params.accId;
  const args = {
                  accId:req.params.accId,
                  txType:req.body.txType, 
                  txCat:req.body.txCat, 
                  txAmmount:req.body.txAmmount, 
                  txCurrency:req.body.txCurrency
                };
  try {
    const { rows } = await accountDao.saveTransaction(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.saveTransaction = async (req, res, next) => {
  var accId = req.params.accId;
  const args = {
                  accId:req.params.accId,
                  txType:req.body.txType, 
                  txCat:req.body.txCat, 
                  txAmmount:req.body.txAmmount, 
                  txCurrency:req.body.txCurrency
                };
  try {
    const { rows } = await accountDao.saveTransaction(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.saveTranfer = async (req, res, next) => {
  var accId = req.params.accId;
  const args = {
                  accId:req.body.accId,
                  toAccId:req.body.toAccId, 
                  ammount:req.body.ammount, 
                  currency:req.body.currency
                };
  try {
    const { rows } = await accountDao.saveTransfer(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.getTranfers = async (req, res, next) => {
  var accId = req.params.accId;
  const args = {
                  accId:req.query.accId,
                  txCat:req.query.txCat, 
                  txDate:req.query.txDate, 
                  limitRows:req.query.limit
                };
  try {
    const { rows } = await accountDao.getTransfers(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};




