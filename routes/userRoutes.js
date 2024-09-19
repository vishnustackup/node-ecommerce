const express = require('express')
const router = express.Router()
const userController = require('../controllers/user/usercontroller')
const passport = require('../config/passport')


router.get('/pageNotfound',userController.pageNotfound)
router.get('/', userController.loadHomepage)
router.get('/signup', userController.loadSignup)
router.post('/signup', userController.Signup)
router.post('/verify-otp', userController.VerifyOtp)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signup' }), (req, res) => { res.redirect('/') })

router.get('/login', userController.LoadLogin)
router.post('/login',userController.UserLogin)
router.get('/logout',userController.Userlogout)
module.exports = router