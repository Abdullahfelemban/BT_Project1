
const { compile } = require("ejs")
const { Router } = require("express")
const express = require("express")
const router = express.Router()
const emailsforms = require('../models/emails_forms')
var uuid = require('uuid');

isAuthenticated = (req,res,next) => {
  if (req.isAuthenticated()&&req.user.kind==2) return next()
  res.redirect('/main_page/main')
  
}

var emailid ;


var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v4()+".png")
    }
})

var upload = multer({ storage: storage })




router.post('/upload',isAuthenticated, upload.fields([{
    name: 'logoimg', maxCount: 1
}, {
  name: 'adsimg', maxCount: 1
}]), function(req, res, next){
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  
  var inst = "bi-instagram" ;
  var twt = "bi-twitter";
  var fac = "bi-facebook";
  
  var l1 ,l2,l3;
  var upImg1 , upImg2 ; 
  


  if (typeof req.files.logoimg === "undefined") {

   
  upImg1 = "uploads/noimg.png"
 

  } else{
    upImg1= req.files.logoimg[0].path;
    
   
  }


  if (typeof req.files.adsimg === "undefined") {

   
    upImg2 = "uploads/noimg.png"
  
    }
  else{
   
    upImg2= req.files.adsimg[0].path;

  }


  if(req.body.sm1==1){

    l1 = inst ;
  }else if (req.body.sm1==2){

    l1=twt ;
  }else if(req.body.sm1==3){
    l1=fac ;
  }
  if(req.body.sm2==1){

    l2 = inst ;
  }else if (req.body.sm2==2){

    l2=twt ;
  }else if(req.body.sm2==3){
    l2=fac ;
  }
  if(req.body.sm3==1){

    l3 = inst ;
  }else if (req.body.sm3==2){

    l3=twt ;
  }else if(req.body.sm3==3){
    l3=fac ;
  }

var h = `<center> <p style="color:green;">  تم حفظ تصميمك بنجاح للرجوع لصفحة الرئيسية اضغط <a href="/emailForm/email">هنا </a></p> </center>` ;
  var response = `
  <head>
 
  
  <link rel="shortcut icon" href="/imgs/icon.png" />
 
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
  <title>Business Tools</title>
  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
 
</head>
  <body >

  
  <center>
 
  
    <div > <a href="${req.body.logolink}" ><img src="${upImg1}" width="200px"  ></a> </div> 
  
    
  
     <div> <img src="${upImg2}" width="50%" style="margin-top: 50px;" ></div>
  
     <div style="text-align: center; margin-top: 50px;" > <a href="${req.body.buttonlink}"> 
     
     
     <button style="width:180px;height:40px;cursor:pointer;background-color:${req.body.themcolor};font-size:20px;border-radius:10%;color:${req.body.fontcolor};"> ${req.body.actionbutton}</button></a> </div> 
  
     
     <div style="background-color:${req.body.themcolor}; width: 50%;height: 190px;margin-top: 100px;">
  <br>
      <div style="text-align: center;"> 
 
          <a href="${req.body.s1}" class="me-2 text-reset"> <i class=" ${l1}" style="font-size: 30px; color: ${req.body.fontcolor};"></i></a> 
          <a href="${req.body.s2}" class="me-2 text-reset"> <i class="${l2}"style="font-size: 30px; color: ${req.body.fontcolor};" ></i></a> 
          <a href="${req.body.s3}" class="me-2 text-reset"> <i class=" ${l3}" style="font-size: 30px; color: ${req.body.fontcolor};"></i></a> 
          
      
      </div> 
<br>
      <div><p style="color:${req.body.fontcolor};text-align: center;">   ©  ${new Date().getFullYear()} ${req.body.namec} - جميع الحقوق محفوظة  </p></div>
      <div><p style="color: ${req.body.fontcolor};text-align: center;"> ${req.body.address}</p></div>
      <div style="text-align: center;"> 
    
          <a style="color: ${req.body.fontcolor};" href="${req.body.contact}">اتصل بنا</a>
      
      </div> 
  
     </div>
     </center>

  </body>
  
 `
   


 
var icon =  ` <center>
    <div > <a  ><img src="/${upImg1}" width="100px"  ></a> </div> 
  
    
  
     <div> <img src="/${upImg2}" width="230px" style="margin-top: 5px;" ></div>
  
     <div style="text-align: center; margin-top: 5px;" > 
     
     
     <button style="width:70px;cursor:text;height:40px;background-color:${req.body.themcolor};font-size:12px;border-radius:10%;color:${req.body.fontcolor};">${req.body.actionbutton} </button></a> </div> 
  
     
     <div style="background-color:${req.body.themcolor}; width: 100%;height: 90px;margin-top: 10px;">
  
      <div style="text-align: center;"> 
 
          <a  class="me-1 text-reset" > <i class=" ${l1}" style="font-size: 15px; color: ${req.body.fontcolor};"></i></a> 
          <a  class="me-1 text-reset"> <i class="${l2}"style="font-size: 15px; color: ${req.body.fontcolor};" ></i></a> 
          <a  class="me-1 text-reset"> <i class=" ${l3}" style="font-size: 15px; color: ${req.body.fontcolor};"></i></a> 
          
      
      </div> 

      <div style="color:${req.body.fontcolor};text-align: center;font-size: 10px;">   ©  ${new Date().getFullYear()} ${req.body.namec} - جميع الحقوق محفوظة  </div>
      <div style="color: ${req.body.fontcolor};text-align: center;font-size: 10px;"> ${req.body.address}</div>
      <div style="text-align: center;"> 
    
          <a style="color: ${req.body.fontcolor};font-size: 10px;" >اتصل بنا</a>
      
      </div> 
  
     </div>
     </center> `






 let icons = new emailsforms ({
  html_code:response,
  icons: icon,
  logoimg:upImg1,
  adsimg:upImg2,
  namec :req.body.namec,
  address:req.body.address,
  contact:req.body.contact,
  themcolor:req.body.themcolor,
  fontcolor:req.body.fontcolor,
  logolink:req.body.logolink,
  buttonlink:req.body.buttonlink,
  user:req.user._id
 
})

icons.save((err)=>{
   
  if(!err){
 
  }

 else {
  
console.log(err)


 }

})
  
  return res.send(h+response)

})

var logoimg;
var adsimg;
var namec,address,contact,themcolor,fontcolor,logolink,buttonlink;

router.post('/upload2',isAuthenticated,  upload.fields([{
  name: 'logoimg', maxCount: 1
}, {
name: 'adsimg', maxCount: 1
}]), function(req, res, next){

  var inst = "bi-instagram" ;
  var twt = "bi-twitter";
  var fac = "bi-facebook";
  
  var l1 ,l2,l3;

  var upImg1 ;
  
  var upImg2 ; 
  
  if (typeof req.files.logoimg === "undefined") {

   
  upImg1 = logoimg ;
 

  } else{
    upImg1= req.files.logoimg[0].path;
    
   
  }


  if (typeof req.files.adsimg === "undefined") {

   
    upImg2 = adsimg;
  
    }
  else{
   
    upImg2= req.files.adsimg[0].path;

  }

  if(req.body.sm1==1){

    l1 = inst ;
  }else if (req.body.sm1==2){

    l1=twt ;
  }else if(req.body.sm1==3){
    l1=fac ;
  }
  if(req.body.sm2==1){

    l2 = inst ;
  }else if (req.body.sm2==2){

    l2=twt ;
  }else if(req.body.sm2==3){
    l2=fac ;
  }
  if(req.body.sm3==1){

    l3 = inst ;
  }else if (req.body.sm3==2){

    l3=twt ;
  }else if(req.body.sm3==3){
    l3=fac ;
  }

  var h = `<center> <p style="color:green;">  تم حفظ تصميمك بنجاح للرجوع لصفحة الرئيسية اضغط <a href="/emailForm/email">هنا </a></p> </center>` ;
  var response = `
  <head>
 
  
  <link rel="shortcut icon" href="/imgs/icon.png" />
 
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
  <title>Business Tools</title>
  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
 
</head>
  <body >

  
  <center>
 
   
    <div > <a href="${req.body.logolink}" ><img src="${upImg1}" width="200px"  ></a> </div> 
  
    
  
     <div> <img src="${upImg2}" width="50%" style="margin-top: 50px;" ></div>
  
     <div style="text-align: center; margin-top: 50px;" > <a href="${req.body.buttonlink}"> 
     
     
     <button style="width:180px;height:40px;cursor:pointer;background-color:${req.body.themcolor};font-size:20px;border-radius:10%;color:${req.body.fontcolor};"> ${req.body.actionbutton}</button></a> </div> 
  
     
     <div style="background-color:${req.body.themcolor}; width: 50%;height: 190px;margin-top: 100px;">
  <br>
      <div style="text-align: center;"> 
 
          <a href="${req.body.s1}" class="me-2 text-reset"> <i class=" ${l1}" style="font-size: 30px; color: ${req.body.fontcolor};"></i></a> 
          <a href="${req.body.s2}" class="me-2 text-reset"> <i class="${l2}"style="font-size: 30px; color: ${req.body.fontcolor};" ></i></a> 
          <a href="${req.body.s3}" class="me-2 text-reset"> <i class=" ${l3}" style="font-size: 30px; color: ${req.body.fontcolor};"></i></a> 
          
      
      </div> 
<br>
      <div><p style="color:${req.body.fontcolor};text-align: center;">   ©  ${new Date().getFullYear()} ${req.body.namec} - جميع الحقوق محفوظة  </p></div>
      <div><p style="color: ${req.body.fontcolor};text-align: center;"> ${req.body.address}</p></div>
      <div style="text-align: center;"> 
    
          <a style="color: ${req.body.fontcolor};" href="${req.body.contact}">اتصل بنا</a>
      
      </div> 
  
     </div>
     </center>

  </body>
  
 `
   
var icon =  ` <center>
    <div > <a  ><img src="/${upImg1}" width="100px"  ></a> </div> 
  
    
  
     <div> <img src="/${upImg2}" width="230px" style="margin-top: 5px;" ></div>
  
     <div style="text-align: center; margin-top: 5px;" > 
     
     
     <button style="width:70px;cursor:text;height:40px;background-color:${req.body.themcolor};font-size:12px;border-radius:10%;color:${req.body.fontcolor};">${req.body.actionbutton} </button></a> </div> 
  
     
     <div style="background-color:${req.body.themcolor}; width: 100%;height: 90px;margin-top: 10px;">
  
      <div style="text-align: center;"> 
 
          <a  class="me-1 text-reset" > <i class=" ${l1}" style="font-size: 15px; color: ${req.body.fontcolor};"></i></a> 
          <a  class="me-1 text-reset"> <i class="${l2}"style="font-size: 15px; color: ${req.body.fontcolor};" ></i></a> 
          <a  class="me-1 text-reset"> <i class=" ${l3}" style="font-size: 15px; color: ${req.body.fontcolor};"></i></a> 
          
      
      </div> 

      <div style="color:${req.body.fontcolor};text-align: center;font-size: 10px;">   ©  ${new Date().getFullYear()} ${req.body.namec} - جميع الحقوق محفوظة  </div>
      <div style="color: ${req.body.fontcolor};text-align: center;font-size: 10px;"> ${req.body.address}</div>
      <div style="text-align: center;"> 
    
          <a style="color: ${req.body.fontcolor};font-size: 10px;" >اتصل بنا</a>
      
      </div> 
  
     </div>
     </center> `



     let quary = {_id: emailid}

     emailsforms.findOne(quary , (err,findemail)=> {
     
     
     if(findemail) {

      

      emailsforms.updateOne(findemail ,{
        html_code:response,
        icons:icon,
        logoimg:upImg1,
        adsimg:upImg2,
         namec :req.body.namec,
        address:req.body.address,
        contact:req.body.contact,
        themcolor:req.body.themcolor,
        fontcolor:req.body.fontcolor,
        logolink:req.body.logolink,
        buttonlink:req.body.buttonlink,}, (err) =>{
       
       if(!err){
     
        
        console.log(err)
       }else {
        
        console.log(err)
       }
     
     })
     }
     
     if(!findemail){
     
      console.log(err)
     
     }
     })


 

  
  return res.send(h+response)

})



router.post ('/update/:email_id',isAuthenticated,(req,res)=>{
  
  emailid=req.params.email_id;
  
 
  emailsforms.findOne({_id : req.params.email_id} , (err,findemail)=> {

     logoimg = findemail.logoimg ;
     adsimg = findemail.adsimg;
     namec =findemail.namec;
     address=findemail.address;
     contact=findemail.contact;
     themcolor=findemail.themcolor;
     fontcolor=findemail.fontcolor;
     logolink=findemail.logolink;
     buttonlink=findemail.buttonlink;
  })

  res.render('emailForm/update', {

    
    logoimg : logoimg ,
    adsimg : adsimg,
    namec :namec,
    address:address,
    contact:contact,
    themcolor:themcolor,
    fontcolor:fontcolor,
    logolink:logolink,
    buttonlink:buttonlink
      })
})

router.get('/update',isAuthenticated,(req,res)=> {
    
  res.render('emailForm/update', {

  
      logoimg : logoimg ,
      adsimg : adsimg,
      namec :namec,
      address:address,
      contact:contact,
      themcolor:themcolor,
      fontcolor:fontcolor,
      logolink:logolink,
      buttonlink:buttonlink
        })
    
})








module.exports= router