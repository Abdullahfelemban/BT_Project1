const { compile } = require("ejs")
const { Router } = require("express")
const express = require("express")
const router = express.Router()
const product = require('../models/product')
var uuid = require('uuid');

isAuthenticated = (req,res,next) => {
  if (req.isAuthenticated()&&req.user.kind==2) return next()
  res.redirect('/main_page/main')
  
}




var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './productuploads')
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v4()+".png")
    }
})

var upload = multer({ storage: storage })




router.post('/product_up',isAuthenticated, upload.fields([{
    name: 'img', maxCount: 1
}
]), function(req, res, next){
 
 


  if (typeof req.files.img === "undefined") {

   
  upImg1 = "http://businesstools.online/uploads/noimg.png"
 

  } else{
    upImg1= 'http://businesstools.online/'+req.files.img[0].path;
    
   
  }

  
  product.findOne({number: req.body.num  }, (err,product1)=> {


if(product1){

    req.flash('info','')
    req.flash('info1','خطا، رقم المنتج موجود مسبقا')
    return  res.render('product/add' ,{

      message1: req.flash('info1'),
      message: req.flash('info'),
    

  })

}else {
  let product1 = new product ({
    
   img:upImg1 ,
   number: req.body.num,
   name:req.body.name,
   price:req.body.price,
   user:req.user._id

  })

 

  product1.save((err)=>{
   
    if(!err){

        req.flash('info','تم حفظ المنتج بنجاح')
        req.flash('info1','')
      return   res.render('product/add' ,{
      
          message1: req.flash('info1'),
          message: req.flash('info'),
        
      
      })
   
    }
  
   else {
    
    req.flash('info','')
        req.flash('info1','خطا في البيانات تاكد من ادخال السعر بالارقام')
      return   res.render('product/add' ,{
      
          message1: req.flash('info1'),
          message: req.flash('info'),
        
      
      })
    
  
   }
  
  })

 
  
}

  })


 
})


var img;
var productid,namep,price,number;

router.post('/product_up2',isAuthenticated,  upload.fields([{
    name: 'img', maxCount: 1
  }]), function(req, res, next){
  
   
    var upImg1 ;
    
    
    
    if (typeof req.files.img === "undefined") {
  
     
    upImg1 = img ;
   
  
    } else{
      upImg1= 'http://businesstools.online/'+req.files.img[0].path;
      
     
    }
  
  
  
       let quary = {_id: productid}
  
       product.findOne(quary , (err,findproduct)=> {
       
       
       if(findproduct) {
  
        
  
        product.updateOne(findproduct ,{img:upImg1,number:req.body.num,name:req.body.name,price:req.body.price}, (err) =>{
         
         if(!err){
       
            req.flash('info','تم تعديل المنتج بنجاح')
            req.flash('info1','')
          return   res.render('product/update' ,{
            img : img ,
            number:number,
            name:namep,
            price:price,
              message1: req.flash('info1'),
              message: req.flash('info'),
            
          
          })
         
         }else {
          
            req.flash('info','')
        req.flash('info1','خطا في البيانات تاكد من ادخال السعر بالارقام')
      return   res.render('product/update' ,{
        img : img ,
        number:number,
        name:namep,
        price:price,
          message1: req.flash('info1'),
          message: req.flash('info'),
        
      
      })
         }
       
       })
       }
       
       if(!findproduct){
       
        console.log(err)
       
       }
       })
  
  
   
  
    
    
  
  })
  
  
  
  router.post ('/update/:pr_id',isAuthenticated,(req,res)=>{
    
    productid=req.params.pr_id;
    
   
    product.findOne({_id : req.params.pr_id} , (err,findproduct)=> {
  
       img = findproduct.img ;
       number = findproduct.number;
       namep =findproduct.name ;
       price= findproduct.price;
    })
    req.flash('info','')
    req.flash('info1','')
    res.render('product/update', {
  
      
      img : img ,
      number:number,
      name:namep,
      price:price,
      message1: req.flash('info1'),
          message: req.flash('info'),
        
    
        })
  })
  
  router.get('/update',isAuthenticated,(req,res)=> {
    req.flash('info','')
    req.flash('info1','')
    res.render('product/update', {
  
        img : img ,
        number:number,
        name:namep,
        price:price,
        message1: req.flash('info1'),
            message: req.flash('info'),
          
      
      
          })
      
  })
  


module.exports= router
