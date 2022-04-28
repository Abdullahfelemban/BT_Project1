const { Router } = require("express")
const express = require("express")
const router = express.Router()
const filter = require('../models/filter')
const customer = require('../models/customer')
const mongoose = require('mongoose')

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()&&req.user.kind==2) return next()
    res.redirect('/main_page/main')
    
}

 
  
 

router.get('/view',isAuthenticated,(req,res)=> {
    
   
       

      
         
       req.flash('info1',' ')
       res.render('customer/view', {
     
       
       message1: req.flash('info1'),
       
         })
      


})
var cname,cemail,cis;
router.get('/update',isAuthenticated,(req,res)=> {
    
   
       
    req.flash('info','')
    req.flash('info1','')
    res.render('customer/update', {

        name: cname,
        email: cemail,
        message1: req.flash('info1'),
        message: req.flash('info'),
      
          })
     
    
        
       
      
         
      

   


})

router.post ('/updatec/:customer_id',isAuthenticated,(req,res)=>{
  
        
        
    let quary = {_id: req.params.customer_id}

    customer.findOne(quary).populate('filter').exec(function (err,customer) {
        cname=customer.name;
        cemail=customer.email;
        cid=customer._id;
         req.flash('info','')
         req.flash('info1','')

        res.render('customer/update', {

            name: cname,
            email:cemail,
            message1: req.flash('info1'),
            message: req.flash('info'),
          
          
              })

  
      });
  
    
    })








router.get('/add',isAuthenticated,(req,res)=> {
    
   
       

  
          customer.find({user:req.user._id}, (err,findec)=> {

     
            if((findec.length>99)&&(req.user.grade==0)){
        
              
              req.flash('info1','تم الوصول الى اقصى عدد التصاميم المسموح بها لباقة حسابك ، لاضافة اكثر نرجو ترقية الحساب')
              res.render('customer/view', {
        
              
              message1: req.flash('info1'),
              
                })
            }else{
        
              req.flash('info','')
              req.flash('info1','')
              res.render('customer/add', {

                message1: req.flash('info1'),
                message: req.flash('info'),
              
                  })
        
        
            }
        
        
        
        
            })

   


})


router.get('/filter',isAuthenticated,(req,res)=> {
    
   
       

    res.render('customer/filter')
      

   


})


router.post('/filter', (req,res)=> {
        

    
        let filter1 = new filter ({

            name:req.body.filter,
            user:req.user._id
    
          })
        
          filter1.save((err)=>{
             
            if(!err){
      
              
              res.render('customer/filter');

            }

            else{

                console.log(err);
            }
        })
    })

    router.get('/filters',isAuthenticated,(req,res)=> {
   
      
      
      
        filter.find( { $or: [{user:req.user.id}, {user:null}] })
      
        .exec(function (err,filter) {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
           
            res.json(filter);
          }
      
          
        });
      
      
      
      });

     
        
      router.delete ('/delete/:filter_id',isAuthenticated,(req,res)=>{
  
        
        
      let quary = {_id: req.params.filter_id}
    
      customer.updateMany({filter:req.params.filter_id} , {filter:mongoose.Types.ObjectId("62501ecde4825a564ed12f20")}, (err) =>{


    })
        filter.deleteOne(quary , (err) =>{
        

        if(!err){
      
         
          res.status(200).json('deleted')
        }else {
         
          res.status(404).json('somthing wrong')
        }
      
      })
     
      
   
      
      

    })
      router.delete ('/delete2/:customer_id',isAuthenticated,(req,res)=>{
  
        
        
        let quary = {_id: req.params.customer_id}
      
       
        customer.deleteOne(quary , (err) =>{
          
          if(!err){
        
           
            res.status(200).json('deleted')
          }else {
           
            res.status(404).json('somthing wrong')
          }
        
        })
       
        
       
        
        })



       
    


      router.post('/add', (req,res)=> {
        

        
            let customer1 = new customer ({
    
                name: req.body.Cname,   
                email: req.body.Cemail,
                filter: req.body.Cfilter,
                user:req.user._id
                
        
              })
            
              customer1.save((err)=>{
                 
                if(!err){
          
                    req.flash('info','تم اضافة العميل بنجاح')
                    req.flash('info1','')
                    res.render('customer/add', {
        
                        message1: req.flash('info1'),
                        message: req.flash('info'),
                      
                          })
                }
    
               else {
                
                console.log(err)
                req.flash('info','')
                req.flash('info1','لم يتم اضافة العميل ')
                res.render('customer/add', {
    
                    message1: req.flash('info1'),
                    message: req.flash('info'),
                  
                      })
    
    
               
    
                
               }
              
              })
            
    })


    router.post('/update', (req,res)=> {
        

        
        
      customer.updateOne({_id:cid},{name: req.body.Cname, email: req.body.Cemail,filter: req.body.Cfilter,} , (err)=>{
             
            if(!err){
      
                req.flash('info','تم تعديل بيانات العميل بنجاح')
                req.flash('info1','')
                res.render('customer/add', {
    
                    message1: req.flash('info1'),
                    message: req.flash('info'),
                  
                      })
            }

           else {
            
            console.log(err)
            req.flash('info','')
            req.flash('info1',' خطا لم يتم التعديل  ')
            res.render('customer/update', {

                message1: req.flash('info1'),
                message: req.flash('info'),
              
                  })


           

            
           }
          
          })
        
})

router.get('/show',isAuthenticated,(req,res)=> {
    

   
        customer.find({user:req.user.id }).populate('filter').exec(function (err,customer) {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
           
            res.json(customer);
          }
      
          
        });
      
        
      
      });

module.exports= router
