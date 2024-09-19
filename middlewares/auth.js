const User = require('../models/userModel')

const UserAuth = async (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user)
            .then(data => {
                if (data && !data.isblocked) {
                    next()
                } else {
                    res.redirect('/login')
                }
            })
            .catch(error => {
                console.log("error in user auth middleware");
                res.status(500).send("internal server eror")
            })
    } else {
        res.redirect('/login')
    }
}



const AdminAuth = async (req, res, next) => {
    User.findOne({ isAdmin: true })
        .then(data => {
            if (data) {
                next()
            } else {
                res.redirect('/admin/login')
            }
        })
        .catch(err => {
            console.log("error in auth admin", err);

        })

}


module.exports = { UserAuth, AdminAuth }