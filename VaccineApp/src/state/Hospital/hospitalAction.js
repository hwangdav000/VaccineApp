import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddHospitalsToStore = (hospitals) => {
  return {
    type: actionTypes.ADD_HOSPITALS_TO_STORE,
    payload: hospitals,
  };
};

export const AddPicURLToStore = (URL) => {
  return {
    type: actionTypes.ADD_PICURL_TO_STORE,
    payload: URL,
  };
};

export const SaveHospitalToDB = (newHospital, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/hospital/api/saveHospital',
        newHospital,
        config
      )
      .then((collection) => {
        let loggedHospital = collection.data;
        console.log('hospital saved', loggedHospital);
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const GetHospitalsFromDB = (accessToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get('http://localhost:9000/hospital/api/getHospitals', config)
      .then((response) => {
        const hospitals = response.data;
        dispatch(AddHospitalsToStore(hospitals));
      })
      .catch((error) => {
        console.error('Error fetching hospitals:', error);
      });
  };
};

export const GetHospitalPicURLFromDB = (hospitalId, accessToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(
        `http://localhost:9000/hospital/api/getHospitalPicURL/${hospitalId}`,
        config
      )
      .then((response) => {
        const picURL = response.data;
        dispatch(AddPicURLToStore(picURL));
      })
      .catch((error) => {
        console.error('Error fetching pic:', error);
      });
  };
};
