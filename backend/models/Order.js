const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shippingSchema = new Schema(
	{
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		phoneNo: {
			type: String,
			required: true,
		},
		zipCode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const orderItemsSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Product",
		},
	},
	{
		timestamps: true,
	}
);

const orderSchema = new Schema(
	{
		shippingInfo: { shippingSchema },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		orderItems: [orderItemsSchema],
		paymentMethod: {
			type: String,
			required: [true, "Error: Please enter your payment information"],
			value: "Card",
		},
		paymentMethod: {
			type: String,
			required: [true, "Please select payment method"],
			enum: {
				values: ["COD", "Card"],
				message: "Please select: COD or Card",
			},
		},
		paymentInfo: {
			id: String,
			status: String,
		},
		itemsPrice: {
			type: Number,
			required: true,
		},
		taxAmount: {
			type: Number,
			required: true,
		},
		shippingAmount: {
			type: Number,
			required: true,
		},
		totalAmount: {
			type: Number,
			required: true,
		},
		orderStatus: {
			type: String,
			enum: {
				values: ["Processing Order", "Order Shipped", "Order Delivered"],
				message: "Please select correct order status",
			},
			default: "Processing",
		},
		deliveredOn: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
