import * as actionTypes from '../actionTypes';

let initialState = {
  user: {
    _id: '667c49cbbe3b4ec49f5f9d2b',
    userName: 'ADMIN',
    password: 'password',
    address: 'street',
    mobile: 111,
  },
};

let userReducer = (state = initialState, action) => {
  switch (action.type) {
    // signup
    case actionTypes.ADD_USER_TO_STORE:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default userReducer;
