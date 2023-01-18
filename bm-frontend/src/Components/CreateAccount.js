import {useParams} from "react-router-dom";
import { useRef, useContext, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { getCurrencies, saveAccount} from "../service/AccountsService";

function CreateAccount() {
    const [error, setError] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [disabledSubmit, setDisableSubmit] = useState(false);
    const navigate = useNavigate();
    const aliasRef = useRef();
    const initianBalanceRef = useRef();
    const currencyRef = useRef();

    useEffect(() => {
        const getAllCurrencies = async () => {
          const currencies = await getCurrencies();
          console.log(currencies);
          setCurrencies(currencies.data);
        };
        getAllCurrencies();
    }, []);
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setError('');
        setDisableSubmit(true);
        
        await saveAccount(aliasRef.current.value,initianBalanceRef.current.value,currencyRef.current.value);
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
          <h2>Create new Account</h2>
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
                  <Form.Group id="alias">
                    <Form.Label>Account Alias:</Form.Label>
                    <Form.Control type="text"  ref={aliasRef} required />
                  </Form.Group>
                  <Form.Group id="ammount">
                    <Form.Label>Initial Balance</Form.Label>
                    <Form.Control type="text" placeholder="0.00"  ref={initianBalanceRef} required />
                  </Form.Group>
                  <Form.Group id="currency">
                    <Form.Label>Account Currency</Form.Label>
                    <Form.Select ref={currencyRef}>
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
  
  export default CreateAccount;