const { Router } = require("express")
const express = require("express")
const router = express.Router()
const email = require('../models/emails_forms')
const fs = require('fs')
const customer = require('../models/customer')
var nodemailer = require('nodemailer');
const { PerformanceNodeTiming } = require("perf_hooks")



isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()&&req.user.kind==2) return next()
    res.redirect('/main_page/main')
    
}

 
  
 

router.get('/email',isAuthenticated,(req,res)=> {
    
   
       

      
       req.flash('info1',' ')
       res.render('emailForm/email', {
     
       
       message1: req.flash('info1'),
       
         })

      


})




router.get('/editor',isAuthenticated,(req,res)=> {
    
   
       

   
    email.find({user:req.user._id}, (err,findemail)=> {

     
      if((findemail.length>3)&&(req.user.grade==0)){

        
        req.flash('info1','تم الوصول الى اقصى عدد التصاميم المسموح بها لباقة حسابك ، لاضافة اكثر نرجو ترقية الحساب')
        res.render('emailForm/email', {

        
        message1: req.flash('info1'),
        
          })
      }else{


        res.render('emailForm/editor')


      }




      })

   


})


router.get('/publish',isAuthenticated,(req,res)=> {
    
   
       

    req.flash('info','')
    req.flash('info1','')
    res.render('emailForm/publish' ,{

      message1: req.flash('info1'),
      message: req.flash('info'),
    

  })
    

 


})







router.delete ('/delete/:email_id',isAuthenticated,(req,res)=>{
  
    var alert = require('alert');
    
  let quary = {_id: req.params.email_id}

 
  
  email.findOne(quary , (err,findemail)=> {
  
  
  if(findemail) {


  email.deleteOne(findemail , (err) =>{
    
    if(!err){
  
     
      res.status(200).json('deleted')
    }else {
     
      res.status(404).json(' was not deleted')
    }
  
  })
  }
  
  if(!findemail){
  
    alert("wrong number")
  
  }
  })
  
  })

  router.delete('/delete1/:email_id', async (req, res) =>{


    

    let quary = {_id: req.params.email_id}
  
    email.findOne(quary ,async (err,findemail)=> {
console.log(findemail.logoimg)

    if(findemail) {
      if(findemail.logoimg!= 'uploads/noimg.png') {
        fs.unlink(findemail.logoimg, (err) => {
            if (err) {
              console.error(err)
              
            }
        })
      }

      if(findemail.adsimg!= 'uploads/noimg.png') {
        fs.unlink(findemail.adsimg, (err) => {
            if (err) {
              console.error(err)
              
            }
        })
      }
        
    }
     
    })
    
})

router.post('/publish', (req,res)=> {
  
let quary = {_id:req.body.ad}


customer.find( {$and: [{filter:req.body.to },{user:req.user.id}]}, (err,findcustomer)=> {

  console.log(findcustomer)
  
  const userEmails = findcustomer.map(findcustomer => findcustomer.email);
email.findOne(quary , (err,findemail)=> {
  
  
 var ad = findemail.html_code ;
 var transporter = nodemailer.createTransport({
  service: req.body.ser,
  auth: {
    user: req.body.em,
    pass: req.body.pass
  }
});

var mailOptions = {
  from: req.body.em,
  to: "Undiscoled Recipents",
  bcc:userEmails,
  subject: req.body.sub,
  html: ad,

 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
console.log(error)
    req.flash('info','')
    req.flash('info1','خطا، لم يتم ارسال البريد تاكد من المعومات المدخلة')
    res.render('emailForm/publish' ,{

      message1: req.flash('info1'),
      message: req.flash('info'),
    

  })
 
  } else {

    req.flash('info','تم ارسال البريد بنجاح')
    req.flash('info1','')
    console.log('Email sent: ' + info.response);
    res.render('emailForm/publish' ,{


      message1: req.flash('info1'),
      message: req.flash('info'),


    })


  }

       
});


})
})

    
})

router.route('/icons').get(function (req, res) {

  if(req.user){

  email.find( { user:req.user.id  })

  .exec(function (err, emailsforms) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
     
      res.json(emailsforms);
    }
  
    
  });
  
  
  }
});
  

module.exports= router
