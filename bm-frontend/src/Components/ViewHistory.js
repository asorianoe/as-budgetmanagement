import { format , parseISO } from "date-fns";
import { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { getAccounts, getCategories, getTransactions, getTypes} from "../service/AccountsService";
import DatePicker from 'react-date-picker';

function ViewHistory() {
    const [error, setError] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [txTypes, setTxTypes] = useState([]);
    const [disabledSubmit, setDisableSubmit] = useState(false);
    const [dateValue, setDateValue] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const accIdRef = useRef();
    const categorRef = useRef();
    const txType = useRef();

    useEffect(() => {
        const getAllAccounts = async () => {
          const accounts = await getAccounts();
          setAccounts(accounts.data);
        };
        getAllAccounts();

        const getTypeCategories = async () => {
          const categories = await getCategories(null, 'ALL');
          console.log(categories);
          setCategories(categories.data);
        };
        getTypeCategories();

        const getAllTypes = async () => {
          const types = await getTypes();
          setTxTypes(types.data);
        };
        getAllTypes();

        const getInitialTx = async () => {
          const tx = await getTransactions(null, null,null,null);
          setTransactions(tx.data);
        };
        getInitialTx();
       // this.getLatestTransactions();
    }, []);

    const getLatestTransactions = async () => {
      let finalDate=null;
      console.log(dateValue);
      if (dateValue){
        finalDate=format(dateValue, "yyyyMMdd")
        console.log(finalDate);
      }
      const tx = await getTransactions(accIdRef.current.value,categorRef.current.value,finalDate,null);
      setTransactions(tx.data);
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      setDisableSubmit(false);
    };

    function handleCancel() {
      navigate("/Dashboard");
    }

    return (
      <Container>
        <Row style={{ marginTop:"30Px"}}>
          <Col>
            <h2>Transaction History</h2>
          </Col>
          <Col style={{ textAlign: "center" }}>
          </Col>
        </Row>
        <Row>
          <Col>
              <Form.Group id="Account">
                <Form.Label>Account</Form.Label>
                <Form.Select ref={accIdRef} onChange={getLatestTransactions}>
                      <option value=''></option>
                  {accounts.map(acc=>{return(
                      <option value={acc.accountId} key={acc.accountId}>{acc.ALIAS} ({acc.CURRENCY})</option>
                  )})}
                </Form.Select>
              </Form.Group>
          </Col>
          <Col>
              <Form.Group id="txType">
                <Form.Label>Transaction Type</Form.Label>
                <Form.Select ref={txType} onChange={getLatestTransactions}>
                      <option value=''></option>
                  {txTypes.map(typ=>{return(
                      <option value={typ.TX_TYPE} key={typ.TX_TYPE}>{typ.TX_TYPE_DESC}</option>
                  )})}
                </Form.Select>
              </Form.Group>
          </Col>
          <Col>
              <Form.Group id="category">
                <Form.Label>Category</Form.Label>
                <Form.Select ref={categorRef} onChange={getLatestTransactions}>
                      <option value=''></option>
                  {categories.map(cat=>{return(
                      <option value={cat.CATEGORY} key={cat.CATEGORY}>{cat.DESCRIPTION}</option>
                  )})}
                </Form.Select>
              </Form.Group>
          </Col>
          <Col>
              <Form.Group id="date">
                <Form.Label>Date</Form.Label> 
                <br/>
                <DatePicker onChange={setDateValue} value={dateValue} maxDate={new Date()} />
              </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginTop:"30Px"}}>
          <Col>
            <Table style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account</th>
                  <th>Original Amount</th>
                  <th>Account Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
              {transactions.map(tx=>{return(
                <tr key={tx.TX_ID}>
                  <td>{format(parseISO(tx.TX_DATE), "MMMM do, yyyy HH:mma")}</td>
                  <td>{tx.ALIAS}</td>
                  <td style={{ textAlign: "right" }}>{tx.ORG_AMOUNT} {tx.TX_CURRENCY}</td>
                  <td style={{ textAlign: "right" }}>{tx.EXG_AMOUNT} {tx.EXG_CURR}</td>
                  <td>{tx.TYPE}</td>
                  <td>{tx.TX_CAT_DESC}</td>
                </tr>
              )})}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default ViewHistory;