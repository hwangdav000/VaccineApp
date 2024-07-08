import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SaveUserToDB,
  SaveUserToDBUsingFetch,
  LoginUserDB,
} from '../../../state/User/userAction';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserHook = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);

  let [uName, setUserName] = useState('');
  let [pass, setPassword] = useState('');
  let [fullName, setFullName] = useState('');
  let [address, setAddress] = useState('');
  let [mobile, setPhone] = useState('');
  let [age, setAge] = useState('');
  let [gender, setGender] = useState('');
  let [disease, setDisease] = useState('');
  let [profession, setProfession] = useState('');

  let sessionName = useRef(null);
  let sessionPassword = useRef(null);

  let dispatchToDB = useDispatch();

  const onTextChange = (evt) => {
    setUserName(evt.target.value);
    evt.preventDefault();
  };

  const signUpUser = (evt) => {
    evt.preventDefault();
    let newUser = {
      userName: uName,
      password: pass,
      address,
      fullName,
      age,
      mobile,
      gender,
      disease,
      profession,
    };
    dispatchToDB(SaveUserToDBUsingFetch(newUser));
  };

  const loginUser = (evt) => {
    evt.preventDefault();

    let user = {
      userName: sessionName.current.value,
      password: sessionPassword.current.value,
    };

    dispatchToDB(LoginUserDB(user));
  };

  const readFormData = (evt) => {
    evt.preventDefault();
  };

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }
  }, [dispatchToDB, accessToken]);

  return (
    <>
      <Container className="componentClass">
        <h1>User Login Page</h1>
        <Form className="col-md-8">
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>User Name:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={uName}
                placeholder="User Name"
                onChange={onTextChange}
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
              sm={2}
            >
              <b>Password:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                value={pass}
                placeholder="Password"
                onChange={(evt) => setPassword(evt.target.value)}
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
              sm={2}
            >
              <b>Full Name:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={fullName}
                placeholder="Full Name"
                onChange={(evt) => setFullName(evt.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Address:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={address}
                placeholder="Address"
                onChange={(evt) => setAddress(evt.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Age:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                value={age}
                placeholder="Age"
                onChange={(evt) => setAge(evt.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Mobile:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={mobile}
                placeholder="Mobile"
                maxLength={11}
                onChange={(evt) => setPhone(evt.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Profession:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={profession}
                placeholder="Profession"
                maxLength={40}
                onChange={(evt) => setProfession(evt.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Gender:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={gender}
                onChange={(evt) => setGender(evt.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Disease:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={disease}
                placeholder="Disease"
                maxLength={40}
                onChange={(evt) => setDisease(evt.target.value)}
              />
            </Col>
          </Form.Group>

          <Button
            variant="primary"
            onClick={signUpUser}
            className="col-md-2 button-one-line"
          >
            Sign Up
          </Button>
        </Form>
      </Container>

      <Container className="componentClass login">
        <Form
          className="form col-md-10 userHook"
          onSubmit={readFormData}
        >
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>User Name:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={sessionName}
                placeholder="Please enter user name"
                maxLength={20}
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
              sm={2}
            >
              <b>Password:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                ref={sessionPassword}
                placeholder="Please enter password"
                maxLength={20}
                required
              />
            </Col>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={loginUser}
            className="col-md-2 button-one-line"
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UserHook;
