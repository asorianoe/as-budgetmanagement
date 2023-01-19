import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';

import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes ,Route} from 'react-router-dom';
import AuthContext from './context/auth-context';
import AuthProvider from './context/AuthProvider';
import Dashboard from './Components/Dashboard';
import Transaction from './Components/Transaction';
import Register from './Components/Register';
import Login from './Components/Login'
import CreateAccount from './Components/CreateAccount';
import Transfer from './Components/Transfer';
import ViewHistory from './Components/ViewHistory';


function App() {
  const authCtx = useContext(AuthContext);
  return (
    <AuthProvider>
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/Dashboard">Budget Management</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/History">Transaction History</Nav.Link>
              <Nav.Link href="/Register">Register</Nav.Link>
              <Nav.Link href="/Login">Login</Nav.Link>
            </Nav>
            <Navbar.Text>
              Signed in as: <a href="#login">{`Hello {authCtx.currentUser.first_name} ${authCtx.currentUser.last_name}`}  {authCtx.currentUser.last_name}</a>
            </Navbar.Text>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>                
             <Route path='/Dashboard' element={<Dashboard/>}/>  
             <Route path='/ViewHistory' element={<ViewHistory/>}/>  
             <Route path='/Transaction/:accId/:txType/:curr' element={<Transaction/>} />  
             <Route path='/Transfer/:accId' element={<Transfer/>} />  
             <Route path='/CreateAccount' element={<CreateAccount/>} />  
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
