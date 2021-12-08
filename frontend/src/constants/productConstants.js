// first all products dispatch from request , set loading true.
export const ALL_PRODUCTS_REQUEST = 'ALL_PRODUCTS_REQUEST'
//then successfully get data from backend then dispatch product success.
export const ALL_PRODUCTS_SUCCESS = 'ALL_PRODUCTS_SUCCESS'
// if there some error all product fail will be dispath 
export const ALL_PRODUCTS_FAIL = 'ALL_PRODUCTS_FAIL'



export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

// clear all errors
export const CLEAR_ERRORS = 'CLEAR_ERRORS'