import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Container, Row, Col, Button, Table } from 'react-bootstrap';
import {
  SaveVaccineToDB,
  GetVaccinesFromDB,
} from '../../../state/Vaccine/vaccineAction';

const Vaccine = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const dispatch = useDispatch();
  const vaccineList = useSelector((store) => store.vaccineReducer.vaccineList);

  useEffect(() => {
    dispatch(GetVaccinesFromDB(accessToken));
  }, [dispatch, accessToken]);

  const vaccineNameRef = useRef('');
  const typeRef = useRef('');
  const basePriceRef = useRef('');
  const originRef = useRef('');
  const baseDosesReqRef = useRef('');
  const sideEffectsRef = useRef('');
  const strainCoverageRef = useRef('');

  const [showVaccines, setShowVaccines] = useState(false);

  const saveVaccine = (evt) => {
    evt.preventDefault();

    const newVaccine = {
      vaccineName: vaccineNameRef.current.value,
      type: typeRef.current.value,
      basePrice: basePriceRef.current.value,
      origin: originRef.current.value,
      baseDosesReq: baseDosesReqRef.current.value,
      sideEffects: sideEffectsRef.current.value,
      strainCoverage: strainCoverageRef.current.value,
    };

    dispatch(SaveVaccineToDB(newVaccine, accessToken));

    // Clear input fields after saving
    vaccineNameRef.current.value = '';
    typeRef.current.value = '';
    basePriceRef.current.value = '';
    originRef.current.value = '';
    baseDosesReqRef.current.value = '';
    sideEffectsRef.current.value = '';
    strainCoverageRef.current.value = '';
  };

  const backgroundImg =
    'https://images.unsplash.com/photo-1670502394307-fd0781f280e5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="main-content"
    >
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="p-4 vaccine-container"
          style={{ maxWidth: '800px', width: '100%' }}
        >
          {showVaccines && (
            <div className="mt-4">
              <h1 className="text-center mb-4">All Vaccines</h1>
              <Table
                striped
                bordered
                hover
                responsive
                className="custom-table"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vaccine Name</th>
                    <th>Type</th>
                    <th>Base Price</th>
                    <th>Origin</th>
                    <th>Base Doses Req</th>
                    <th>Side Effects</th>
                    <th>Strain Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccineList.map((vaccine, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{vaccine.vaccineName}</td>
                      <td>{vaccine.type}</td>
                      <td>{vaccine.basePrice}</td>
                      <td>{vaccine.origin}</td>
                      <td>{vaccine.baseDosesReq}</td>
                      <td>{vaccine.sideEffects}</td>
                      <td>{vaccine.strainCoverage}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <div className="mb-4">
            <h1 className="text-center mb-4">Add Vaccine</h1>
            <Form onSubmit={saveVaccine}>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label
                  column
                  sm={3}
                >
                  <b>Vaccine Name:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={vaccineNameRef}
                    placeholder="Enter vaccine name"
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
                  sm={3}
                >
                  <b>Type:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={typeRef}
                    placeholder="Enter type"
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
                  sm={3}
                >
                  <b>Base Price:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="number"
                    ref={basePriceRef}
                    placeholder="Enter base price"
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
                  sm={3}
                >
                  <b>Origin:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={originRef}
                    placeholder="Enter origin"
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
                  sm={3}
                >
                  <b>Base Doses Req:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={baseDosesReqRef}
                    placeholder="Enter base doses required"
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
                  sm={3}
                >
                  <b>Side Effects:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={sideEffectsRef}
                    placeholder="Enter side effects"
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
                  sm={3}
                >
                  <b>Strain Coverage:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={strainCoverageRef}
                    placeholder="Enter strain coverage"
                    maxLength={40}
                    required
                  />
                </Col>
              </Form.Group>

              <Row>
                <Col className="text-end">
                  <Button
                    variant="primary"
                    type="submit"
                    className="me-2"
                  >
                    Save Vaccine
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setShowVaccines(!showVaccines)}
                  >
                    {showVaccines ? 'Hide Vaccines' : 'Show Vaccines'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Vaccine;
