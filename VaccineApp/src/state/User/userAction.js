import * as actionTypes from '../actionTypes';
import { AddTokenToStore } from '../Token/tokenAction.js';
import axios from 'axios';

export const AddUserToStore = (user) => {
  return {
    type: actionTypes.ADD_USER_TO_STORE,
    payload: user,
  };
};

export const AddUsersToStore = (users) => {
  return {
    type: actionTypes.ADD_USERS_TO_STORE,
    payload: users,
  };
};

export const LoginUserToStore = (user) => {
  return {
    type: actionTypes.LOGIN_USER,
    payload: user,
  };
};

export const UpdateLoginToStore = (state) => {
  return {
    type: actionTypes.UPDATE_LOGIN,
    payload: state,
  };
};

export const LogoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

export const LoginUserDB = (user) => {
  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/user/api/login', //uri or end point of singninup api
        user // the user state object we dispatch from the user component
      )
      .then((collection) => {
        let loggedUser = collection.data.existingUser;
        let accessToken = collection.data.accessToken;
        let refreshToken = collection.data.refreshToken;

        dispatch(UpdateLoginToStore(true));
        dispatch(AddUserToStore(loggedUser));
        dispatch(AddTokenToStore({ accessToken, refreshToken }));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};

//server call
//to save user to mongo db and do sign-in or sign up
export const SaveUserToDB = (newUser) => {
  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/user/api/signinup', //uri or end point of singninup api
        newUser // the user state object we dispatch from the user component
      )
      .then((collection) => {
        let loggedUser = collection.data;
        dispatch(UpdateLoginToStore(true));
        dispatch(AddUserToStore(loggedUser));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};

export const SaveUserToDBUsingFetch = (newUser) => {
  return (dispatch) => {
    window
      .fetch('http://localhost:9000/user/api/signinup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      .then((response) => response.json())
      .then((collection) => {
        console.log(collection);
        let userData = collection.newUser;
        let accessToken = collection.accessToken;
        let refreshToken = collection.refreshToken;
        dispatch(UpdateLoginToStore(true));
        dispatch(AddUserToStore(userData));
        dispatch(AddTokenToStore({ accessToken, refreshToken }));
        return true;
      })
      .catch((err) => {
        console.log('error while logging in ', err);
        return false;
      });
  };
};

export const GetUsersFromDB = (accessToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get('http://localhost:9000/user/api/getAllUsers', config)
      .then((response) => {
        const users = response.data;
        dispatch(AddUsersToStore(users));
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };
};
