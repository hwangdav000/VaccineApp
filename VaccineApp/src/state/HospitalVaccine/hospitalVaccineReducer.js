import * as actionTypes from '../actionTypes';

let initialState = {
  hospitalVaccinesList: [],
};

let hospitalVaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    // signup
    case actionTypes.ADD_HOSPITAL_VACCINES_TO_STORE:
      return { ...state, hospitalVaccinesList: action.payload };

    default:
      return state;
  }
};

export default hospitalVaccineReducer;
