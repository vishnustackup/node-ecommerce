const express = require('express')
const router = express.Router();
const adminController = require('../controllers/admin/admincontroller')
const customerController = require('../controllers/admin/customerController')
const categorycontroller = require('../controllers/admin/categoryController')
const { AdminAuth } = require('../middlewares/auth')


router.get('/page-error', adminController.pageError)

//------------------------LOGIN MANAGEMENT-------------------------------

router.get('/login', adminController.LoadAdmin)
router.post('/login', adminController.LoginAdmin)
router.get('/', AdminAuth, adminController.LoadDashboard)
router.get('/logout', adminController.AdminLogout)

//----------------------CUSTOMER MANAGEMENT-------------------------------

router.get('/users', AdminAuth, customerController.customerInfo)

router.get('/blockCustomer', AdminAuth, customerController.customerBlocked)

router.get('/UnblockCustomer', AdminAuth, customerController.customerUnblocked)

//-------------------------CATEGORY MANAGEMENT--------------------------------
router.get('/category', AdminAuth, categorycontroller.categoryInfo)

router.post('/addCategory', AdminAuth, categorycontroller.AddCategory)

router.post('/addCategoryOffer', AdminAuth, categorycontroller.AddCategoryOffer)

router.post('/removeCategoryOffer', AdminAuth, categorycontroller.removeCategoryOffer)
module.exports = router