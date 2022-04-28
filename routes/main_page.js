const { Router } = require("express")
const express = require("express")
const router = express.Router()
const feedback = require('../models/feedback')
const coupon = require('../models/coupon')
const User = require('../models/user')


isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()&&req.user.kind==2) return next()
    res.redirect('/main_page/main')
    
}

isAuthenticatedmanger = (req,res,next) => {
    if (req.isAuthenticated()&&req.user.kind==1) return next()
    res.redirect('/main_page/main')
    
}

 
  
 

router.get('/user',isAuthenticated,(req,res)=> {
    
  

    coupon.findOne({$and:[{user:req.user.id},{end:0}]}, (err,coup) => {

  if (coup) {
         
    
if(new Date().getTime()>coup.enddate.getTime()){

    User.updateOne({_id:req.user.id} ,{

        grade:0,
       
  
      } , (err) =>{
  
        if(err){
      
           
         console.log(err)
         res.render('main_page/user')
        }else{
        
            coupon.updateOne({user:req.user.id} ,{

                end:1,
               
          
              } , (err) =>{
          
                if(err){
              
                   
                 console.log(err)
                 res.render('main_page/user')
                }else{
                
                 res.render('main_page/user') 
                }
        
            })

         
        }

    })

      


}else{
    res.render('main_page/user') 


}


        } else {
         
            res.render('main_page/user')

        }
    
        
      });
       

       
         

      


})

router.get('/main',(req,res)=> {
    
   
       

    res.render('main_page/main')
      

   


})

router.get('/price',(req,res)=> {
    
   
       

    res.render('main_page/price')
      

   


})
router.get('/manger', isAuthenticatedmanger ,(req,res)=> {
    
   
       

    res.render('main_page/manger')
      

   


})
  
router.get('/feedback',(req,res)=> {
    

   
    feedback.find({}, (err,feed) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
       
        res.json(feed);
      }
  
      
    });
  
    
  
  });


  router.get('/coupon', (req,res)=> {
        

        
    let coupon1 = new coupon ({

        createdate: new Date() ,   
        used: 0,
        end:0
        

      })
    
      coupon1.save((err)=>{
         
        if(!err){
  
           
            res.render('main_page/manger')

               
        }

       else {
        
      
        res.render('main_page/manger')

      
        
       }
      
      })
    
})

router.get('/coupon2',(req,res)=> {
    

   
    coupon.find({}, (err,coup) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
       
        res.json(coup);
      }
  
      
    });
  
    
  
  });

module.exports= router
