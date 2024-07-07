import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  SaveHospitalToDB,
  GetHospitalsFromDB,
} from '../../../state/Hospital/hospitalAction';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const Hospital = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);

  let hospitalList = useSelector((state) => state.hospitalReducer.hospitalList);
  const user = useSelector((store) => store.userReducer.user);

  let hospitalName = useRef('');
  let address = useRef('');
  let type = useRef('');
  let picURL = useRef('');
  let description = useRef('');

  const [showHospitals, setShowHospitals] = useState(false);

  let dispatchToDB = useDispatch();

  const handleButtonClick = () => {
    dispatchToDB(GetHospitalsFromDB(accessToken));
    setShowHospitals(true);
  };

  let saveHospital = (evt) => {
    let newHospital = {
      hospitalName: hospitalName.current.value,
      address: address.current.value,
      hospitalType: type.current.value,
      picURL: picURL.current.value,
      description: description.current.value,
    };

    dispatchToDB(SaveHospitalToDB(newHospital, accessToken));

    hospitalName.current.value = '';
    address.current.value = '';
    type.current.value = '';
    picURL.current.value = '';
    description.current.value = '';

    evt.preventDefault();
  };

  return (
    <>
      <Container className="componentClass">
        <h1>Save Hospital Page</h1>
        <Form className="col-md-8">
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Hospital Name:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={hospitalName}
                placeholder="Please enter hospital name"
                maxLength={40}
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
              <b>Address:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={address}
                placeholder="Please enter address"
                maxLength={40}
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
              <b>Hospital Type:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={type}
                placeholder="Please enter type"
                maxLength={40}
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
              <b>Picture URL:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={picURL}
                placeholder="Please enter picture URL"
                maxLength={500}
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
              <b>Description:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={description}
                placeholder="Please enter description of hospital"
                maxLength={300}
                required
              />
            </Col>
          </Form.Group>

          <Button
            variant="primary"
            onClick={saveHospital}
            className="col-md-2 button-one-line"
          >
            Save Hospital
          </Button>
        </Form>
      </Container>

      <Container className="componentClass">
        <h1>Get all Hospitals</h1>
        <Form className="col-md-8">
          <Button
            variant="primary"
            style={{ whiteSpace: 'nowrap', width: 'auto' }}
            onClick={handleButtonClick}
            className="col-md-2 button-one-line"
          >
            View All Hospitals
          </Button>
        </Form>

        {showHospitals && (
          <ul>
            {hospitalList.map((hospitalItem, index) => (
              <li key={index}>{hospitalItem.hospitalName}</li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
};

export default Hospital;
