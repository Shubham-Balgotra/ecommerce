import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  try {
    // 🟢 Build query params dynamically
    const queryParams = new URLSearchParams();

    if (reqData.colors) queryParams.append("color", reqData.colors);
    if (reqData.sizes) queryParams.append("size", reqData.sizes);
    if (reqData.minPrice !== undefined) queryParams.append("minPrice", reqData.minPrice);
    if (reqData.maxPrice !== undefined) queryParams.append("maxPrice", reqData.maxPrice);
    if (reqData.minDiscount) queryParams.append("minDiscount", reqData.minDiscount);
    if (reqData.category) queryParams.append("category", reqData.category);
    if (reqData.stock) queryParams.append("stock", reqData.stock);
    if (reqData.sort) queryParams.append("sort", reqData.sort);
    if (reqData.pageNumber) queryParams.append("pageNumber", reqData.pageNumber);
    if (reqData.pageSize) queryParams.append("pageSize", reqData.pageSize);

    const { data } = await api.get(`/api/products?${queryParams.toString()}`);

    console.log("API Response:", data);
   console.log("Filters: ", queryParams.toString());

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};


export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  try {
    const { data } = await api.get(`/api/products/${productId}`); // Fix endpoint
    //console.log("Product by ID response:", data); // Debug
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    //console.error("Product by ID error:", error.message); // Debug
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product)=>async(dispatch)=>{
  try {
    dispatch({type:CREATE_PRODUCT_REQUEST})
    const {data} = await api.post(`${API_BASE_URL}/api/admin/product`,product.data)
    dispatch({type:CREATE_PRODUCT_SUCCESS, payload:data})
  } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
}

export const deleteProduct = (productId)=>async(dispatch)=>{
  try {
    dispatch({type:DELETE_PRODUCT_REQUEST})
    const {data} = await api.delete(`${API_BASE_URL}/api/admin/product/${productId}`)
  //  console.log("Deleted product---",data)
    dispatch({type:DELETE_PRODUCT_SUCCESS, payload:productId})
  } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
}
