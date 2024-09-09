
const pageNotfound = async (req, res) => {
    try {
        return res.render('page-404')
    } catch (error) {
        res.redirect('/pageNotfound')
    }
}


const loadHomepage = async (req, res) => {
    try {
        return res.render('home')
    } catch (error) {
        res.status(500).send("server error")
    }
}

module.exports = { loadHomepage, pageNotfound }