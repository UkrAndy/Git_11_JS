const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    title: String,
    price: Number,
    count:Number},
    {versionKey: false});
const Product = mongoose.model("Product", userScheme);
module.exports=Product;