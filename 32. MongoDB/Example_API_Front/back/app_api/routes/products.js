const express=require('express')
const router=express.Router()
const ctrProducts=require('../controllers/products')
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});


router.get('/products',ctrProducts.getProducts);
router.get('/products/:productid',ctrProducts.getProductById);
router.post('/products',
            urlencodedParser,
            ctrProducts.addProduct);
router.put('/products',
            urlencodedParser,
            ctrProducts.updateProduct);
router.delete('/products/:productid',ctrProducts.deleteProduct);

module.exports=router