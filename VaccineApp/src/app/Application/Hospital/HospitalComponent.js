import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SaveHospitalToDB,
  GetHospitalsFromDB,
} from '../../../state/Hospital/hospitalAction';
import { Form, Container, Row, Col, Button, Table } from 'react-bootstrap';

const Hospital = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const dispatch = useDispatch();
  const hospitalList = useSelector(
    (store) => store.hospitalReducer.hospitalList
  );
  console.log(hospitalList);

  useEffect(() => {
    dispatch(GetHospitalsFromDB(accessToken));
  }, [dispatch, accessToken]);

  const hospitalNameRef = useRef('');
  const addressRef = useRef('');
  const typeRef = useRef('');
  const picURLRef = useRef('');
  const descriptionRef = useRef('');

  const [showHospitals, setShowHospitals] = useState(false);

  const saveHospital = (evt) => {
    evt.preventDefault();
    const newHospital = {
      hospitalName: hospitalNameRef.current.value,
      address: addressRef.current.value,
      hospitalType: typeRef.current.value,
      picURL: picURLRef.current.value,
      description: descriptionRef.current.value,
    };

    dispatch(SaveHospitalToDB(newHospital, accessToken));

    // Clear input fields after saving
    hospitalNameRef.current.value = '';
    addressRef.current.value = '';
    typeRef.current.value = '';
    picURLRef.current.value = '';
    descriptionRef.current.value = '';
  };

  const backgroundImg =
    'https://images.unsplash.com/photo-1670502394307-fd0781f280e5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="p-4 hospital-container"
          style={{ maxWidth: '800px', width: '100%' }}
        >
          {showHospitals && (
            <div className="mt-4">
              <h1 className="text-center mb-4">All Hospitals</h1>
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
                    <th>Hospital Name</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitalList.map((hospitalItem, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{hospitalItem.hospitalName}</td>
                      <td>{hospitalItem.address}</td>
                      <td>{hospitalItem.hospitalType}</td>
                      <td>{hospitalItem.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <div className="mb-4">
            <h1 className="text-center mb-4">Add Hospital</h1>
            <Form onSubmit={saveHospital}>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label
                  column
                  sm={3}
                >
                  <b>Hospital Name:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={hospitalNameRef}
                    placeholder="Enter hospital name"
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
                  <b>Address:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={addressRef}
                    placeholder="Enter address"
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
                  <b>Hospital Type:</b>
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
                  <b>Picture URL:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={picURLRef}
                    placeholder="Enter picture URL"
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
                  sm={3}
                >
                  <b>Description:</b>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    ref={descriptionRef}
                    placeholder="Enter description"
                    maxLength={300}
                    required
                  />
                </Col>
              </Form.Group>

              <Row>
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    type="submit"
                    className="me-2 button-one-line"
                  >
                    Save Hospital
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setShowHospitals(!showHospitals)}
                    className="button-one-line"
                  >
                    {showHospitals ? 'Hide Hospitals' : 'Show Hospitals'}
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

export default Hospital;
