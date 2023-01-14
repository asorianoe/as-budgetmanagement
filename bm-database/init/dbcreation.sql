ALTER SESSION SET CONTAINER=xepdb1;

CREATE TABLE bmuser.bm_currency
(
	curr_id VARCHAR2(3) NOT NULL, 
	curr_desc VARCHAR2(20),
	curr_usd_exc_rate NUMBER(10,2), 
	CONSTRAINT bm_currency_pk PRIMARY KEY(curr_id) ENABLE 
);

CREATE TABLE  bmuser.bm_transactions_type
(
	tx_type VARCHAR2(3) NOT NULL , 
	tx_type_desc VARCHAR2(20),
	CONSTRAINT bm_transactions_type_pk PRIMARY KEY(tx_type) ENABLE 
);

CREATE TABLE  bmuser.bm_transactions_cat
(
	tx_cat VARCHAR2(3) NOT NULL, 
	tx_cat_desc VARCHAR2(20),
	tx_type VARCHAR2(3) NOT NULL,
	tx_visible VARCHAR(1) DEFAULT 'Y' NOT NULL,
	CONSTRAINT bm_transactions_cat_pk PRIMARY KEY(tx_cat) ENABLE 
);

ALTER TABLE bmuser.bm_transactions_cat
	ADD CONSTRAINT bm_transactions_cat_fk1 FOREIGN KEY (tx_type)
	REFERENCES bmuser.bm_transactions_type(tx_type)
ENABLE;

CREATE TABLE bmuser.bm_user (
	user_id VARCHAR2(10) NOT NULL,
	user_pass VARCHAR2(100) NOT NULL,
	user_token VARCHAR2(1000) NOT NULL,
	user_first_name VARCHAR2(100) NOT NULL,
	user_last_name VARCHAR2(100) NOT NULL,
	create_date DATE DEFAULT sysdate NOT NULL,
	update_date DATE DEFAULT sysdate NOT NULL,
	CONSTRAINT bm_user_pk PRIMARY KEY(user_id) ENABLE
);

CREATE TABLE bmuser.bm_account
(
  user_id VARCHAR2(10) NOT NULL,
	account_id NUMBER NOT NULL,
	ALIAS VARCHAR2(20) NOT NULL,
	balance NUMBER DEFAULT 0 NOT NULL,
	currency VARCHAR2(3) NOT NULL, 
	create_date DATE DEFAULT sysdate NOT NULL,
	update_date DATE DEFAULT sysdate NOT NULL,
	CONSTRAINT bm_account_pk PRIMARY KEY(account_id) ENABLE
);

ALTER TABLE bmuser.bm_account
	ADD CONSTRAINT bm_account_fk1 FOREIGN KEY (currency)
	REFERENCES bmuser.bm_currency(curr_id)
ENABLE;

ALTER TABLE bmuser.bm_user
	ADD CONSTRAINT bm_account_fk2 FOREIGN KEY (user_id)
	REFERENCES bmuser.bm_user(user_id)
ENABLE;

CREATE TABLE bmuser.bm_transaction 
(
	tx_id 				NUMBER NOT NULL, 
  account_id 		NUMBER NOT NULL, 
	tx_type  			VARCHAR2(3) NOT NULL, 
	tx_cat 				VARCHAR2(3) NOT NULL, 
	tx_org_amount NUMBER(10,2) NOT NULL, 
	tx_currency 	VARCHAR2(3) NOT NULL, 
	tx_exg_amount NUMBER(10,2) NOT NULL,
	tx_date       DATE DEFAULT sysdate NOT NULL,
	CONSTRAINT bm_transaction PRIMARY KEY(tx_id) ENABLE
);

ALTER TABLE bmuser.bm_transaction
	ADD CONSTRAINT bm_transaction_fk1 FOREIGN KEY (tx_currency)
	REFERENCES bmuser.bm_currency(curr_id)
	ENABLE;

ALTER TABLE bmuser.bm_transaction
	ADD CONSTRAINT bm_transaction_fk2 FOREIGN KEY(account_id)
	REFERENCES bmuser.bm_account(account_id)
	ENABLE;

ALTER TABLE bmuser.bm_transaction
	ADD CONSTRAINT bm_transaction_fk3 FOREIGN KEY(tx_type)
	REFERENCES bmuser.bm_transactions_type(tx_type)
	ENABLE;

ALTER TABLE bmuser.bm_transaction
	ADD CONSTRAINT bm_transaction_fk4 FOREIGN KEY(tx_cat)
	REFERENCES bmuser.bm_transactions_cat(tx_cat)
	ENABLE;

CREATE SEQUENCE bmuser.bm_transaction_seq INCREMENT BY 1 START WITH 1 NOCACHE;
CREATE SEQUENCE bmuser.bm_account_seq  INCREMENT BY 1 START WITH 1 NOCACHE;


CREATE OR REPLACE VIEW bmuser.conv_rate AS
	SELECT org_cur,new_cur,conv_rate FROM (
		SELECT 
			from_cur.curr_id org_cur, to_cur.curr_id new_cur, to_cur.curr_usd_exc_rate/from_cur.curr_usd_exc_rate conv_rate
		FROM  bmuser.bm_currency from_cur,  bmuser.bm_currency to_cur 
)
;

CREATE OR REPLACE TRIGGER bmuser.bm_transaction_trg  
   BEFORE INSERT ON bmuser.bm_transaction 
   FOR EACH ROW 
DECLARE
	to_curr VARCHAR2(3);
BEGIN  
   IF inserting THEN 
			SELECT bmuser.bm_transaction_seq.NEXTVAL INTO :NEW.tx_id FROM dual;
			SELECT currency INTO to_curr FROM bmuser.bm_account WHERE account_id = :NEW.account_id;
			SELECT conv_rate * :NEW.tx_org_amount INTO :NEW.tx_exg_amount FROM bmuser.conv_rate WHERE org_cur = :NEW.tx_currency AND new_cur = to_curr;
			UPDATE bmuser.bm_account
				SET balance = balance + :NEW.tx_exg_amount
			WHERE 
				account_id = :NEW.account_id;
   END IF; 
END;
/

CREATE OR REPLACE PROCEDURE bmuser.bm_transfer 
	(from_acc IN NUMBER, to_acc IN NUMBER, amount IN NUMBER, currency IN VARCHAR2) AS 
BEGIN
  INSERT INTO bmuser.bm_transaction (account_id, tx_type, tx_cat, tx_org_amount, tx_currency) VALUES (from_acc, 'INC', 'OTH',-1*amount, currency);
	INSERT INTO bmuser.bm_transaction (account_id, tx_type, tx_cat, tx_org_amount, tx_currency) VALUES (to_acc, 'EXP', 'OTH', amount, currency);
END bm_transfer;
/

-- CREATE FUNCTION
CREATE OR REPLACE FUNCTION bmuser.API_TOKEN(PSECRET VARCHAR2) RETURN VARCHAR2
IS
  	VRESULT VARCHAR2(4000);
BEGIN
	SELECT UTL_RAW.CAST_TO_VARCHAR2(UTL_I18N.STRING_TO_RAW(STANDARD_HASH(PSECRET, 'MD5'), 'AL32UTF8')) INTO VRESULT from dual;
	RETURN VRESULT;
END API_TOKEN;
/

/*DATA*/

INSERT INTO bmuser.bm_currency (curr_id, curr_desc, curr_usd_exc_rate) VALUES ('USD', 'U.S Dollar', '1');
INSERT INTO bmuser.bm_currency (curr_id, curr_desc, curr_usd_exc_rate) VALUES ('COP', 'Colombiam Peso', 4729.76);
INSERT INTO bmuser.bm_currency (curr_id, curr_desc, curr_usd_exc_rate) VALUES ('MEX', 'Mexican Peso', 19.39);
INSERT INTO bmuser.bm_currency (curr_id, curr_desc, curr_usd_exc_rate) VALUES ('CRC', 'Costa Rican Colón', 581.85);
INSERT INTO bmuser.bm_currency (curr_id, curr_desc, curr_usd_exc_rate) VALUES ('EUR', 'Euro', 0.94);
INSERT INTO bmuser.bm_currency (curr_id, curr_desc, curr_usd_exc_rate) VALUES ('GBP', 'Pound sterling', 0.83);


INSERT INTO bmuser.bm_transactions_type (tx_type, tx_type_desc) VALUES ('EXP', 'Expense');
INSERT INTO bmuser.bm_transactions_type (tx_type, tx_type_desc) VALUES ('INC', 'Income');
INSERT INTO bmuser.bm_transactions_type (tx_type, tx_type_desc) VALUES ('TRA', 'Transfer');

INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type) VALUES ('HOU', 'Hosing ', 'EXP');
INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type) VALUES ('FOO', 'Food', 'EXP');
INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type) VALUES ('ENT', 'Entretaining', 'EXP');
INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type) VALUES ('SAL', 'Salary', 'INC');
INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type) VALUES ('SLS', 'Sales', 'INC');
INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type) VALUES ('OTE', 'Other Expenses', 'EXP');
INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type) VALUES ('OTI', 'Other Income', 'EXP');
INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type, tx_visible) VALUES ('TRI', 'Tranfer Increase', 'INC', 'N');
INSERT INTO bmuser.bm_transactions_cat (tx_cat, tx_cat_desc, tx_type, tx_visible) VALUES ('TRE', 'Tranfer Expense', 'EXP', 'N');

INSERT INTO bmuser.bm_user (user_id, user_mail, user_pass, user_token, user_first_name, user_last_name) VALUES ('asoriano', 'asoriano', 'NoToken', 'Alex', 'Soriano');


COMMIT;

