const Category = require('../../models/categoryModel')
const Product = require('../../models/productModel')


const categoryInfo = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1
        const limit = 4
        const skip = (page - 1) * limit

        const categoryData = await Category.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalCategories = await Category.countDocuments()
        const totalpages = Math.ceil(totalCategories / limit)
        res.render("category", {
            cat: categoryData,
            currentpage: page,
            totalpages: totalpages,
            totalCategories: totalCategories
        })
    } catch (err) {

        console.error(err);
        res.redirect('/page-error')

    }
}

const AddCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        // Check if category already exists
        const existCategory = await Category.findOne({ name });
        if (existCategory) {
            return res.status(400).json({ error: "Category already exists" });
        }

        // Create and save new category
        const newCategory = new Category({
            name, description, isListed: true,
            categoryOffer: 0
        });
        await newCategory.save();
        return res.json({ message: "Category added successfully" });
    } catch (err) {
        console.error("Error:", err); // Log error to console
        return res.status(500).json({ error: "Internal server error" }); // Correctly format error response
    }
};

const AddCategoryOffer = async (req, res) => {
    try {

        const percentage = parseInt(req.body.percentage)
        const categoryId = req.body.categoryId
        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" })
        }
        const products = await Product.find({ category: category._id })
        const hasoffer = await products.some((product) => { product.productOffer > percentage })
        if (hasoffer) {
            return res.json({ status: "failed", message: "offer within this category already have offer" })
        }
        await Category.updateOne({ _id: category._id }, { $set: { categoryOffer: percentage } })


        for (const product of products) {
            product.productOffer = 0;
            product.salesPrice = product.regularPrice - (product.regularPrice * percentage / 100);
            await product.save()
        }

        res.json({ status: true })
    } catch (error) {

        res.status(500).json({ status: false, message: "internal server error" })
    }

}

const removeCategoryOffer = async (req, res) => {
    try {
        const categoryId = req.body.categoryId
        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" })
        }
        const percentage = category.categoryOffer
        const products = await Product.find({ category: category._id })


        if (products.length > 0) {
            for (const product of products) {
                product.salesPrice += Math.floor(product.regularPrice * (percentage / 100))
                product.productOffer = 0
                await product.save()
            }
        }

        category.categoryOffer = 0
        await category.save()
        res.json({ status: true })

    } catch (error) {
        res.status(500).json({ status: false, message: "internal server error" })

    }




}
module.exports = { categoryInfo, AddCategory, AddCategoryOffer, removeCategoryOffer }