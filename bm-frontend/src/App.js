import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';

import { useContext,useEffect, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes ,Route, useNavigate, useLocation} from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let unsec = location.pathname ==='/Login' || location.pathname ==='/Register';
    if (Object.entries(authCtx.currentUser).length === 0) {
      if (!unsec){
        navigate('/Login', { replace: true });
      }
      setLoggedIn(false);
    }else {
      if (unsec){
        navigate('/', { replace: true });
      }
      setLoggedIn(true);
    }

  }, []);

  const HandleLogout = async () => {
    try {
      await authCtx.logout();
      navigate('/login', { replace: true });
    } catch {
    }
  };

  return (
      <>
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/Dashboard">Budget Management</Navbar.Brand>
            {Object.entries(authCtx.currentUser).length !== 0 &&<Nav className="me-auto">
              <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/ViewHistory">Transaction History</Nav.Link>
            </Nav>
            }
            {Object.entries(authCtx.currentUser).length !== 0 &&<Navbar.Text style={{ color:"white"}}>
              Signed in as: {authCtx.currentUser.first_name} {authCtx.currentUser.last_name} (<a href="#login" onClick={HandleLogout}>logout</a>)
            </Navbar.Text>}
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
      </>
  );
}

export default App;
