import { api } from "../../config/apiConfig";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  USER_ORDER_HISTORY_REQUEST,
  USER_ORDER_HISTORY_SUCCESS,
  USER_ORDER_HISTORY_FAILURE,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const payload = {
      shippingAddress: reqData.address,
      totalPrice: reqData.totalPrice,
      discount: reqData.discount,
      totalItems: reqData.totalItems,
      totalDiscountedPrice: reqData.totalDiscountedPrice,
    };
    const { data } = await api.post("/api/orders", payload);
    console.log("Created Order: ",data)
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    return { payload: data }; // Mimic Redux Toolkit structure
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: CREATE_ORDER_FAILURE, payload: errorMessage });
    return { error: errorMessage }; // Mimic Redux Toolkit structure
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};

export const userOrderHistory = () => async (dispatch) => {
  dispatch({ type: USER_ORDER_HISTORY_REQUEST });
  try {
    const { data } = await api.get("/api/orders/history");
    dispatch({ type: USER_ORDER_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_ORDER_HISTORY_FAILURE, payload: error.message });
  }
};