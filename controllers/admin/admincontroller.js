const User = require('../../models/userModel')
const bcrypt = require('bcrypt')


const pageError = async (req, res) => {
    res.render('page-error')
}


const LoadAdmin = async (req, res) => {

    if (req.session.admin) {
        return res.redirect('/admin/adminDashboard')
    }
    res.render('adminlogin', { message: null })

}

const LoginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body
        const admin = await User.findOne({ email, isAdmin: true })
        if (admin) {
            let passwordmatch = bcrypt.compare(password, admin.password)
            if (passwordmatch) {
                req.session.admin = true
                return res.redirect('/admin')
            } else {
                return res.redirect('/login')
            }
        } else {
            return res.redirect('/login')

        }

    } catch (error) {
        console.log(error);
        return res.redirect('/page-error')

    }

}


const LoadDashboard = async (req, res) => {
    if (req.session.admin) {
        res.render('adminDashboard')
    }
}


const AdminLogout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.log("session destroyed", err);
                return res.redirect('/page-error')
            }
            res.redirect('/admin/login')

        })
    } catch (err) {

        console.log("error during logout", err);
        res.redirect('/page-error')

    }
}
module.exports = { LoadAdmin, LoginAdmin, LoadDashboard, pageError, AdminLogout }