const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("./data")
require("dotenv").config();

async function seed() {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        await Product.deleteMany();
        console.log("Products successfully deleted");
        await Product.insertMany(products)
        console.log("Products successfully added");
        process.exit();
    }
    catch(err){
        console.log(err);
        process.exit();
    }
}

seed();