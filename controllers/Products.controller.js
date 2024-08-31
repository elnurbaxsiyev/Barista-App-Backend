
const { Products } = require("../models/Products.model")

const ProductsController = {
    getAll: async (req, res) => {
        try {
            const items = await Products.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Products.findById(id)
            res.send(item)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    add: async (req, res) => {
        try {
            const newBlog = new Products({ ...req.body })
            await newBlog.save()
            const items = await Products.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Products.findByIdAndDelete(id)
            const items = await Products.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            await Products.findByIdAndUpdate(id, { ...req.body })
            const items = await Products.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    }
}
module.exports = { ProductsController }
