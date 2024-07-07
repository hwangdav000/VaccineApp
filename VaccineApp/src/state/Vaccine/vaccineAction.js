import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddVaccinesToStore = (vaccines) => {
  return {
    type: actionTypes.ADD_VACCINES_TO_STORE,
    payload: vaccines,
  };
};

export const SaveVaccineToDB = (newVaccine, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post('http://localhost:9000/vaccine/api/saveVaccine', newVaccine, config)
      .then((collection) => {
        let loggedVaccine = collection.data;
        console.log('logged vaccine ', loggedVaccine);
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const GetVaccinesFromDB = (accessToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get('http://localhost:9000/vaccine/api/getVaccines', config)
      .then((response) => {
        const vaccines = response.data;
        dispatch(AddVaccinesToStore(vaccines));
      })
      .catch((error) => {
        console.error('Error fetching vaccines:', error);
      });
  };
};
