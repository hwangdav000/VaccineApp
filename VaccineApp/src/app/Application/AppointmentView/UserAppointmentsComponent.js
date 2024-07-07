import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetAppointmentsFromDB } from '../../../state/Appointment/appointmentAction';
import { Button, Table } from 'react-bootstrap';
import AppointmentUserViewItem from './AppointmentUserViewItemComponent';
import { GetAllHospitalVaccinesFromDB } from '../../../state/HospitalVaccine/hospitalVaccineAction';
import { GetHospitalsFromDB } from '../../../state/Hospital/hospitalAction';
import { GetVaccinesFromDB } from '../../../state/Vaccine/vaccineAction';

const UserAppointments = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);

  const hospitalList = useSelector(
    (store) => store.hospitalReducer.hospitalList
  );
  const vaccinesList = useSelector((store) => store.vaccineReducer.vaccineList);

  // Get appointments
  const appointments = useSelector(
    (store) => store.appointmentReducer.appointmentsList
  );
  const hospitalVaccineList = useSelector(
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
    dispatchToDB(GetAppointmentsFromDB(user._id, accessToken));
    dispatchToDB(GetAllHospitalVaccinesFromDB(accessToken));
  }, [dispatchToDB, accessToken]);

  return (
    <>
      <div>
        <h1>My Appointments</h1>
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
              <th>Approval Status</th>
              <th>Complete Status</th>
              <th>Certificate Download</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => {
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
    </>
  );
};

export default UserAppointments;
