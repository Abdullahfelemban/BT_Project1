const { compile } = require("ejs")
const { Router } = require("express")
const express = require("express")
const router = express.Router()
const QRcode = require('../models/QRcode')
var uuid = require('uuid');

isAuthenticated = (req,res,next) => {
  if (req.isAuthenticated()&&req.user.kind==2) return next()
  res.redirect('/main_page/main')
  
}


var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './QRuploads')
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v4()+".png")
    }
})

var upload = multer({ storage: storage })




router.post('/QRuploads',isAuthenticated, upload.fields([{
    name: 'logoimg', maxCount: 1
}
]), function(req, res, next){
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  
 


  if (typeof req.files.logoimg === "undefined") {

   
  upImg1 = "uploads/noimg.png"
 

  } else{
    upImg1= req.files.logoimg[0].path;
    
   
  }

  


  let QR = new QRcode ({
    
   logoimg:upImg1 ,
   link: req.body.link,
   view:0,
   user:req.user._id

  })

 

 

var h = `<center> <p style="color:green;">  تم حفظ تصميمك بنجاح للرجوع لصفحة الرئيسية اضغط <a href="/QRcode/view">هنا </a></p> </center>` ;
  var response = `
  <head>
 
  
  <link rel="shortcut icon" href="/imgs/icon.png" />
 
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
  <title>Business Tools</title>
  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
 
</head>
  <body  >

  
  <center>
 <br><br>
  <img style="margin-top: 50px;" src="https://chart.googleapis.com/chart?cht=qr&chl=https://businesstools.online/QRcode/view/${QR.id}&chs=400x400&chld=L|0"	class="qr-code img-thumbnail img-responsive" />
  <div  class="img">
  <label style="position: absolute;top: 260px;left: 920px;">
      <img src="/${upImg1}" width="80px">
     
    </label>
  
    </div> <br>

    </center>
   


  
 `
   


 
var icon =  ` 

     



<center>

<br>
<div><img src="https://chart.googleapis.com/chart?cht=qr&chl=https://businesstools.online/QRcode/view/${QR.id}&chs=200x200&chld=L|0" />

 <img src="/${upImg1}" width="60px"  style="position: absolute;top:120px;right:115px;"/> </div>

 
</center>
 
 
`



QR.icons= icon ;
QR.html_code=response;



QR.save();

  return res.send(h+response)

})


var logoimg;
var QRcodeid;
var link1;
router.post('/QRuploads2',isAuthenticated,  upload.fields([{
    name: 'logoimg', maxCount: 1
  }]), function(req, res, next){
  
   
    var upImg1 ;
    
    
    
    if (typeof req.files.logoimg === "undefined") {
  
     
    upImg1 = logoimg ;
   
  
    } else{
      upImg1= req.files.logoimg[0].path;
      
     
    }
  
  
  
    var h = `<center> <p style="color:green;">  تم حفظ تصميمك بنجاح للرجوع لصفحة الرئيسية اضغط <a href="/QRcode/view">هنا </a></p> </center>` ;
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
 <br><br>
  <img style="margin-top: 50px;" src="https://chart.googleapis.com/chart?cht=qr&chl=https://businesstools.online/QRcode/view/${QRcodeid}&chs=400x400&chld=L|0"	class="qr-code img-thumbnail img-responsive" />
  <div  class="img">
  <label style="position: absolute;top: 260px;left: 920px;">
      <img src="/${upImg1}" width="80px">
     
    </label>
  
    </div> <br>

    </center>
   


  
 `
   


 
var icon =  ` 

     



<center>

<br>
<div><img src="https://chart.googleapis.com/chart?cht=qr&chl=https://businesstools.online/QRcode/view/${QRcodeid}&chs=200x200&chld=L|0" />

 <img src="/${upImg1}" width="60px"  style="position: absolute;top:120px;right:115px;"/> </div>

 
</center>
 
 
`
  
  
  
       let quary = {_id: QRcodeid}
  
       QRcode.findOne(quary , (err,QRcode1)=> {
       
       
       if(QRcode1) {
  
        
  
        QRcode.updateOne(QRcode1 ,{html_code:response,icons:icon,logoimg:upImg1,link:req.body.link}, (err) =>{
         
         if(!err){
       
          
         
         }else {
          
          console.log(err)
         }
       
       })
       }
       
       if(!QRcode1){
       
        console.log(err)
       
       }
       })
  
  
   
  
    
    return res.send(h+response)
  
  })
  
  
  
  router.post ('/update/:qr_id',isAuthenticated,(req,res)=>{
    
    QRcodeid=req.params.qr_id;
    
   
    QRcode.findOne({_id : req.params.qr_id} , (err,QRcode)=> {
  
       logoimg = QRcode.logoimg ;
       link1 = QRcode.link;
  
    })
  
    res.render('QRcode/update', {
  
      
      logoimg : logoimg ,
      link: link1
    
        })
  })
  
  router.get('/update',isAuthenticated,(req,res)=> {
      
    res.render('QRcode/update', {
  
    
        logoimg : logoimg ,
        link: link1
      
          })
      
  })
  

module.exports= router
