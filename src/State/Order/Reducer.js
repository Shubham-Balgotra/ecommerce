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

const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
    case USER_ORDER_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, error: null, order: action.payload };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, order: action.payload };
    case USER_ORDER_HISTORY_SUCCESS:
      return { ...state, loading: false, error: null, orders: action.payload };
    case CREATE_ORDER_FAILURE:
    case GET_ORDER_BY_ID_FAILURE:
    case USER_ORDER_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};