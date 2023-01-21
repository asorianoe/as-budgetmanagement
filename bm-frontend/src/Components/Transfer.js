import {useParams} from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { getAccounts, getCurrencies, saveTranfer} from "../service/AccountsService";
import CurrencyInput from "react-currency-input-field";

function Transfer() {
    const {accId} = useParams();
    const [error, setError] = useState('');
    const [mainAccount, setMainAccount] = useState('');
    const [mainAccountCurr, setMainAccountCurr] =  useState('');
    const [accounts, setAccounts] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [ammountValue, setAmmountValue] = useState(null);
    const [disabledSubmit, setDisableSubmit] = useState(false);
    const navigate = useNavigate();
    const transferToRef = useRef();
    const currencyRef = useRef();

    useEffect(() => {
        const getAllCurrencies = async () => {
          const currencies = await getCurrencies();
          setCurrencies(currencies.data);
        };
        getAllCurrencies();

        const getAllAccounts = async () => {
          const accounts = await getAccounts();
          const filtered = accounts.data.filter(account => {
            return account.accountId !== parseInt(accId);
          });
          setAccounts(filtered);
          const mainAccountArr = accounts.data.filter(account => {
            return account.accountId ===parseInt(accId);
          }); 
          setMainAccount(mainAccountArr[0].ALIAS);
          setMainAccountCurr(mainAccountArr[0].CURRENCY);
        };
        getAllAccounts();
    }, [accId]);
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setError('');
        setDisableSubmit(true);
        await saveTranfer(accId,transferToRef.current.value,ammountValue,currencyRef.current.value);
        return navigate('/Dashboard', { replace: true });
      } catch (e) {
        console.log(e);
        setError('Failed to Save Transaction');
      }
      setDisableSubmit(false);
    };

    function handleCancel() {
      navigate("/Dashboard");
    }

    return (
      <Container>
        <Row style={{ marginTop:"30Px"}}>
          <Col>
          {mainAccount && <h2>Transfering from  {mainAccount} ({mainAccountCurr})</h2>}
          
          </Col>
          <Col style={{ textAlign: "center" }}>
          
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="toAccount">
                    <Form.Label>Transfer To</Form.Label>
                    <Form.Select ref={transferToRef}>
                      {accounts.map(acc=>{return(
                         <option value={acc.accountId} key={acc.accountId}>{acc.ALIAS} ({acc.CURRENCY})</option>
                      )})}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group id="ammount">
                    <Form.Label>Ammount</Form.Label>
                    <CurrencyInput className="form-control"
                        placeholder="0.00"
                        allowNegativeValue={false}
                        decimalsLimit={2} 
                        onValueChange={(value, name) => setAmmountValue (value)} required 
                    />
                  </Form.Group>
                  <Form.Group id="currency">
                    <Form.Label>Currency</Form.Label>
                    <Form.Select ref={currencyRef} value={mainAccountCurr}>
                      {currencies.map(cur=>{return(
                         <option value={cur.CURRENCY} key={cur.CURRENCY}>{cur.DESCRIPTION}</option>
                      )})}
                    </Form.Select>
                  </Form.Group>
                  <hr/>
                  <div style={{marginLeft:"50%"}}>
                    <Button disabled={disabledSubmit} type="submit">
                      Save
                    </Button>  
                    &nbsp;&nbsp;&nbsp;
                    <Button disabled={disabledSubmit} type="submit" onClick={() => handleCancel()}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default Transfer;