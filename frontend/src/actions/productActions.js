import axios from 'axios';

import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
	CLEAR_ERRORS
} from '../constants/productConstants'

export const getProducts = (keyword = '', currentPage = 1) => async (dispatch) => {

	try{
	
		 //step-1
		//first its dispatch ALL_PRODUCTS_REQUEST its going to productsReducers
		//and take empty array of products
		dispatch({ type: ALL_PRODUCTS_REQUEST })
		//step-3
		//Second its get data from backend 
		const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`);

		
		//step-4 
		//after get data its dispatch ALL_PRODUCTS_SUCCESS
		dispatch({ 

			type: ALL_PRODUCTS_SUCCESS,
			payload: data  

			             //payload pass the data to product reducer on case number 2
		})

	}catch(error){
		dispatch({

			type: ALL_PRODUCTS_FAIL,
			payload: error.response.data.message


		})
	}

}

export const getProductDetails = (id) => async (dispatch) => {

	try{
	
		 //step-1
		//first its dispatch ALL_PRODUCTS_REQUEST its going to productsReducers
		//and take empty array of products
		dispatch({ type: PRODUCT_DETAILS_REQUEST })
		//step-3
		//Second its get data from backend 
		const { data } = await axios.get(`/api/v1/product/${id}`)

		console.log(data)
		
		//step-4 
		//after get data its dispatch ALL_PRODUCTS_SUCCESS
		dispatch({ 

			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.productById  

			             //payload pass the data to product reducer on case number 2
		})

	}catch(error){
		dispatch({

			type: PRODUCT_DETAILS_FAIL,
			payload: error.response.data.message


		})
	}

}



// clear Errors 

export const clearErrors = () => async (dispatch) => {

	dispatch({
		type: CLEAR_ERRORS
	})
}