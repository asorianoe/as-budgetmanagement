ALTER SESSION SET CONTAINER=XEPDB1;

CREATE TABLE bmuser.bm_currency
(
	curr_id varchar2(3) NOT NULL, 
	curr_desc varchar2(20),
	curr_usd_exc_rate number(10,2), 
	CONSTRAINT bm_currency_pk PRIMARY KEY(curr_id) ENABLE 
);

CREATE TABLE  bmuser.BM_TRANSACTIONS_TYPE
(
	tx_type varchar2(3) NOT NULL , 
	tx_type_desc varchar2(20),
	CONSTRAINT BM_TRANSACTIONS_TYPE_PK PRIMARY KEY(tx_type) ENABLE 
);

CREATE TABLE  bmuser.BM_TRANSACTIONS_CAT
(
	tx_cat varchar2(3) NOT NULL, 
	tx_cat_desc varchar2(20),
	tx_type varchar2(3) NOT NULL,
	CONSTRAINT BM_TRANSACTIONS_CAT_PK PRIMARY KEY(tx_cat) ENABLE 
);

ALTER TABLE bmuser.BM_TRANSACTIONS_CAT
	ADD CONSTRAINT BM_TRANSACTIONS_CAT_FK1 FOREIGN KEY (tx_type)
	REFERENCES bmuser.BM_TRANSACTIONS_TYPE(tx_type)
ENABLE;

CREATE TABLE bmuser.bm_account
(
  user_id VARCHAR2(10) NOT NULL,
	account_id NUMBER NOT NULL,
	ALIAS VARCHAR2(20) NOT NULL,
	balance NUMBER DEFAULT 0 NOT NULL,
	currency varchar2(3) NOT NULL, 
	create_date DATE DEFAULT sysdate NOT NULL,
	update_date DATE DEFAULT sysdate NOT NULL,
	CONSTRAINT BM_ACCOUNT_PK PRIMARY KEY(ACCOUNT_ID) ENABLE
);

ALTER TABLE bmuser.BM_ACCOUNT
	ADD CONSTRAINT BM_ACCOUNT_FK1 FOREIGN KEY (currency)
	REFERENCES bmuser.BM_CURRENCY(CURR_ID)
ENABLE;


CREATE TABLE bmuser.BM_TRANSACTION 
(
	tx_id 				number not null, 
  ACCOUNT_ID 		NUMBER NOT NULL, 
	tx_type  			varchar2(3) NOT NULL, 
	tx_cat 				varchar2(3) NOT NULL, 
	tx_org_amount number(10,2) not null, 
	tx_currency 	varchar2(3) not null, 
	tx_exg_amount number(10,2) not null,
	tx_date       date default sysdate not null,
	CONSTRAINT BM_TRANSACTION PRIMARY KEY(tx_id) ENABLE
);

ALTER TABLE bmuser.BM_TRANSACTION
	ADD CONSTRAINT BM_TRANSACTION_FK1 FOREIGN KEY (TX_CURRENCY)
	REFERENCES bmuser.BM_CURRENCY(CURR_ID)
	ENABLE;

ALTER TABLE bmuser.BM_TRANSACTION
	ADD CONSTRAINT BM_TRANSACTION_FK2 FOREIGN KEY(ACCOUNT_ID)
	REFERENCES bmuser.BM_ACCOUNT(ACCOUNT_ID)
	ENABLE;

ALTER TABLE bmuser.BM_TRANSACTION
	ADD CONSTRAINT BM_TRANSACTION_FK3 FOREIGN KEY(TX_TYPE)
	REFERENCES bmuser.BM_TRANSACTIONS_TYPE(TX_TYPE)
	ENABLE;

ALTER TABLE bmuser.BM_TRANSACTION
	ADD CONSTRAINT BM_TRANSACTION_FK4 FOREIGN KEY(TX_CAT)
	REFERENCES bmuser.BM_TRANSACTIONS_CAT(TX_CAT)
	ENABLE;

CREATE SEQUENCE bmuser.BM_TRANSACTION_SEQ INCREMENT BY 1 START WITH 1 NOCACHE;
CREATE SEQUENCE bmuser.bm_account_SEQ  INCREMENT BY 1 START WITH 1 NOCACHE;


create or replace view bmuser.conv_rate as
	select org_cur,new_cur,conv_rate from (
		select 
			from_cur.curr_id org_cur, to_cur.curr_id new_cur, to_cur.curr_usd_exc_rate/from_cur.curr_usd_exc_rate conv_rate
		from  bmuser.bm_currency from_cur,  bmuser.bm_currency to_cur 
)
;

create or replace trigger bmuser.BM_TRANSACTION_TRG  
   before insert on BMUSER.BM_TRANSACTION 
   for each row 
declare
	to_curr varchar2(3);
begin  
   if inserting then 
			select bmuser.BM_TRANSACTION_SEQ.nextval into :NEW.TX_ID from dual;
			SELECT currency into to_curr from bmuser.bm_account where account_id = :NEW.ACCOUNT_ID;
			SELECT CONV_RATE * :NEW.tx_org_amount into :NEW.tx_exg_amount from bmuser.conv_rate where org_cur = :NEW.tx_currency and new_cur = to_curr;
			UPDATE bmuser.bm_account
				SET balance = balance + :NEW.tx_exg_amount
			WHERE 
				account_id = :NEW.ACCOUNT_ID;
   end if; 
end;
/

CREATE OR REPLACE PROCEDURE bmuser.bm_transfer 
	(from_acc IN NUMBER, to_acc IN NUMBER, amount IN NUMBER, currency IN VARCHAR2) AS 
BEGIN
  INSERT INTO bmuser.bm_transaction (account_id, tx_type, tx_cat, tx_org_amount, tx_currency) VALUES (from_acc, 'INC', 'OTH',-1*amount, currency);
	INSERT INTO bmuser.bm_transaction (account_id, tx_type, tx_cat, tx_org_amount, tx_currency) VALUES (to_acc, 'EXP', 'OTH', amount, currency);
END bm_transfer;
/
/*DATA*/

INSERT INTO BMUSER.BM_CURRENCY (CURR_ID, CURR_DESC, CURR_USD_EXC_RATE) VALUES ('USD', 'U.S Dollar', '1');
INSERT INTO BMUSER.BM_CURRENCY (CURR_ID, CURR_DESC, CURR_USD_EXC_RATE) VALUES ('COP', 'Colombiam Peso', 4729.76);
INSERT INTO BMUSER.BM_CURRENCY (CURR_ID, CURR_DESC, CURR_USD_EXC_RATE) VALUES ('MEX', 'Mexican Peso', 19.39);
INSERT INTO BMUSER.BM_CURRENCY (CURR_ID, CURR_DESC, CURR_USD_EXC_RATE) VALUES ('CRC', 'Costa Rican Colón', 581.85);
INSERT INTO BMUSER.BM_CURRENCY (CURR_ID, CURR_DESC, CURR_USD_EXC_RATE) VALUES ('EUR', 'Euro', 0.94);
INSERT INTO BMUSER.BM_CURRENCY (CURR_ID, CURR_DESC, CURR_USD_EXC_RATE) VALUES ('GBP', 'Pound sterling', 0.83);


INSERT INTO BMUSER.BM_TRANSACTIONS_TYPE (tx_type, TX_TYPE_DESC) VALUES ('EXP', 'Expense');
INSERT INTO BMUSER.BM_TRANSACTIONS_TYPE (tx_type, TX_TYPE_DESC) VALUES ('INC', 'Income');
INSERT INTO BMUSER.BM_TRANSACTIONS_TYPE (tx_type, TX_TYPE_DESC) VALUES ('TRA', 'Transfer');

INSERT INTO BMUSER.BM_TRANSACTIONS_CAT (TX_CAT, TX_CAT_DESC, TX_TYPE) VALUES ('HOU', 'Hosing ', 'EXP');
INSERT INTO BMUSER.BM_TRANSACTIONS_CAT (TX_CAT, TX_CAT_DESC, TX_TYPE) VALUES ('FOO', 'Food', 'EXP');
INSERT INTO BMUSER.BM_TRANSACTIONS_CAT (TX_CAT, TX_CAT_DESC, TX_TYPE) VALUES ('ENT', 'Entretaining', 'EXP');
INSERT INTO BMUSER.BM_TRANSACTIONS_CAT (TX_CAT, TX_CAT_DESC, TX_TYPE) VALUES ('SAL', 'Salary', 'INC');
INSERT INTO BMUSER.BM_TRANSACTIONS_CAT (TX_CAT, TX_CAT_DESC, TX_TYPE) VALUES ('OTH', 'Others', 'INC');
INSERT INTO BMUSER.BM_TRANSACTIONS_CAT (TX_CAT, TX_CAT_DESC, TX_TYPE) VALUES ('OTH', 'Others', 'EXP');

COMMIT;

