const mongoose =require('mongoose')
const Product=require('../models/product')

const sendJSONResponse=(res,status,content)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(status).json(content);
}

module.exports.getProducts=function(req,res){
    const filter= req.body.filter ||{}
    Product.find(filter)
    .exec((err,products)=>{
        if(err){
            sendJSONResponse(res,404,
                {message:"Products not found"})
            return
        } 
        if(products.length==0){
            sendJSONResponse(res,404,
                {message:"Products not found (empty)"})
             return
        }
        sendJSONResponse(res,200,products)
})
}
module.exports.getProductById=function(req,res){
    if(req.params && req.params.productid){
        Product
        .findById(req.params.productid,(err,product)=>{
            if(err){
                sendJSONResponse(res,404,
                    {
                    message:'Product not found'
                });
                return
            } 
               sendJSONResponse(res,200,product)
        })
    }
}
module.exports.addProduct=function(req,res){
    if(!req.body ||!req.body.title ||!req.body.price ||!req.body.count){
        sendJSONResponse(res,400,{
            message:"No data"
        })
        return
    }
    const newProduct=new Product({
        title:req.body.title,
        price:req.body.price,
        count:req.body.count
    })
    newProduct.save((err)=>{
        if(err){
            sendJSONResponse(res,500,{
                message:err
            })
            return
        }
        sendJSONResponse(res,200,{
            message:'added'
        })
    })
}
module.exports.updateProduct=function(req,res){
    if(req.body.productid ){
        // Знаходимо і оновлюємо
        Product.findByIdAndUpdate(req.body.productid,
            {
                title:req.body.title,
                price:req.body.price,
                count:req.body.count
            },
            (err,product)=>{
                    if(err){
                        sendJSONResponse(res,404,
                            {
                            message:'Product not found'
                        });
                        return
                    }
                    sendJSONResponse(res,200,{
                      message:'changed'
                    })
                } 
            )
        // Або знаходимо, змінюємо і зберігаємо
        // Product
        // .findById(req.body.productid,(err,product)=>{   //Знаходимо
        //     if(err){
        //         sendJSONResponse(res,404,
        //             {
        //             message:'Product not found'
        //         });
        //         return
        //     } 
        //     product.title=req.body.title,      //Змінюємо
        //     product.price=req.body.price,
        //     product.count=req.body.count,
        //     product.save((err)=>{              //Зберігаємо
        //         if(err){
        //             sendJSONResponse(res,500,
        //                 {
        //                 message:'Not changed'
        //             });
        //             return
        //         } 
                
        //         sendJSONResponse(res,200,{
        //            message:'changed'
        //        })
        //     })
               
        // })
    } else{
        sendJSONResponse(res,400,{
            message:'bad request'
        })
    }
}
module.exports.deleteProduct=function(req,res){
    if(req.params.productid){
        Product.findByIdAndDelete(req.params.productid,(err)=>{
            if(err){
                sendJSONResponse(res,500,{
                    message:"can't delete"
                })
                return
            }
            sendJSONResponse(res, 204,{
                message:"deleted"
            })
        })
    } else
    sendJSONResponse(res,400,{
        message:'bad request'
    })
}
