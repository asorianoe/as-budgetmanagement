
FROM oraclelinux:8.7

LABEL developer="alexander.soriano@telusinternational.com"

ENV ORACLE_USER=bmuser \
    ORACLE_PASS=bmpass \
    ORACLE_CONNSTR=172.17.0.2:1522/XEPDB1 \
    SERVER_PORT=3200

# https://yum.oracle.com/oracle-instant-client.html
RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y

# https://yum.oracle.com/oracle-linux-nodejs.html#InstallingNodeOnOL8
RUN dnf module enable nodejs:16 -y
RUN dnf module install nodejs -y

# Copiando mi applicacion
COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]
