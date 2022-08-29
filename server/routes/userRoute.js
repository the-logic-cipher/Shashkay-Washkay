const express = require("express")
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDeatil, updatePassword, updateProfile, getAllUsers, getSingleUserAdmin, updateUserRole, deleteUser } = require("../controller/userController")
const router = express.Router()
const { isAuthenticated, authRoles } = require("../middleware/auth")



router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(logout)

router.route('/me').get(isAuthenticated, getUserDeatil)

router.route('/password/update').put(isAuthenticated, updatePassword)

router.route('/me/update').put(isAuthenticated, updateProfile)

router.route('/admin/users').get(isAuthenticated, authRoles('admin'), getAllUsers)

router.route('/admin/user/:id').get(isAuthenticated, authRoles('admin'), getSingleUserAdmin).put(isAuthenticated, authRoles('admin'), updateUserRole).delete(isAuthenticated,authRoles('admin'),deleteUser)

module.exports = router