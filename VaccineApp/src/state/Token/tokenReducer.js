import * as actionTypes from '../actionTypes';

let initialState = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjdjNDljYmJlM2I0ZWM0OWY1ZjlkMmIiLCJpYXQiOjE3MjEwMTAxNDUsImV4cCI6MTcyMTI2OTM0NX0.BDdfcBucUOMC5M6nAKVtTETPJpSHc0G1Ky8xXiq2kRU',
  refreshToken: '',
};

let tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOKEN_TO_STORE:
      const { accessToken, refreshToken } = action.payload;
      return { ...state, accessToken, refreshToken };

    default:
      return state;
  }
};

export default tokenReducer;
