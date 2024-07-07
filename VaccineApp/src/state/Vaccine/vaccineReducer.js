import * as actionTypes from '../actionTypes';

let initialState = {
  vaccineList: [],
};

let vaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    // signup
    case actionTypes.ADD_VACCINES_TO_STORE:
      return { ...state, vaccineList: action.payload };

    default:
      return state;
  }
};

export default vaccineReducer;
