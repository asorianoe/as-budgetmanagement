const { pool } = require('../utils/oracle');

module.exports.fetchCategories = ({ txType }) => {
  const bindings = { txType };
  const SQL_SELECT_CATEGORIES = `SELECT
                                    tx_cat category,
                                    tx_cat_desc description
                                FROM
                                    bm_transactions_cat
                                WHERE 
                                    tx_visible = 'Y'
                                    and tx_type =:txType`;
return pool(SQL_SELECT_CATEGORIES, bindings);
};

module.exports.fetchCurrencies = ({ }) => {
    const bindings = {};
    const SQL_SELECT_CATEGORIES = `SELECT
                                        curr_id currency,
                                        curr_desc description
                                    FROM
                                        bm_currency`;
  return pool(SQL_SELECT_CATEGORIES, bindings);
  };