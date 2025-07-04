import { api } from "../../../config/apiConfig"
import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"

export const getOrders = () =>{
    console.log("Get all orders---")
    return async(dispatch)=>{
        dispatch({type: GET_ORDERS_REQUEST})
        try {
            const response = await api.get(`api/admin/orders/`);
            console.log("Get all Orders---",response.data)
            dispatch({type:GET_ORDERS_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("Catch error: ",error)
            dispatch({type:GET_ORDERS_FAILURE, payload:error.message})
        }
    }
}

export const confirmOrder = (orderId) =>{
    return async(dispatch)=>{
        dispatch({type: CONFIRMED_ORDER_REQUEST})
        try {
            const response = await api.put(`api/admin/orders/${orderId}/confirmed`);
            const data = response.data
            console.log("Confirmed Order---",data)
            dispatch({type:CONFIRMED_ORDER_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type:CONFIRMED_ORDER_FAILURE, payload:error.message})
        }
    }
}

export const shipOrder = (orderId) =>{
    return async(dispatch)=>{
        dispatch({type: SHIP_ORDER_REQUEST})
        try {
            const response = await api.put(`api/admin/orders/${orderId}/ship`);
            const data = response.data
            console.log("Shipped Order---",data)
            dispatch({type:SHIP_ORDER_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type:SHIP_ORDER_FAILURE, payload:error.message})
        }
    }
}

export const deliveredOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    try {
      const response = await api.put(`api/admin/orders/${orderId}/deliver`);
      const data = response.data;
      console.log("Delivered Order---", data);
      dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const cancelOrder = (orderId) =>{
    return async(dispatch)=>{
        dispatch({type: CANCEL_ORDER_REQUEST})
        try {
            const response = await api.put(`api/admin/orders/${orderId}/cancel`);
            const data = response.data
            console.log("Canceled Order---",data)
            dispatch({type:CANCEL_ORDER_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type:CANCEL_ORDER_FAILURE, payload:error.message})
        }
    }
}

export const deleteOrder = (orderId) =>{
    return async(dispatch)=>{
        dispatch({type: DELETE_ORDER_REQUEST})
        try {
            const response = await api.put(`api/admin/orders/${orderId}/delete`);
            const data = response.data
            console.log("Deleted Order---",data)
            dispatch({type:DELETE_ORDER_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type:DELETE_ORDER_FAILURE, payload:error.message})
        }
    }
}
