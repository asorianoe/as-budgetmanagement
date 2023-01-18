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