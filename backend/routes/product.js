const express = require('express')

// we can use routing in another file through this Router function.
const router = express.Router();

const {getProducts, 
		newProduct, 
		getAdminProducts,
		getSingleProduct, 
		updateProduct,
		deleteProduct,
		createProductReview,
		getProductReviews,
		deleteReview
	} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products').get(getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, newProduct);
router.route('/admin/product/:id')
		.put(isAuthenticatedUser, updateProduct)
		.delete(isAuthenticatedUser, deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);	
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;