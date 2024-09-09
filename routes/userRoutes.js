const express = require('express')
const router = express.Router()
const userController =require('../controllers/user/usercontroller')


router.get('/pagenotfound',userController.pageNotfound)
router.get('/',userController.loadHomepage)


module.exports = router