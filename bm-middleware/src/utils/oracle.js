const oracledb = require('oracledb');
const { oracleConfig } = require('../config/config');
const path = require('path');

// This is not needed if you use the default location

// path to client
// const oracleClient = path.join('C:', 'oracle', 'db_home', 'bin');

// init client
// oracledb.initOracleClient({ libDir: oracleClient });

// init database
module.exports.start = async () => {
  await oracledb.createPool(oracleConfig);
};

// close database
module.exports.close = async () => {
  await oracledb.getPool().close(0);
};

// request handler (pool handler)
module.exports.pool = async (statement, binds = [], opts = {}) => {
  let conn;
  let result = [];
  opts.outFormat = oracledb.OBJECT;
  try {
    conn = await oracledb.getConnection();
    result = await conn.execute(statement, binds, opts);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};