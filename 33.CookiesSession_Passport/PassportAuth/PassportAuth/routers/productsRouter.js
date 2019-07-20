var express = require('express');
var router = express.Router();
var util=require("util");


const mongoose = require("mongoose");
const Product=require("../models/Product");



router.get('/add', function(req, res) {
    var product=new Product({
        title:req.query.title,
        price:req.query.price,
        count:req.query.count
    });
    product.save();
    res.redirect('/');
});
router.get('/', function(req, res) {
    Product.find({}, function(err, products){

        if(err) return console.log(err);

        console.log(util.inspect(products));
        res.render('products',{'products':products});
        //res.send(products);
    });
   // res.render('products');
});

module.exports = router;