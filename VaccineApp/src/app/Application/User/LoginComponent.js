import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUserDB } from '../../../state/User/userAction';

const Login = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const loginState = useSelector((store) => store.userReducer.login);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  const sessionName = useRef(null);
  const sessionPassword = useRef(null);

  const loginUser = (evt) => {
    evt.preventDefault();

    const user = {
      userName: sessionName.current.value,
      password: sessionPassword.current.value,
    };

    dispatch(LoginUserDB(user));

    sessionName.current.value = '';
    sessionPassword.current.value = '';
  };

  useEffect(() => {
    console.log('in use effect');
    if (loginState) {
      console.log('going to navigate');
      navigate('/home');
    }

    return () => {
      console.log('Component will unmount');
      dispatch({ type: 'STORE.RESETLOGIN' });
    };
  }, [navigate, loginState]);

  const backgroundImg =
    'https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensure full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="main-content"
    >
      <div className="login-form-card rounded p-4">
        <h1 className="mb-4 text-center">Login</h1>

        <Form onSubmit={loginUser}>
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm="3"
            >
              <b>User Name:</b>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                ref={sessionName}
                placeholder="Enter your username"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm="3"
            >
              <b>Password:</b>
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                ref={sessionPassword}
                placeholder="Enter your password"
                required
              />
            </Col>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="btn-lg btn-block col-md-2 mx-auto d-block"
          >
            Login
          </Button>

          <div className="mt-3 text-center">
            New user? <Link to="/registration">Register here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
