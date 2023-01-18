docker run -d -p 1522:1521 -e ORACLE_PASSWORD=oraclepass -e APP_USER=bmuser -e APP_USER_PASSWORD=bmpass -v $pwd\init:/container-entrypoint-initdb.d -v oracle-disk:/opt/oracle/oradata gvenzl/oracle-xe:21.3.0
docker run -d -p 1522:1521 -e ORACLE_PASSWORD=oraclepass -e APP_USER=bmuser -e APP_USER_PASSWORD=bmpass -v $pwd\init:/container-entrypoint-initdb.d --name oradb gvenzl/oracle-xe:21.3.0
