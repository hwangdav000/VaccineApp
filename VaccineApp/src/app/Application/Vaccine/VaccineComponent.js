import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  GetVaccinesFromDB,
  SaveVaccineToDB,
} from '../../../state/Vaccine/vaccineAction';

import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const Vaccine = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);

  let vaccineList = useSelector((state) => state.vaccineReducer.vaccineList);
  const user = useSelector((store) => store.userReducer.user);

  let vaccineName = useRef('');
  let type = useRef('');
  let basePrice = useRef(0);
  let origin = useRef('');
  let baseDosesReq = useRef(0);
  let sideEffects = useRef('');
  let strainCoverage = useRef('');

  const [showVaccines, setShowVaccines] = useState(false);

  let dispatchToDB = useDispatch();

  const handleButtonClick = () => {
    dispatchToDB(GetVaccinesFromDB(accessToken));
    setShowVaccines(true);
  };

  let saveVaccine = (evt) => {
    let newVaccine = {
      vaccineName: vaccineName.current.value,
      type: type.current.value,
      basePrice: basePrice.current.value,
      origin: origin.current.value,
      baseDosesReq: baseDosesReq.current.value,
      sideEffects: sideEffects.current.value,
      strainCoverage: strainCoverage.current.value,
    };

    dispatchToDB(SaveVaccineToDB(newVaccine, accessToken));

    vaccineName.current.value = '';
    type.current.value = '';
    basePrice.current.value = '';
    origin.current.value = '';
    baseDosesReq.current.value = '';
    sideEffects.current.value = '';
    strainCoverage.current.value = '';

    evt.preventDefault();
  };

  return (
    <>
      <Container className="componentClass">
        <h1>Save Vaccine Page</h1>
        <Form className="col-md-8">
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Vaccine Name:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={vaccineName}
                placeholder="Please enter vaccine name"
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
              <b>Type:</b>
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
              <b>basePrice:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                ref={basePrice}
                placeholder="Please enter base price"
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
              <b>Origin:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={origin}
                placeholder="Please enter origin"
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
              <b>Base Doses Req:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={baseDosesReq}
                placeholder="Please enter base doses required"
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
              <b>Side Effects:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={sideEffects}
                placeholder="Please enter side effects"
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
              <b>Strain Coverage:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={strainCoverage}
                placeholder="Please enter strain coverage"
                maxLength={40}
                required
              />
            </Col>
          </Form.Group>

          {user.userName === 'ADMIN' && (
            <Button
              variant="primary"
              onClick={saveVaccine}
              className="col-md-2 button-one-line"
            >
              Save Vaccine
            </Button>
          )}
        </Form>
      </Container>

      <Container className="componentClass">
        <h1>Get all Vaccines</h1>
        <Form className="col-md-8">
          <Button
            variant="primary"
            style={{ whiteSpace: 'nowrap', width: 'auto' }}
            onClick={handleButtonClick}
            className="col-md-2 button-one-line"
          >
            View All Vaccines
          </Button>
        </Form>

        {showVaccines && (
          <ul>
            {vaccineList.map((vaccineItem, index) => (
              <li key={index}>{vaccineItem.vaccineName}</li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
};

export default Vaccine;
