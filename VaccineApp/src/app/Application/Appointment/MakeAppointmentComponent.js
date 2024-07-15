import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppointmentItem from './AppointmentItemComponent';
import { GetAllHospitalVaccinesFromDB } from '../../../state/HospitalVaccine/hospitalVaccineAction';
import { GetHospitalsFromDB } from '../../../state/Hospital/hospitalAction';
import { GetVaccinesFromDB } from '../../../state/Vaccine/vaccineAction';
import { Table, Col, Row, Container } from 'react-bootstrap';

const MakeAppointment = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const hospitalList = useSelector(
    (state) => state.hospitalReducer.hospitalList
  );
  const vaccineList = useSelector((state) => state.vaccineReducer.vaccineList);
  const hospitalVaccine = useSelector(
    (store) => store.hospitalVaccineReducer.hospitalVaccinesList
  );

  const dispatchToDB = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }
    dispatchToDB(GetHospitalsFromDB(accessToken));
    dispatchToDB(GetVaccinesFromDB(accessToken));
    dispatchToDB(GetAllHospitalVaccinesFromDB(accessToken));
  }, [dispatchToDB, accessToken]);
  const backgroundImg =
    'https://images.unsplash.com/photo-1494185728463-86366f396213?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
      }}
      className="main-content"
    >
      <Container className="d-flex justify-content-center align-items-start min-vh-100 mt-5">
        <div className="p-4 user-appointment-container">
          <h1>Make a Vaccination Appointment Today!</h1>
          <Row
            md={2}
            xs={1}
            lg={3}
            className="g-3"
          >
            {hospitalVaccine.map((item) => {
              const hospital = hospitalList.find(
                (hospital) => hospital._id === item.hospitalId
              );
              const vaccine = vaccineList.find(
                (vaccine) => vaccine._id === item.vaccineId
              );
              const hospitalName = hospital
                ? hospital.hospitalName
                : 'Unknown Hospital';
              const picURL = hospital ? hospital.picURL : '';
              const vaccineName = vaccine
                ? vaccine.vaccineName
                : 'Unknown Vaccine';

              return (
                <Col key={item._id}>
                  <AppointmentItem
                    {...item}
                    hospitalName={hospitalName}
                    vaccineName={vaccineName}
                    picURL={picURL}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MakeAppointment;
