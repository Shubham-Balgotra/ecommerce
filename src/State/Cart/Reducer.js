import { updateCartItem } from "./Action";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  CLEAR_CART,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

const initialState = {
  cart: { cartItems: [] }, // ✅ Ensure cart starts with an empty array
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ Add Item to Cart
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...(state.cart.cartItems || []), action.payload], // ✅ Default to empty array
        },
        loading: false,
      };

    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ✅ Get Cart
    case GET_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CART_SUCCESS:
      //console.log("Updated cart in reducer:", action.payload); // ✅ Debugging
      return {
        ...state,
        cart: action.payload || { cartItems: [] }, // ✅ Ensure default empty cart
        loading: false,
      };
    case GET_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ✅ Remove Item from Cart
    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };

    case REMOVE_CART_ITEM_SUCCESS:
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          ...action.payload, // Safely spread all fields from updated cart
        },
        loading: false,
      };

 
    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case CLEAR_CART:
        return {
          ...state,
          cart: { cartItems: [] },
          loading: false,
          error: null,
        };

    default:
      return state;
  }
};
