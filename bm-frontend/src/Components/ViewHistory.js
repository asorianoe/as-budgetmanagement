import { format , parseISO,  } from "date-fns";
import { useRef, useState, useEffect } from 'react';
import { Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { getAccounts, getCategories, getTransactions, getTypes} from "../service/AccountsService";


function ViewHistory() {
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [txTypes, setTxTypes] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const accIdRef = useRef();
    const categorRef = useRef();
    const txType = useRef();
    const dateRef = useRef();

    useEffect(() => {
        const getAllAccounts = async () => {
          const accounts = await getAccounts();
          setAccounts(accounts.data);
        };
        getAllAccounts();

        const getTypeCategories = async () => {
          const categories = await getCategories(null, 'ALL');
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
      let initialDate = dateRef.current.value;
      if (initialDate){
        finalDate = initialDate.replaceAll("-","");
      }
      const tx = await getTransactions(accIdRef.current.value,categorRef.current.value,finalDate,txType.current.value,null);
      setTransactions(tx.data);
    };

    const getCategoriesByType = async () => {
      const categories = await getCategories(txType.current.value, 'ALL');
      setCategories(categories.data);
      categorRef.current.value='';
      getLatestTransactions();
    };
  
    function handleReturn() {
      navigate("/Dashboard");
    }
    function handleClean() {
      categorRef.current.value='';
      accIdRef.current.value='';
      txType.current.value='';
      dateRef.current.value='';
      getLatestTransactions();
    }

    return (
      <Container>
        <Row style={{ marginTop:"30Px"}}>
          <Col>
            <h2>Transaction History</h2>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={() => handleClean()}>Clean</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="primary" onClick={() => handleReturn()}>Back</Button>
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
                <Form.Select ref={txType} onChange={getCategoriesByType}>
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
                <input type="date" className="form-control" onChange={getLatestTransactions} ref={dateRef}/>
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