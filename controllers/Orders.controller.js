
const { Orders } = require("../models/Orders.model")

const OrdersController = {
    getAll: async (req, res) => {
        try {
            const items = await Orders.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Orders.findById(id)
            res.send(item)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    add: async (req, res) => {
        try {
            const newBlog = new Orders({ ...req.body })
            await newBlog.save()
            const items = await Orders.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Orders.findByIdAndDelete(id)
            const items = await Orders.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            await Orders.findByIdAndUpdate(id, { ...req.body })
            const items = await Orders.find()
            res.send(items)
        } catch (error) {
            res.status(404).send(error)
        }
    }
}
module.exports = { OrdersController }
