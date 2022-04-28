const { Router } = require("express")
const express = require("express")
const router = express.Router()
const product = require('../models/product')
const fs = require('fs')


isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()&&req.user.kind==2) return next()
    res.redirect('/main_page/main')
    
}

 
  
 

router.get('/add',isAuthenticated,(req,res)=> {
    
   
  product.find({user:req.user._id}, (err,findep)=> {

     
    if((findep.length>19)&&(req.user.grade==0)){

      
      req.flash('info1','تم الوصول الى اقصى عدد التصاميم المسموح بها لباقة حسابك ، لاضافة اكثر نرجو ترقية الحساب')
      res.render('product/view', {

      
      message1: req.flash('info1'),
      
        })
    }else{

      req.flash('info','')
      req.flash('info1','')
      res.render('product/add', {

        message1: req.flash('info1'),
        message: req.flash('info'),
      
          })


    }




    })   
  

         

      


})

router.get('/view',isAuthenticated,(req,res)=> {
    
   
       
  req.flash('info1',' ')
  res.render('product/view', {

  
  message1: req.flash('info1'),
  
    })
   
      

   


})







router.delete ('/delete/:pr_id',isAuthenticated,(req,res)=>{
  
   
    
  let quary = {_id: req.params.pr_id}

 

  product.deleteOne(quary , (err) =>{
    
    if(!err){
  
     
      res.status(200).json('deleted')
    }else {
     
      res.status(404).json(' was not deleted')
    }
  
  })
 

  
 
  
  })

  router.delete('/delete1/:pr_id', async (req, res) =>{


    let quary = {_id: req.params.pr_id}
  
    product.findOne(quary ,async (err,findproduct)=> {


    if(findproduct) {
      if(findproduct.img!= 'uploads/noimg.png') {
        fs.unlink(findproduct.img, (err) => {
            if (err) {
              console.error(err)
              
            }
        })
      }

     
        
    }
     
    })
    
    
})


router.route('/icons').get(function (req, res) {

  if(req.user){
    product.find( { user:req.user.id  })
  
    .exec(function (err, findproduct) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
       
        res.json(findproduct);
      }
  
      
    });
    
  }
  
  });


  


 


  


module.exports= router
