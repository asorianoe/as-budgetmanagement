import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes ,Route} from 'react-router-dom';

import AuthProvider from './context/AuthProvider';
import Dashboard from './Components/Dashboard';
import Transaction from './Components/Transaction';
import Register from './Components/Register';
import Login from './Components/Login'


function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/Dashboard">Budget Management</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/Transaction">New Transaction</Nav.Link>
              <Nav.Link href="/History">Transaction History</Nav.Link>
              <Nav.Link href="/Accounts">Bank Account</Nav.Link>
              <Nav.Link href="/Register">Register</Nav.Link>
              <Nav.Link href="/Login">Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>                
             <Route path='Dashboard' element={<Dashboard/>}/>  
             <Route path='/Transaction' element={<Transaction/>} />  
             <Route path='/Register' element={<Register/>} />  
             <Route path='/Login' element={<Login/>} />  
             <Route path='/' element={<Dashboard/>} />            
              <Route render={function () {
                return <p>Not found</p>
              }} />
        </Routes>
      </div>
    </AuthProvider>


  );
}

export default App;
