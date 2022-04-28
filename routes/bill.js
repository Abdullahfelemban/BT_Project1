const { Router } = require("express")
const express = require("express")
const router = express.Router()
const bill = require('../models/bill')
const fs = require('fs')
const customer = require('../models/customer')
var nodemailer = require('nodemailer');
const { PerformanceNodeTiming } = require("perf_hooks")



isAuthenticated = (req,res,next) => {

 
    if (req.isAuthenticated()&&req.user.kind==2) return next()
    res.redirect('/main_page/main')
    
}

router.get('/view',isAuthenticated,(req,res)=> {
    
   
       

      
       req.flash('info1',' ')
       res.render('bill/view', {
     
       
       message1: req.flash('info1'),
       
         })

})


router.get('/editor',isAuthenticated,(req,res)=> {
    
  

  
  bill.find({user:req.user._id}, (err,findebill)=> {

     
    if((findebill.length>3)&&(req.user.grade==0)){

      
      req.flash('info1','تم الوصول الى اقصى عدد التصاميم المسموح بها لباقة حسابك ، لاضافة اكثر نرجو ترقية الحساب')
      res.render('bill/view', {

      
      message1: req.flash('info1'),
      
        })
    }else{


      res.render('bill/editor')


    }




    })
  
})


router.get('/publish',isAuthenticated,(req,res)=> {
    
   
       

    req.flash('info','')
    req.flash('info1','')
    res.render('bill/publish' ,{

      message1: req.flash('info1'),
      message: req.flash('info'),
    

  })
    

 


})


router.delete ('/delete/:bill_id',isAuthenticated,(req,res)=>{
  
    var alert = require('alert');
    
  let quary = {_id: req.params.bill_id}

 
  
  bill.findOne(quary , (err,findbill)=> {
  
  
  if(findbill) {


  bill.deleteOne(findbill , (err) =>{
    
    if(!err){
  
     
      res.status(200).json('deleted')
    }else {
     
      res.status(404).json(' was not deleted')
    }
  
  })
  }
  
  if(!findbill){
  
    alert("wrong number")
  
  }
  })
  
  })

  router.delete('/delete1/:bill_id', async (req, res) =>{


    

    let quary = {_id: req.params.bill_id}
  
    bill.findOne(quary ,async (err,findbill)=> {
console.log(findbill.logoimg)

    if(findbill) {
      if(findbill.logoimg!= 'uploads/noimg.png') {
        fs.unlink(findbill.logoimg, (err) => {
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



bill.findOne(quary , (err,findemail)=> {
  
  
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
  to: req.body.billto,
  subject: req.body.sub,
  html: ad,

 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {

    req.flash('info','')
    req.flash('info1','خطا، لم يتم ارسال البريد تاكد من المعومات المدخلة')
    res.render('bill/publish' ,{

      message1: req.flash('info1'),
      message: req.flash('info'),
    

  })
 
  } else {

    req.flash('info','تم ارسال البريد بنجاح')
    req.flash('info1','')
    console.log('Email sent: ' + info.response);
    res.render('bill/publish' ,{


      message1: req.flash('info1'),
      message: req.flash('info'),


    })


  }

       
});


})


    
})

router.route('/icons').get(function (req, res) {

  
if(req.user){
  bill.find( { user:req.user.id  })


 
  .exec(function (err, bill) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
     
      res.json(bill);
    }

    
  });

}

});
  
module.exports= router
