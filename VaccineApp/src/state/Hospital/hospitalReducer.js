import * as actionTypes from '../actionTypes';

let initialState = {
  hospitalPicURL: '',
  hospitalList: [],
};

let hospitalReducer = (state = initialState, action) => {
  switch (action.type) {
    // signup
    case actionTypes.ADD_HOSPITALS_TO_STORE:
      return { ...state, hospitalList: action.payload };

    case actionTypes.ADD_HOSPITAL_TO_STORE:
      return {
        ...state,
        hospitalList: [...state.hospitalList, action.payload],
      };

    case actionTypes.ADD_PICURL_TO_STORE:
      return { ...state, hospitalPicURL: action.payload };
    default:
      return state;
  }
};

export default hospitalReducer;
