import { useNavigate } from "react-router-dom";
import { format , parseISO } from "date-fns";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import { Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { getAccounts, getTransactions} from "../service/AccountsService";
import { BsArrowRepeat,BsArrowUpCircle,BsArrowDownCircle} from "react-icons/bs";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [latestTx, setLatestTx] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllAccounts = async () => {
      const accounts = await getAccounts();
      setAccounts(accounts.data);
    };
    getAllAccounts();
    const getLatestTransactions = async () => {
      const tx = await getTransactions(null,null,null,6);
      setLatestTx(tx.data);
    };
    getLatestTransactions();

  }, []);


  function handleIncrease(id,curr) {
    navigate("/Transaction/"+id+"/INC/"+curr);
  }
  function handleExpense(id,curr) {
    navigate("/Transaction/"+id+"/EXP/"+curr);
  }

  function handleTransfer(id) {
    navigate("/Transfer/"+id);
  }

  function handleCreateAccount() {
    navigate("/CreateAccount/");
  }

  function handleViewHistory() {
    navigate("/ViewHistory/");
  }
  

   return (
    <Container>
      <Row style={{ marginTop:"30Px"}}>
        <Col>
            <h2> Accounts Information</h2>
        </Col>
        <Col style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={() => handleCreateAccount()}>Add new Account</Button>
        </Col>
      </Row>
      <Row>
        <Col>
            <Table style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Alias</th>
                <th>Balance</th>
                <th>Modified</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
            {accounts.map(account=>{return(
              <tr key={account.accountId}>
                <td>{account.ALIAS} - {account.accountId}</td>
                <td style={{ textAlign: "right" }}>{account.BALANCE} {account.CURRENCY}</td>
                <td>{format(parseISO(account.modified), "MMMM do, yyyy HH:mma")}</td>
                <td> 
                    <Button variant="success" onClick={() => handleIncrease(account.accountId,account.CURRENCY)}><BsArrowUpCircle/></Button>
                    <Button variant="danger"  onClick={() => handleExpense (account.accountId,account.CURRENCY)}><BsArrowDownCircle/></Button>
                    <Button variant="warning" onClick={() => handleTransfer (account.accountId)}><BsArrowRepeat/></Button>
                </td>
              </tr>
            )})}
            </tbody>
            </Table>
        </Col>
      </Row>
      <Row>
      <Row style={{ marginTop:"30Px"}}>
        <Col>
          <h2> Latest Transactions</h2>
        </Col>
        <Col style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={() => handleViewHistory()}>View Tx History</Button>
        </Col>
      </Row>
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
            {latestTx.map(tx=>{return(
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

export default Dashboard;