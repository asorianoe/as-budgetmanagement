import { useRef, useContext, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import AuthContext from '../context/auth-context';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const [disabledSubmit, setDisableSubmit] = useState(false);
  const userIdRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length !== 0) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setDisableSubmit(true);
      await authCtx.login(userIdRef.current.value,passwordRef.current.value);
      return navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
      setError('Failed to login');
    }
    setDisableSubmit(false);
  };

  return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="userId">
                  <Form.Label>User Id</Form.Label>
                  <Form.Control type="userId" ref={userIdRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={disabledSubmit} type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Register new User <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
  );
};

export default Login;
