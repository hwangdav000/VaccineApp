import * as actionTypes from '../actionTypes.js';
import { AddTokenToStore } from '../Token/tokenAction.js';
import axios from 'axios';

export const AddHospitalVaccineToStore = (vaccines) => {
  return {
    type: actionTypes.ADD_HOSPITAL_VACCINES_TO_STORE,
    payload: vaccines,
  };
};

export const SaveHospitalVaccineToDB = (newHospitalVaccine, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/hospitalVaccine/api/saveHospitalVaccine',
        newHospitalVaccine,
        config
      )
      .then((collection) => {
        let loggedVaccine = collection.data;
        console.log('logged vaccine ', loggedVaccine);
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const GetHospitalVaccinesFromDB = (hospitalId, accessToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(
        `http://localhost:9000/hospitalVaccine/api/getHospitalVaccines/${hospitalId}`,
        config
      )
      .then((response) => {
        const vaccines = response.data;
        dispatch(AddHospitalVaccineToStore(vaccines));
      })
      .catch((error) => {
        console.error('Error fetching vaccines:', error);
      });
  };
};

export const GetAllHospitalVaccinesFromDB = (accessToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(
        'http://localhost:9000/hospitalVaccine/api/getAllHospitalVaccines',
        config
      )
      .then((response) => {
        const vaccines = response.data;
        dispatch(AddHospitalVaccineToStore(vaccines));
      })
      .catch((error) => {
        console.error('Error fetching vaccines:', error);
      });
  };
};
