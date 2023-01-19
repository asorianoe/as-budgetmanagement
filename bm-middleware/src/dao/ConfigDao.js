const { pool } = require('../utils/oracle');

module.exports.fetchCategories = ({ txType, txVisible }) => {
  const bindings = { txType,txVisible };
  const SQL_SELECT_CATEGORIES = `SELECT
                                    tx_cat category,
                                    tx_cat_desc description
                                FROM
                                    bm_transactions_cat
                                WHERE 
                                    tx_visible  = nvl(:txVisible,tx_visible)
                                    and tx_type = nvl(:txType,tx_type)`;
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

module.exports.fetchTypes = ({ }) => {
    const bindings = {};
    const SQL_SELECT_CATEGORIES = `SELECT tx_type, tx_type_desc FROM bm_transactions_type`;
  return pool(SQL_SELECT_CATEGORIES, bindings);
};