const { Router } = require("express")
const express = require("express")
const router = express.Router()
const QRcode = require('../models/QRcode')
const fs = require('fs')



isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()&&req.user.kind==2) return next()
    res.redirect('/main_page/main')
    
}

 
  
 

router.get('/view',isAuthenticated,(req,res)=> {
    
   
       

      
         
       req.flash('info1',' ')
       res.render('QRcode/view', {
     
       
       message1: req.flash('info1'),
       
         })

      
      


})



router.get('/editor',isAuthenticated,(req,res)=> {
    
   
       

    
      
    QRcode.find({user:req.user._id}, (err,findQRcode)=> {

     
      if((findQRcode.length>3)&&(req.user.grade==0)){

        
        req.flash('info1','تم الوصول الى اقصى عدد التصاميم المسموح بها لباقة حسابك ، لاضافة اكثر نرجو ترقية الحساب')
        res.render('QRcode/view', {

        
        message1: req.flash('info1'),
        
          })
      }else{


        res.render('QRcode/editor')


      }




      })

   


})




router.delete ('/delete/:qr_id',isAuthenticated,(req,res)=>{
  
   
    
  let quary = {_id: req.params.qr_id}

 

  QRcode.deleteOne(quary , (err) =>{
    
    if(!err){
  
     
      res.status(200).json('deleted')
    }else {
     
      res.status(404).json(' was not deleted')
    }
  
  })
 

  
 
  
  })

  router.delete('/delete1/:qr_id', async (req, res) =>{


    let quary = {_id: req.params.qr_id}
  
    QRcode.findOne(quary ,async (err,QRcode)=> {


    if(QRcode) {
      if(QRcode.logoimg!= 'uploads/noimg.png') {
        fs.unlink(QRcode.logoimg, (err) => {
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
    QRcode.find( { user:req.user.id  })
  
    .exec(function (err, qrcode) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
       
        res.json(qrcode);
      }
  
      
    });
    
  }
  
  });


  


  router.get("/view/:QRid", (req, res) => {
    let  quary  = {_id:req.params.QRid};
   
    QRcode.findOne(quary , (err,QRcode1)=> {

      if(QRcode1){

        QRcode.updateOne(quary ,{view: QRcode1.view+1} , (err)=>{

        console.log(err)
        })



      }
           
      
   
   
   res.redirect(QRcode1.link)

       

       
   
    }) 

    
});


router.get("/publish/:QRid", (req, res) => {
    let  quary  = {_id:req.params.QRid};
   
    QRcode.findOne(quary , (err,QRcode1)=> {

      if(QRcode1){

        
 return  res.send(QRcode1.html_code)


      }
           
       
   
   
 
   
    }) 

    
});
  


module.exports= router