const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const feedback = require('../models/feedback')
const coupon = require('../models/coupon')


isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()&&req.user.kind==2) return next()
    res.redirect('/main_page/main')
    
  }


router.get('/manage',isAuthenticated,(req,res)=> {
    
    var g ;
   if(req.user.grade==0){

    g='الباقة المجانية'
   }else{

    g='الباقة المميزة'
   }
   req.flash('info',' ')
   req.flash('info1','')
    res.render('user/manage', {
        fullname : req.user.fullname ,
        username : req.user.username,
        grade:g,
        message1: req.flash('info1'),
        message: req.flash('info'),
        })
 

})


router.post('/feedback', (req,res)=> {
        
if(req.user){
        
    let feedback1 = new feedback ({

        rate: req.body.rate,   
        comment: req.body.msg,
        user:req.user._id
        

      })
    
      feedback1.save((err)=>{
         
    
      
      })
}else{


    let feedback1 = new feedback ({

        rate: req.body.rate,   
        comment: req.body.msg,
        
        

      })
    
      feedback1.save((err)=>{
         
    
      
      })


}

res.redirect('back');


})





router.post('/coupon', (req,res)=> {

  var  quary = {_id:req.body.coupon}


  if(req.user.grade==0){
    coupon.findOne(quary , (err,coup)=> {
     
     if(coup){
    if(coup.used==0) {

     
        coupon.updateOne(coup ,{
       
          startdate:new Date(),
          used:1,
          enddate: new Date(new Date().getTime()+(30*24*60*60*1000)),
          user:req.user.id

        }
        , (err) =>{
      
      if(err){
    
       
       console.log(err)
      }else {

        User.updateOne({_id:req.user.id} ,{


            grade:1
      
          } , (err) =>{
      
            if(err){
          
             
             console.log(err)

            }

        })

        var g ;
        if(req.user.grade==0){
     
         g='الباقة المجانية'
        }else{
     
         g='الباقة المميزة'
        }
        req.flash('info','تم تفعيل الكوبون بنجاح')
        req.flash('info1','')
        res.render('user/manage', {
            fullname : req.user.fullname ,
            username : req.user.username,
            grade:g,
            message1: req.flash('info1'),
            message: req.flash('info'),
            })
      }

    })

   

    }

    else if(coup.used==1){
        var g ;
        if(req.user.grade==0){
     
         g='الباقة المجانية'
        }else{
     
         g='الباقة المميزة'
        }
        req.flash('info','')
        req.flash('info1','عفوا الكوبون مستخدم')
        res.render('user/manage', {
            fullname : req.user.fullname ,
            username : req.user.username,
            grade:g,
            message1: req.flash('info1'),
            message: req.flash('info'),
            })


    }
}
    if(!coup){
        var g ;
        if(req.user.grade==0){
     
         g='الباقة المجانية'
        }else{
     
         g='الباقة المميزة'
        }
        req.flash('info','')
        req.flash('info1','الكوبون خطا تاكد من ادخاله بشكل صحيح')
        res.render('user/manage', {
            fullname : req.user.fullname ,
            username : req.user.username,
            grade:g,
            message1: req.flash('info1'),
            message: req.flash('info'),
            })
    
    }
    })
  }else{
    var g ;
    if(req.user.grade==0){
 
     g='الباقة المجانية'
    }else{
 
     g='الباقة المميزة'
    }
    req.flash('info','')
    req.flash('info1','يوجد كوبون فعال ')
    res.render('user/manage', {
        fullname : req.user.fullname ,
        username : req.user.username,
        grade:g,
        message1: req.flash('info1'),
        message: req.flash('info'),

    })

  }
})




router.post('/manage',

 
passport.authenticate('update_userPass', {
    successRedirect: '/user/login',
    failureRedirect: '/user/login',
    failureFlash: true })


    )



router.get('/login' ,(req,res)=> {
    res.render('user/login', {
        error: req.flash('error'),
        success: req.flash('success')
    })
})

router.get('/signup', (req,res)=> {
   
    res.render('user/signup',{
    error : req.flash('error')


    })
       
    
})



 router.post('/login2', 

 
  passport.authenticate('local.login_manger',  {

      successRedirect: '/main_page/manger',
      failureRedirect: '/user/login2',
      failureFlash: true })

  


    )




      
      router.post('/login',

 
      passport.authenticate('local.login_user', {
          successRedirect: '/main_page/user',
          failureRedirect: '/user/login',
          failureFlash: true })
    
      
          )
      



      router.get('/login2', (req,res)=> {
        res.render('user/login2', {
            error: req.flash('error')
        })
    })
 

     router.post('/signup',
     passport.authenticate('local.signup', {
      successRedirect: '/user/login',
      failureRedirect: '/user/signup',
      failureFlash: true })
      )

      
    router.get('/logoutF',(req,res)=>{

   req.logOut()
   res.redirect('/main_page/main')

      })
module.exports= router