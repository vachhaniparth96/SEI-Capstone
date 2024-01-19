const Order = require('../models/Order')
const Product = require('../models/Product')

module.exports = {
    newOrder,
    orderDetails,
    userOrders,
    allOrders,
    updateOrders,
    deleteOrder
}

//New order
async function newOrder(req,res,next) {
    const { orderItems, shippingInfo, price, tax, shippingCost, total, paymentInfo, paymentMethod } = req.body
    
    const order = await Order.create({ orderItems, shippingInfo, itemsPrice, taxAmount, shippingAmount, totalAmount, paymentInfo, paymentMethod, user: req.user._id })

    res.status(200).json({
        order,
    })
}

//Fetching order details
async function orderDetails(req,res,next) {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if(!order) {
        return res.status(404).json({
            message: `Error: Order not found with a order ID of ${req.params.id}`
        })
    } 

    res.status(200).json({
        order,
    })
}

//Fetching user specific orders
async function userOrders(req,res,next) {
    const order = await Order.find( {user: req.user._id })

    res.status(200).json({
        order,
    })

}

//Admin Only- fetching all orders
async function allOrders(req,res,next) {
    const orders = await Order.find()

    res.status(200).json({
        orders,
    })
}

//Admin Only- updating orders
async function updateOrders(req,res,next) {
    const order = await Order.findById(req.params.id)

    if(!order) {
        return res.status(404).json({
            message: `Error: Order not found with a order ID of ${req.params.id}`
        })
    }

    if(order.status !== 'Processing Order'){
        return res.status(400).json({
            message: "Error: Order cannot be updated as it has already been shipped or delivered"
        })
    }

    //updating stock of each product when order is placed
    order.orderItems.forEach(async (item) => {
        const product = await Product.findById(item.product.toString());
        if(!product) {
            return res.status(404).json({
                message: "No product found with this product ID"
            })
        }

        //updating stock on database when purchasing an item
        product.stock = product.stock - item.quantity;
        await product.save({validateBeforeSave: false})

        order.status = req.body.status;
        order.deliveredOn = Date.now();

        await order.save()

        res.status(200).json({
            success: true,
            message: "Order updated successfully"
        })
    })
}

//Admin Only- deleting orders
async function deleteOrder(req,res,next) {
    const order = await Order.findById(req.params.id)

    if(!order) {
        return res.status(404).json({
            message: `Error: Order not found with a order ID of ${req.params.id}`
        })
    }

    await order.deleteOne();

    res.status(200).json({
        message: "Order successfully deleted"
    })
}