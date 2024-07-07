import * as actionTypes from '../actionTypes';

let initialState = {
  appointment: {
    userId: 0,
    appointmentDate: '',
    hospitalId: '',
    hospitalName: '',
    vaccineId: '',
    vaccineName: '',
    price: '',
    userName: '',
    dosesRequired: 0,
  },
  appointmentsList: [],
};

let appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_APPOINTMENT:
      return {
        ...state,
        appointmentsList: [...state.appointmentsList, action.payload],
      };

    case actionTypes.GET_APPOINTMENTS:
      return { ...state, appointmentsList: action.payload };

    default:
      return state;
  }
};

export default appointmentReducer;
