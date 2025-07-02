import axios from "axios";
import { api } from "../../config/apiConfig";
import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, GET_ADDRESSES_FAILURE, GET_ADDRESSES_REQUEST, GET_ADDRESSES_SUCCESS, SELECT_ADDRESS } from "./ActionType";


export const createAddress = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/api/addresses", formData);
    const address = res.data.data; //  extract the actual address

    dispatch({
      type: CREATE_ADDRESS_SUCCESS,
      payload: address, //  send the correct payload to reducer
    });

    return { payload: address }; //  so that DeliveryAddressForm gets it clean
  } catch (error) {
    dispatch({
      type: CREATE_ADDRESS_FAILURE,
      payload: error.message,
    });
    return { error: error.message };
  }
};


// Get all addresses of the user
export const getUserAddresses = () => async (dispatch) => {
  dispatch({ type: GET_ADDRESSES_REQUEST });
  try {
    const res = await api.get("/api/addresses"); // GET http://localhost:5001/api/addresses
    dispatch({ type: GET_ADDRESSES_SUCCESS, payload: res.data });
   
  } catch (error) {
    dispatch({
      type: GET_ADDRESSES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete an address
export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch({ type: DELETE_ADDRESS_REQUEST });
  try {
    await api.delete(`/api/addresses/${addressId}`); // DELETE http://localhost:5001/api/addresses/:id
    dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: addressId });
    dispatch(getUserAddresses()); // Refresh address list
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const selectAddress = (address) => {
  console.log("Selected Address:", address); 
  return {
    type: SELECT_ADDRESS,
    payload: address,
  };
};
