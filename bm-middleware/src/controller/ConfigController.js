const configDao = require('../dao/ConfigDao');


module.exports.getCategories = async (req, res, next) => {
  const args = { txType: req.query.txType, txVisible: req.query.txVisible };
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

module.exports.getTypes = async (req, res, next) => {
  try {
    const { rows } = await configDao.fetchTypes({});
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};
