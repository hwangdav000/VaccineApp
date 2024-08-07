import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetAppointmentsFromDB } from '../../../state/Appointment/appointmentAction';
import { Table, Container } from 'react-bootstrap';
import AppointmentUserViewItem from './AppointmentUserViewItemComponent';
import { GetAllHospitalVaccinesFromDB } from '../../../state/HospitalVaccine/hospitalVaccineAction';
import { GetHospitalsFromDB } from '../../../state/Hospital/hospitalAction';
import { GetVaccinesFromDB } from '../../../state/Vaccine/vaccineAction';

const UserAppointments = () => {
  const backgroundImg =
    'https://images.unsplash.com/photo-1494516192674-b82b5f1e61dc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);
  const hospitalList = useSelector(
    (store) => store.hospitalReducer.hospitalList
  );
  const vaccinesList = useSelector((store) => store.vaccineReducer.vaccineList);
  const appointments = useSelector(
    (store) => store.appointmentReducer.appointmentsList
  );
  const hospitalVaccineList = useSelector(
    (store) => store.hospitalVaccineReducer.hospitalVaccinesList
  );
  const dispatchToDB = useDispatch();
  console.log(appointments);
  // ensure that appointments are filtered by user
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.userId === user._id
  );

  useEffect(() => {
    if (!accessToken) {
      console.log('Waiting for access token...');
      return;
    }
    dispatchToDB(GetHospitalsFromDB(accessToken));
    dispatchToDB(GetVaccinesFromDB(accessToken));
    dispatchToDB(GetAppointmentsFromDB(user._id, accessToken));
    dispatchToDB(GetAllHospitalVaccinesFromDB(accessToken));
  }, [dispatchToDB, accessToken, user._id]);

  if (!filteredAppointments || filteredAppointments.length === 0) {
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
        <Container className="d-flex justify-content-center align-items-start min-vh-100 mt-5">
          <div className="p-4 user-appointment-container">
            <h1 className="text-center mb-3">No Appointments Found</h1>
            <Container className="my-5 text-center">
              <h2>Schedule an appointment to view</h2>
            </Container>
          </div>
        </Container>
      </div>
    );
  }

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
      <Container className="d-flex justify-content-center align-items-start min-vh-100 mt-5">
        <div className="p-4 user-appointment-container">
          <h1 className="text-center mb-3">My Appointments</h1>
          <Table
            striped
            bordered
            hover
            responsive
            class_name="custom-table"
          >
            {/* Added responsive class for mobile devices */}
            <thead>
              <tr>
                <th>Approval Id</th>
                <th>User Name</th>
                <th>Hospital</th>
                <th>Vaccine</th>
                <th>Appointment Date</th>
                <th>Approval Status</th>
                <th>Complete Status</th>
                <th>Certificate Download</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((item) => {
                const hVaccineDetail = hospitalVaccineList.find(
                  (hVaccine) => hVaccine._id === item.hospitalVaccineId
                );
                if (!hVaccineDetail) {
                  return null;
                }

                const hospital = hospitalList.find(
                  (h) => hVaccineDetail.hospitalId === h._id
                );
                const vaccine = vaccinesList.find(
                  (v) => hVaccineDetail.vaccineId === v._id
                );

                const hospitalName = hospital
                  ? hospital.hospitalName
                  : 'Unknown Hospital';
                const vaccineName = vaccine
                  ? vaccine.vaccineName
                  : 'Unknown Vaccine';

                return (
                  <AppointmentUserViewItem
                    item={item}
                    hVaccineDetail={hVaccineDetail}
                    hospitalName={hospitalName}
                    vaccineName={vaccineName}
                    key={item._id} // Ensure the key prop is unique
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default UserAppointments;
