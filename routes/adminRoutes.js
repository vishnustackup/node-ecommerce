const express = require('express')
const router = express.Router();
const adminController = require('../controllers/admin/admincontroller')
const customerController = require('../controllers/admin/customerController')
const { AdminAuth } = require('../middlewares/auth')


router.get('/page-error', adminController.pageError)

//-------------LOGIN MANAGEMENT-------------------

router.get('/login', adminController.LoadAdmin)
router.post('/login', adminController.LoginAdmin)
router.get('/', AdminAuth, adminController.LoadDashboard)
router.get('/logout', adminController.AdminLogout)

//-------------CUSTOMER MANAGEMENT-------------------

router.get('/users', AdminAuth, customerController.customerInfo)

router.get('/blockCustomer', AdminAuth, customerController.customerBlocked)

router.get('/UnblockCustomer', AdminAuth, customerController.customerUnblocked)

module.exports = router