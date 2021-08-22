import axios from 'axios'
import { ADD_TO_CART, DELETE_TO_CART, PRODUCT_LIST_FAILD, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS, SAVE_SHIPPING_ADDRESS, SINGLE_PRODUCT_FAILD, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCESS } from '../actionType'

export const listProduct = ()=> async (dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })
        const {data} = await axios.get("/api/products")
        dispatch({
            type:PRODUCT_LIST_SUCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAILD,
            payload:error.response && error.response.data.message
        })
    }
}

export const singleProduct = (productId) =>  async (dispatch)=>{
    try {
        dispatch({
            type:SINGLE_PRODUCT_REQUEST
        })
        const {data} = await axios.get(`/api/products/${productId}`)
        dispatch({
            type:SINGLE_PRODUCT_SUCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:SINGLE_PRODUCT_FAILD,
            payload:error.response && error.response.data.message
        })        
    }
}

export const addToCart = (productId, qty) => async (dispatch, getState)=>{
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch({
        type:ADD_TO_CART,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product:data._id,
            qty
        }
    })
    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
}

export const deletToCart = (productId)=> async (dispatch, getState)=>{
    dispatch({
        type:DELETE_TO_CART,
        payload:productId
    })
    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
}



export const saveShippingAdress = (data)=>(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}