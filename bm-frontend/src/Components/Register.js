import { useRef, useContext, useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col, Container} from 'react-bootstrap';
import AuthContext from '../context/auth-context';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const [disabledSubmit, setDisableSubmit] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userIdRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRed = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length !== 0) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRed.current.value)
      return setError('Passwords do not match');
    try {
      setError('');
      setDisableSubmit(true);
      await authCtx.register(
        firstNameRef.current.value,
        lastNameRef.current.value,
        userIdRef.current.value,
        passwordRef.current.value
      );
      return navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
      setError('Failed to create an account');
    }
    setDisableSubmit(false);
  };

  return (
    <Container>
        <Row style={{ marginTop:"30Px"}}>
          <Col>
            <h2>Register</h2>
          </Col>
        </Row>
        <Row>
          <Col>
          <Card>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" ref={firstNameRef} required />
                </Form.Group>
                <Form.Group id="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" ref={lastNameRef} required />
                </Form.Group>
                <Form.Group id="userId">
                  <Form.Label>User Id</Form.Label>
                  <Form.Control type="userId" ref={userIdRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirm</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRed} required/>
                </Form.Group>
                <hr/>
                <div style={{marginLeft:"50%"}}>
                  <Button disabled={disabledSubmit} type="submit">
                    Register
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div>
            Already a user? <Link to="/login">Log In</Link>
          </div>
          </Col>
        </Row>
      </Container>  
  );
};

export default Register;
