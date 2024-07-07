import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllAppointmentsFromDB } from '../../../state/Appointment/appointmentAction';
import { Button, Table } from 'react-bootstrap';
import AppointmentViewItem from './AppointmentViewItemComponent';
import { GetAllHospitalVaccinesFromDB } from '../../../state/HospitalVaccine/hospitalVaccineAction';
import {
  RejectAppointmentToDB,
  ApproveAppointmentToDB,
} from '../../../state/Appointment/appointmentAction';

const ApproveAppointment = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);

  // Get appointments
  const appointments = useSelector(
    (store) => store.appointmentReducer.appointmentsList
  );
  const hospitalVaccineList = useSelector(
    (store) => store.hospitalVaccineReducer.hospitalVaccinesList
  );

  const handleApprove = (id) => {
    dispatchToDB(ApproveAppointmentToDB(id, accessToken));
  };

  const handleReject = (id) => {
    dispatchToDB(RejectAppointmentToDB(id, accessToken));
  };

  // Filter appointments with approvalStatus "IN APPROVAL"
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.approvalStatus === 'IN APPROVAL' &&
      appointment.completeStatus !== 'COMPLETED'
  );

  // Filter appointments with approvalStatus "IN APPROVAL"
  const filteredAppointmentsComplete = appointments.filter(
    (appointment) =>
      appointment.approvalStatus === 'APPROVED' &&
      appointment.completeStatus === 'COMPLETED'
  );

  const dispatchToDB = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }

    dispatchToDB(GetAllAppointmentsFromDB(accessToken));
    dispatchToDB(GetAllHospitalVaccinesFromDB(accessToken));
  }, [dispatchToDB, accessToken]);

  return (
    <>
      <div>
        <h1>Approve Appointments</h1>
        <Table
          striped
          bordered
          hover
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
                {/* Ensure the key prop is unique */}
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
                {/* Ensure the key prop is unique */}
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
    </>
  );
};

export default ApproveAppointment;
