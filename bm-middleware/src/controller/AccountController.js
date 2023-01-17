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



/*
module.exports.createCategory = async (req, res, next) => {
  const args = {
    person: req.person.person,
    name: req.body.name,
    description: req.body.description,
  };
  try {
    await accountDao.create(args);
    res.status(200).json({ messsage: 'Category created successfully!' });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.getCategory = async (req, res, next) => {
  const args = { person: req.person.person, category: Number(req.params.id) };
  try {
    const { rows } = await accountDao.findById(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};*/


