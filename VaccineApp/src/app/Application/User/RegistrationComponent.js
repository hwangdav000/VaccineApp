import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { SaveUserToDBUsingFetch } from '../../../state/User/userAction';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((store) => store.userReducer.login);
  const [userData, setUserData] = useState({
    userName: '',
    password: '',
    fullName: '',
    address: '',
    mobile: '',
    age: '',
    gender: '',
    disease: '',
    profession: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const signUpUser = (evt) => {
    evt.preventDefault();
    dispatch(SaveUserToDBUsingFetch(userData));

    setUserData({
      userName: '',
      password: '',
      fullName: '',
      address: '',
      mobile: '',
      age: '',
      gender: '',
      disease: '',
      profession: '',
    });
  };
  console.log('login state is ' + loginState);

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
    'https://images.unsplash.com/photo-1492892132812-a00a8b245c45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="main-content"
    >
      <Container className="py-5">
        <Form className="custom-form">
          <h1 className="mb-4 text-center">Get Started Now!</h1>
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm="3"
            >
              User Name:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="userName"
                value={userData.userName}
                placeholder="Enter your username"
                onChange={handleChange}
                maxLength={40}
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
              Password:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                name="password"
                value={userData.password}
                placeholder="Enter your password"
                onChange={handleChange}
                maxLength={40}
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
              Full Name:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="fullName"
                value={userData.fullName}
                placeholder="Enter your full name"
                onChange={handleChange}
                maxLength={100}
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
              Address:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="address"
                value={userData.address}
                placeholder="Enter your address"
                onChange={handleChange}
                maxLength={100}
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
              Mobile:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="mobile"
                value={userData.mobile}
                placeholder="Enter your mobile number"
                onChange={handleChange}
                maxLength={11}
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
              Age:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                name="age"
                value={userData.age}
                placeholder="Enter your age"
                onChange={handleChange}
                min="0"
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
              Gender:
            </Form.Label>
            <Col sm="9">
              <Form.Select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
              >
                <option
                  value=""
                  style={{ display: 'none' }}
                >
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
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
              Disease:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="disease"
                value={userData.disease}
                placeholder="Enter any existing disease (if applicable)"
                onChange={handleChange}
                maxLength={100}
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
              Profession:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="profession"
                value={userData.profession}
                placeholder="Enter your profession"
                onChange={handleChange}
                maxLength={100}
              />
            </Col>
          </Form.Group>

          <Button
            variant="primary"
            onClick={signUpUser}
            className="col-md-2 mx-auto d-block"
          >
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Registration;
