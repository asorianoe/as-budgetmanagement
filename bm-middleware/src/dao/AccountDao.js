const { pool } = require('../utils/oracle');

module.exports.fetchAll = ({ userId }) => {
  const bindings = { userId };
  const SQL_SELECT_CATEGORIES = `SELECT
                                    account_id "accountId",	alias ,	to_char(balance,'fm999G999G999G990D00') balance,	currency,	update_date "modified"
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


module.exports.saveTransfer = ({ accId,toAccId,ammount, currency}) => {
  const bindings = {accId,toAccId,ammount, currency};
  console.log(bindings);
  const SQL_SELECT_CATEGORIES = `CALL bm_transfer(:accId, :toAccId, :ammount, :currency)`;
  return pool(SQL_SELECT_CATEGORIES, bindings,{ autoCommit: true });
};


module.exports.getTransactions = ({ accId,txCat,txDate,txType, limitRows, userId}) => {
  const bindings = {accId,txCat,txDate,txType,limitRows, userId};
  const SQL_SELECT_CATEGORIES = `SELECT * FROM (
                                      SELECT
                                        tx.tx_id, tx.account_id accountId, ac.alias, ac.currency exg_curr,
                                        tt.tx_type_desc type, tc.tx_cat_desc, to_char(tx.tx_org_amount,'fm999G999G999G990D00') org_amount, 
                                        tx.tx_currency, to_char(tx.tx_exg_amount,'fm999G999G999G990D00') exg_amount, tx.tx_date
                                      FROM
                                        bm_transaction tx
                                        inner join BM_ACCOUNT ac on (ac.account_id = tx.account_id)
                                        inner join bm_transactions_type tt on (tt.tx_type = tx.tx_type)
                                        inner join bm_transactions_cat tc on (tx.tx_cat = tc.tx_cat)
                                      Where 
                                        user_id = :userId
                                        AND tx.account_id = nvl(:accId,tx.account_id)
                                        AND tx.tx_cat = nvl(:txCat,tx.tx_cat)
                                        AND tx.tx_type = nvl(:txType,tx.tx_type)
                                        AND to_char(tx.tx_date,'YYYYMMdd') = nvl(:txDate,to_char(tx.tx_date,'YYYYMMdd'))
                                      order by tx.tx_date desc	
                                    )
                                    WHERE ROWNUM <= nvl(:limitRows,ROWNUM)`;
  return pool(SQL_SELECT_CATEGORIES, bindings,{ autoCommit: true });
};