const { pool } = require('../utils/oracle');

module.exports.fetchAll = ({ userId }) => {
  const bindings = { userId };
  const SQL_SELECT_CATEGORIES = `SELECT
                                    account_id "accountId",	alias ,	to_char(balance,'fm999G999G999G999D00') balance,	currency,	update_date "modified"
                                  FROM
                                    bm_account
                                  WHERE
                                    user_id =  :userId`;
  return pool(SQL_SELECT_CATEGORIES, bindings);
};

module.exports.saveAccount = ({ alias,currency,initialBalance, userId}) => {
  const bindings = {alias,currency,initialBalance, userId};
  const SQL_SELECT_CATEGORIES = `INSERT INTO bm_account (
                                  account_id, user_id, alias, balance, currency
                                ) VALUES (BM_ACCOUNT_SEQ.nextval, :userId, :alias, :initialBalance, :currency)`;
  return pool(SQL_SELECT_CATEGORIES, bindings,{ autoCommit: true });
};

module.exports.saveTransaction = ({ accId,txType,txCat, txAmmount, txCurrency}) => {
  const bindings = {accId,txType,txCat, txAmmount, txCurrency};
  const SQL_SELECT_CATEGORIES = `INSERT INTO bm_transaction (
                                      account_id,tx_type,tx_cat,tx_org_amount,tx_currency
                                    ) VALUES (
                                      :accId, :txType, :txCat, :txAmmount, :txCurrency
                                    )`;
  return pool(SQL_SELECT_CATEGORIES, bindings,{ autoCommit: true });
};