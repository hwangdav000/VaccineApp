import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GetHospitalsFromDB } from '../../../state/Hospital/hospitalAction';
import { GetVaccinesFromDB } from '../../../state/Vaccine/vaccineAction';
import {
  SaveHospitalVaccineToDB,
  GetHospitalVaccinesFromDB,
} from '../../../state/HospitalVaccine/hospitalVaccineAction';
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Table,
  Alert,
} from 'react-bootstrap';

const VaccineManagement = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const dispatch = useDispatch();
  const hospitalList = useSelector(
    (store) => store.hospitalReducer.hospitalList
  );
  const vaccinesList = useSelector((store) => store.vaccineReducer.vaccineList);
  const hospitalVaccineList = useSelector(
    (store) => store.hospitalVaccineReducer.hospitalVaccinesList
  );

  const [selectedHospital, setSelectedHospital] = useState('');
  const [vaccines, setVaccines] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    vaccineId: '',
    price: '',
    dosesRequired: '',
  });
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  useEffect(() => {
    dispatch(GetHospitalsFromDB(accessToken));
    dispatch(GetVaccinesFromDB(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (hospitalVaccineList && hospitalVaccineList.length > 0) {
      setVaccines([...hospitalVaccineList]);
    }
  }, [hospitalVaccineList]);

  const handleHospitalChange = (event) => {
    const hospitalId = event.target.value;
    setSelectedHospital(hospitalId);
    setVaccines([]);

    if (hospitalId) {
      dispatch(GetHospitalVaccinesFromDB(hospitalId, accessToken));
    }
  };

  const handleAddVaccine = () => {
    const updatedVaccines = [...vaccines, { ...newVaccine }];
    setVaccines(updatedVaccines);
    setNewVaccine({
      vaccineId: '',
      price: '',
      dosesRequired: '',
    });
  };

  const handleDeleteVaccine = (index) => {
    const updatedVaccines = [...vaccines];
    updatedVaccines.splice(index, 1);
    setVaccines(updatedVaccines);
  };

  const handleSaveChanges = () => {
    const newHospitalVaccineList = {
      hospitalId: selectedHospital,
      vaccines: vaccines,
    };

    dispatch(SaveHospitalVaccineToDB(newHospitalVaccineList, accessToken));
    setShowSavedMessage(true);
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 2000);
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
          className="p-4 hospital-vaccine-container"
          style={{ maxWidth: '800px', width: '100%' }}
        >
          <h2 className="my-4">Vaccine Management</h2>

          {/* Hospital Selector Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="hospitalSelect">Select Hospital:</Form.Label>
            <Form.Select
              id="hospitalSelect"
              value={selectedHospital}
              onChange={handleHospitalChange}
            >
              <option
                value=""
                style={{ display: 'none' }}
              >
                Select Hospital
              </option>
              {hospitalList.map((hospital) => (
                <option
                  key={hospital._id}
                  value={hospital._id}
                >
                  {hospital.hospitalName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Vaccine Table */}
          {selectedHospital && (
            <Table
              striped
              bordered
              hover
              responsive
              className="custom-table"
            >
              <thead>
                <tr>
                  <th>Vaccine</th>
                  <th>Price</th>
                  <th>Doses Required</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((vaccine, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Select
                        value={vaccine.vaccineId}
                        onChange={(e) => {
                          const selectedVaccineId = e.target.value;
                          const updatedVaccines = [...vaccines];
                          updatedVaccines[index].vaccineId = selectedVaccineId;
                          setVaccines(updatedVaccines);
                        }}
                      >
                        <option
                          value=""
                          style={{ display: 'none' }}
                        >
                          Select Vaccine
                        </option>
                        {vaccinesList.map((vaccineOption) => (
                          <option
                            key={vaccineOption._id}
                            value={vaccineOption._id}
                          >
                            {vaccineOption.vaccineName}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={vaccine.price}
                        onChange={(e) => {
                          const updatedVaccines = [...vaccines];
                          updatedVaccines[index].price = e.target.value;
                          setVaccines(updatedVaccines);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={vaccine.dosesRequired}
                        onChange={(e) => {
                          const updatedVaccines = [...vaccines];
                          updatedVaccines[index].dosesRequired = e.target.value;
                          setVaccines(updatedVaccines);
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteVaccine(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <div className="my-4">
            {/* Add Vaccine Button */}
            {selectedHospital && (
              <Button
                variant="primary"
                className="me-2"
                onClick={handleAddVaccine}
              >
                Add Vaccine
              </Button>
            )}

            {/* Save Button */}
            {selectedHospital && (
              <Button
                variant="success"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            )}
          </div>
          {showSavedMessage && (
            <Alert
              variant="success"
              className="my-3"
            >
              Changes have been saved.
            </Alert>
          )}
        </div>
      </Container>
    </div>
  );
};

export default VaccineManagement;
