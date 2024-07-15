import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  GetAllAppointmentsFromDB,
  ApproveAppointmentToDB,
  RejectAppointmentToDB,
} from '../../../state/Appointment/appointmentAction';
import { Button, Table, Container } from 'react-bootstrap';
import AppointmentViewItem from './AppointmentViewItemComponent';
import { GetAllHospitalVaccinesFromDB } from '../../../state/HospitalVaccine/hospitalVaccineAction';

const ApproveAppointment = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const dispatch = useDispatch();
  const appointments = useSelector(
    (store) => store.appointmentReducer.appointmentsList
  );
  const hospitalVaccineList = useSelector(
    (store) => store.hospitalVaccineReducer.hospitalVaccinesList
  );

  useEffect(() => {
    if (!accessToken) {
      console.log('Waiting for access token');
      return;
    }

    dispatch(GetAllAppointmentsFromDB(accessToken));
    dispatch(GetAllHospitalVaccinesFromDB(accessToken));
  }, [dispatch, accessToken]);

  const handleApprove = (id) => {
    dispatch(ApproveAppointmentToDB(id, accessToken));
  };

  const handleReject = (id) => {
    dispatch(RejectAppointmentToDB(id, accessToken));
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.approvalStatus === 'IN APPROVAL' &&
      appointment.completeStatus !== 'COMPLETED'
  );

  // Filter completed appointments
  const filteredAppointmentsComplete = appointments.filter(
    (appointment) =>
      appointment.approvalStatus === 'APPROVED' &&
      appointment.completeStatus === 'COMPLETED'
  );

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
        <div className="approve-appointment-container">
          <h1>Approve Appointments</h1>
          <Table
            striped
            bordered
            hover
            className="custom-table"
          >
            <thead>
              <tr>
                <th>Approval Id</th>
                <th>User Id</th>
                <th>Hospital Vaccine Id</th>
                <th>Appointment Date</th>
                <th>Complete Status</th>
                <th>Approval Status</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((item) => {
                const hVaccineDetail = hospitalVaccineList.find(
                  (hVaccine) => hVaccine._id === item.hospitalVaccineId
                );

                return (
                  <AppointmentViewItem
                    item={item}
                    hVaccineDetail={hVaccineDetail}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                    key={item._id} // Ensure the key prop is unique
                  />
                );
              })}
            </tbody>
          </Table>

          <br />
          <br />
          <h1>Completed Vaccinations</h1>
          <Table
            striped
            bordered
            hover
            className="custom-table"
          >
            <thead>
              <tr>
                <th>Approval Id</th>
                <th>User Id</th>
                <th>Hospital Vaccine Id</th>
                <th>Appointment Date</th>
                <th>Complete Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointmentsComplete.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.userId}</td>
                  <td>{item.hospitalVaccineId}</td>
                  <td>{item.appointmentDate}</td>
                  <td>{item.completeStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <br />
          <br />
          <h1>All Appointments</h1>
          <Table
            striped
            bordered
            hover
            className="custom-table"
          >
            <thead>
              <tr>
                <th>Approval Id</th>
                <th>User Id</th>
                <th>Hospital Vaccine Id</th>
                <th>Appointment Date</th>
                <th>Complete Status</th>
                <th>Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.userId}</td>
                  <td>{item.hospitalVaccineId}</td>
                  <td>{item.appointmentDate}</td>
                  <td>{item.completeStatus}</td>
                  <td>{item.approvalStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default ApproveAppointment;
