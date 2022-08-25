const express = require("express")
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controller/productController")

const router = express.Router()

router.route('/product').get(getAllProduct)

router.route('/product/:id').get(getProductDetails)

router.route('/product/new').post(createProduct )

router.route('/product/:id').put(updateProduct)

router.route('/product/:id').delete(deleteProduct)




module.exports = router