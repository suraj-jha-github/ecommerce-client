import {
  ADD_TO_CART,
  CART_EMPTY,
  DELETE_TO_CART,
  PRODUCT_LIST_FAILD,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  SINGLE_PRODUCT_FAILD,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCESS,
} from "../actions/actionType";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAILD:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const singleProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };
    case SINGLE_PRODUCT_SUCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case SINGLE_PRODUCT_FAILD:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case DELETE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return{
        ...state, cartItems:[]
      }  
    default:
      return state;
  }
};
