import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

// Register Actions
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }

    //console.log("User", user);
    dispatch(registerSuccess(user));

    // Return the full user object to resolve the promise
    return user;
  } catch (error) {
    dispatch(registerFailure(error.message));

    // Throw an error to reject the promise
    throw new Error(error.message);
  }
};

// Login Actions
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    // if (user.jwt) {
    //   localStorage.setItem("jwt", user.jwt);
    // }
    localStorage.setItem("jwt",user.jwt)
    //console.log("User", user);
    dispatch(loginSuccess(user));

    // Return the full user object to resolve the promise
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));

    // Throw an error to reject the promise
    throw new Error(error.message);
  }
};

// Get User Actions
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;

   // console.log("User", user);
    dispatch(getUserSuccess(user));

    // Return the user profile data to resolve the promise
    return user;
  } catch (error) {
    dispatch(getUserFailure(error.message));

    // Throw an error to reject the promise
    throw new Error(error.message);
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();

  // Return a resolved promise for logout
  return Promise.resolve();
};
