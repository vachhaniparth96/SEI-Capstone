const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("./data")
require("dotenv").config();

//seed function to populate the database with product information
async function seed() {
    try{
        await mongoose.connect(process.env.DATABASE_URL); //Connects to the database
        await Product.deleteMany(); //Clears the database of all the previous products
        console.log("Products successfully deleted");
        await Product.insertMany(products) //Inserts the new product information from data.js into the database
        console.log("Products successfully added");
        process.exit();
    }
    catch(err){
        console.log(err);
        process.exit();
    }
}

seed();