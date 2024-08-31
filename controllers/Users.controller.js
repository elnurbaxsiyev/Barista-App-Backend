const { Users } = require("../models/Users.model")

const UsersController = {
    getAll: async (req, res) => {
        try {
            const items = await Users.find()
            res.send(items)
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Users.findById(id)
            if (!item) return res.status(404).send({ error: "User not found" })
            res.send(item)
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },
    add: async (req, res) => {
        try {
            const newUser = new Users({ ...req.body })
            await newUser.save()
            const items = await Users.find()
            res.send(items)
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deletedItem = await Users.findByIdAndDelete(id)
            if (!deletedItem) return res.status(404).send({ error: "User not found" })
            const items = await Users.find()
            res.send(items)
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const updatedItem = await Users.findByIdAndUpdate(id, { ...req.body }, { new: true })
            if (!updatedItem) return res.status(404).send({ error: "User not found" })
            const items = await Users.find()
            res.send(items)
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
}
module.exports = { UsersController }
