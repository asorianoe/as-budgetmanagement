const { pool } = require('../utils/oracle');
const oracledb = require('oracledb');

module.exports.register = ({ userId, password, first_name, last_name }) => {
    const bindings = { 
                        userId,password,first_name,last_name,
                        person_token: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
    };
    const SQL_REGISTER_PERSON = `INSERT INTO bm_user (user_id,user_pass,user_token,user_first_name,user_last_name)
	                                VALUES (:userId, :password, api_token(TO_CHAR(SYSDATE, 'DD-MM-YYYY HH24:MI:SS') || :password),:first_name, :last_name)
	                                RETURNING user_token INTO :person_token`;
    return pool(SQL_REGISTER_PERSON, bindings, { autoCommit: true });
};

module.exports.login = ({ userId, password }) => {
    const bindings = {
      userId,
      password,
      person_token: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      first_name: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      last_name: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    const SQL_LOGIN_PERSON = `UPDATE bm_user SET
                                user_token = api_token(TO_CHAR(SYSDATE, 'DD-MM-YYYY HH24:MI:SS') || :password), UPDATE_DATE = sysdate
                                WHERE user_id = :userId
                            RETURNING user_token, user_first_name, user_last_name INTO :person_token, :first_name, :last_name`;
    return pool(SQL_LOGIN_PERSON, bindings, { autoCommit: true });
};
  
module.exports.verifyPersonToken = ({ person_token }) => {
    const bindings = { person_token };
    const SQL_SELECT_PERSON = `SELECT
                                        user_id AS "userId",
                                        user_first_name AS "first_name",
                                        user_last_name AS "last_name"
                                    FROM bm_user
                                    WHERE 
                                        user_token = :person_token`;
    return pool(SQL_SELECT_PERSON, bindings);
};
  
module.exports.hashpassword = ({ userId }) => {
    const bindings = { userId };
    const SQL_HASH_PASSWORD = `SELECT user_pass PASSWORD FROM bm_user WHERE user_id = :userId`;
    return pool(SQL_HASH_PASSWORD, bindings);
};
  
  