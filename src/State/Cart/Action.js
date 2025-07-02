import { api } from "../../config/apiConfig"
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"

export const clearCart = () => ({ type: CLEAR_CART });

export const getCart = (reqData) =>async(dispatch)=>{
    dispatch({type: GET_CART_REQUEST})
    try {
        const {data} = await api.get('api/cart/') //reqData.data
       // console.log("Cart: ",data)
        dispatch({type:GET_CART_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:GET_CART_FAILURE, payload:error.message})
    }
}


export const addItemToCart = (reqData) =>async(dispatch)=>{
    dispatch({type: ADD_ITEM_TO_CART_REQUEST})
    try {
        const {data} = await api.post('api/cart/add', reqData)
        //console.log("Cart API Response:", data);

        dispatch({type:ADD_ITEM_TO_CART_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ADD_ITEM_TO_CART_FAILURE, payload:error.message})
    }
}

export const removeCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    try {
      await api.delete(`api/cart_items/${cartItemId}`);
      
      // Refetch updated cart
      const updatedCart = await api.get("api/cart/");
      
      dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: updatedCart.data });
      dispatch(getCart())
    } catch (error) {
      dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    }
  };

export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    try {
        const { data } = await api.put(`api/cart_items/${reqData.cartItemId}`, reqData.data);
        
        // Fetch updated cart after updating item
        const updatedCart = await api.get("api/cart/");
        
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: updatedCart.data });
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    }
};


