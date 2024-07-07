//action - is an object with two properties - type and payload
import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddAppointment = (appointment) => {
  return {
    type: actionTypes.ADD_APPOINTMENT,
    payload: appointment,
  };
};

export const GetAppointments = (appointments) => {
  return {
    type: actionTypes.GET_APPOINTMENTS,
    payload: appointments,
  };
};

export const SaveAppointmentToDB = (appointment, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/appointment/api/saveAppointment',
        appointment,
        config
      )
      .then((response) => {
        let loggedAppointment = response.data;
        dispatch(AddAppointment(loggedAppointment));
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const GetAllAppointmentsFromDB = (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    const path = `http://localhost:9000/appointment/api/getAllAppointments`;

    axios
      .get(path, config)
      .then((response) => {
        const appointments = response.data;
        dispatch(GetAppointments(appointments));
        console.log('Appointment retrieved from DB:', appointments);
      })
      .catch((error) => {
        console.error(
          'Error fetching order:',
          error.response ? error.response.data : error.message
        );
      });
  };
};

export const GetAppointmentsFromDB = (userId, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    const path = `http://localhost:9000/appointment/api/getAppointments/${userId}`;

    axios
      .get(path, config)
      .then((response) => {
        const appointments = response.data;
        dispatch(GetAppointments(appointments));
        console.log('Appointment retrieved from DB:', appointments);
      })
      .catch((error) => {
        console.error(
          'Error fetching order:',
          error.response ? error.response.data : error.message
        );
      });
  };
};

export const RejectAppointmentToDB = (appointmentId, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        `http://localhost:9000/appointment/api/rejectAppointment/${appointmentId}`,
        {},
        config
      )
      .then((response) => {
        let loggedAppointment = response.data;
        console.log('logged appointment', loggedAppointment);

        dispatch(GetAllAppointmentsFromDB(accessToken));
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const ApproveAppointmentToDB = (appointmentId, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        `http://localhost:9000/appointment/api/approveAppointment/${appointmentId}`,
        {},
        config
      )
      .then((response) => {
        let loggedAppointment = response.data;
        console.log('logged appointment', loggedAppointment);

        dispatch(GetAllAppointmentsFromDB(accessToken));
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const CompleteAppointmentToDB = (appointmentId, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        `http://localhost:9000/appointment/api/completeAppointment/${appointmentId}`,
        {},
        config
      )
      .then((response) => {
        let loggedAppointment = response.data;
        console.log('logged appointment', loggedAppointment);

        dispatch(GetAllAppointmentsFromDB(accessToken));
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};
