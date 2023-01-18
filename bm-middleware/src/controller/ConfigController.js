const configDao = require('../dao/ConfigDao');


module.exports.getCategories = async (req, res, next) => {
  const args = { txType: req.query.txType };
  try {
    const { rows } = await configDao.fetchCategories(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.getCurrencies = async (req, res, next) => {
  try {
    const { rows } = await configDao.fetchCurrencies({});
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};
