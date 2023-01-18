import { useNavigate } from "react-router-dom";
import { format , parseISO } from "date-fns";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import { Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { getAccounts} from "../service/AccountsService";
import { BsArrowRepeat,BsArrowUpCircle,BsArrowDownCircle} from "react-icons/bs";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllAccounts = async () => {
      const accounts = await getAccounts();
      setAccounts(accounts.data);
    };
    getAllAccounts();
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
        <Col>
            <h2> Last Transactions</h2>
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
                <td> income + with</td>
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