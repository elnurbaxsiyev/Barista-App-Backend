
const express = require("express")
const { OrdersController } = require("../controllers/Orders.controller")
const router = express.Router()

router.get("/", OrdersController.getAll)
router.get("/:id", OrdersController.getById)
router.post("/", OrdersController.add)
router.delete("/:id", OrdersController.delete)
router.put("/:id", OrdersController.edit)

module.exports = router 
