import {
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAILURE,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  SELECT_ADDRESS,
} from "./ActionType";

const initialState = {
  addresses: [],
  selectedAddress: null,
  loading: false,
  error: null,
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ADDRESS_REQUEST:
    case GET_ADDRESSES_REQUEST:
    case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        loading: false,
      };
    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.payload || [],
        loading: false,
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.filter((addr) => addr._id !== action.payload),
        loading: false,
      };
    case CREATE_ADDRESS_FAILURE:
    case GET_ADDRESSES_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SELECT_ADDRESS:
      console.log("Reducing SELECT_ADDRESS - payload:", action.payload); // Debug
      return {
        ...state,
        selectedAddress: action.payload,
      };
    default:
      return state;
  }
};