const express = require("express")
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controller/productController")
const { isAuthenticated, authRoles } = require("../middleware/auth")

const router = express.Router()

router.route('/product').get( getAllProduct)

router.route('/product/:id').get(getProductDetails)

router.route('/product/new').post(isAuthenticated, authRoles("admin"), createProduct)

router.route('/product/:id').put(isAuthenticated, authRoles("admin"), updateProduct)

router.route('/product/:id').delete(isAuthenticated, authRoles("admin"), deleteProduct)


router.route('/review').put(isAuthenticated, createProductReview)

router.route('/reviews').get( getProductReviews).delete( deleteReview)



module.exports = router