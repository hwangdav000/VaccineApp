import * as actionTypes from '../actionTypes';

let initialState = {
  user: {
    _id: '',
    userName: '',
    password: '',
    address: '',
    mobile: '',
  },
  userList: [],
  login: false,
};

let userReducer = (state = initialState, action) => {
  switch (action.type) {
    // signup
    case actionTypes.ADD_USER_TO_STORE:
      return { ...state, user: action.payload };

    case actionTypes.ADD_USERS_TO_STORE:
      return { ...state, userList: action.payload };

    case actionTypes.UPDATE_LOGIN:
      return { ...state, login: true }; //new state dispatched to store upon update

    case actionTypes.RESET_LOGIN:
      return { ...state, login: false }; //new state dispatched to store upon update

    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: { _id: '', userName: '', password: '', address: '', mobile: '' },
      };
    default:
      return state;
  }
};

export default userReducer;
