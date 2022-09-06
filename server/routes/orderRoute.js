const express = require("express");
const {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticated, authRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/orders/me").get(isAuthenticated, myOrders);

router
    .route("/admin/orders")
    .get(isAuthenticated, authRoles("admin"), getAllOrders);

router
    .route("/admin/order/:id")
    .put(isAuthenticated, authRoles("admin"), updateOrder)
    .delete(isAuthenticated, authRoles("admin"), deleteOrder);

module.exports = router;