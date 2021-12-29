// import products constants
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
   
    CLEAR_ERRORS 
} from '../constants/productConstants'

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        //first all products dispatch then loading true 
        //then set he products into empty array of products
        case ALL_PRODUCTS_REQUEST: //step-2
            return {
                loading: true,
                products: []
            }
            // if products get all products from backend.
            // its get success and loading will be false.
            // and will pass products in action and set products state into products  
       		//this is pull the data of product from productAction
            //this pull the data of product count from productAction
            //and save this into this state state after loading false ALL_PRODUCTS_SUCCESS
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products, 
                productCount: action.payload.productCount, 
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
                
            }

        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {

	switch (action.type) {
		
		case PRODUCT_DETAILS_REQUEST:
			return {
				...state,
				loading: true
			}

		case PRODUCT_DETAILS_SUCCESS:
			
			return {
				
				loading: false,
				product: action.payload // pass the product in the payload 
			}

		case PRODUCT_DETAILS_FAIL:

			return {
				...state,

				error: null
			}

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}

		default:
			return state
	}
}
