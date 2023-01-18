import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { getAccounts} from "../service/AccountsService";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAllAccounts = async () => {
      const accounts = await getAccounts();
      console.log(accounts);
      setAccounts(accounts.data);
    };
    getAllAccounts();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
            <h2> Accounts Information</h2>
            <Table>
            <thead>
              <tr>
                <th>Alias</th>
                <th>Balance</th>
                <th>Currency</th>
                <th>Modified</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
            {accounts.map(arrayData=>{return(
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
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