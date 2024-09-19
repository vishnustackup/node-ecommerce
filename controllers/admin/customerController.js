const User = require('../../models/userModel');

const customerInfo = async (req, res) => {
    try {
        let search = "";
        if (req.query.search) {
            search = req.query.search;
        }

        let page = parseInt(req.query.page) || 1;
        let limit = 3;

        const userData = await User.find({
            isAdmin: false,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        const count = await User.countDocuments({
            isAdmin: false,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        }).exec();

        const totalpages = Math.ceil(count / limit);

        res.render('customers', {
            data: userData,
            totalpages: totalpages,
            currentPage: page
        });
        console.log();

    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send("Internal Server Error");
    }
};


const customerBlocked = async (req, res) => {
    try {
        let id = req.query.id
        await User.updateOne({ _id: id }, { $set: { isBlocked: true } })
        res.redirect('/admin/users')
    } catch (err) {
        res.redirect('/page-error')
    }
}

const customerUnblocked = async (req, res) => {
    try {

        let id = req.query.id
        await User.updateOne({ _id: id }, { $set: { isBlocked: false } })
        res.redirect('/admin/users')
    } catch (err) {
        res.redirect('/page-error')
    }

}
module.exports = { customerInfo, customerBlocked, customerUnblocked };
