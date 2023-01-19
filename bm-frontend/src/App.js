import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';

import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes ,Route, useNavigate} from 'react-router-dom';
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
  const navigate = useNavigate();

  const HandleLogout = async () => {
    try {
      await authCtx.logout();
      navigate('/login', { replace: true });
    } catch {
    }
  };

  return (
    <AuthProvider>
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/Dashboard">Budget Management</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/History">Transaction History</Nav.Link>
            </Nav>
            <Navbar.Text>
              {authCtx.currentUser && <h2>Transfering from  {authCtx.currentUser.last_name} </h2>}

              Signed in as: <a href="#login">{`Hello {authCtx.currentUser.first_name} ${authCtx.currentUser.last_name}`}  {authCtx.currentUser.last_name}</a>
            </Navbar.Text>
            <Nav.Link href="/Login" onClick={HandleLogout} >Logout</Nav.Link>
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
