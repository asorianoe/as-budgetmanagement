const { pool } = require('../utils/oracle');

module.exports.fetchAll = ({ userid }) => {
  const bindings = { userid };
  const SQL_SELECT_CATEGORIES = `SELECT
	                                  user_id, account_id, alias, balance, currency, create_date, update_date
                                  FROM
                                    bm_account
                                  WHERE 
                                    user_id = :userid`;
  return pool(SQL_SELECT_CATEGORIES, bindings);
};