import { format , parseISO } from "date-fns";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import { Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { getAccounts} from "../service/AccountsService";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAllAccounts = async () => {
      const accounts = await getAccounts();
      setAccounts(accounts.data);
    };
    getAllAccounts();
  }, []);

  return (
    <Container>
      <Row style={{ marginTop:"30Px"}}>
        <Col>
            <h2> Accounts Information</h2>
        </Col>
        <Col style={{ textAlign: "center" }}>
            <Button variant="primary">Add new Account</Button>
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
                    <Button variant="success">+</Button>
                    <Button variant="danger">-</Button>
                    <Button variant="warning">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>

</Button>
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