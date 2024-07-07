import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppointmentItem from './AppointmentItemComponent';
import { GetAllHospitalVaccinesFromDB } from '../../../state/HospitalVaccine/hospitalVaccineAction';
import { GetHospitalsFromDB } from '../../../state/Hospital/hospitalAction';
import { GetVaccinesFromDB } from '../../../state/Vaccine/vaccineAction';
import { Col, Row } from 'react-bootstrap';

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

  return (
    <>
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
          const vaccineName = vaccine ? vaccine.vaccineName : 'Unknown Vaccine';

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
    </>
  );
};

export default MakeAppointment;
