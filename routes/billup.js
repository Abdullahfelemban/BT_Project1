const { compile } = require("ejs")
const { Router } = require("express")
const express = require("express")
const router = express.Router()
const bill = require('../models/bill')
var uuid = require('uuid');
const product = require('../models/product')

isAuthenticated = (req,res,next) => {
  if (req.isAuthenticated()&&req.user.kind==2) return next()
  res.redirect('/main_page/main')
  
}

var billid ;


var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './billup')
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v4()+".png")
    }
})

var upload = multer({ storage: storage })






router.post('/billup',isAuthenticated, upload.fields([{
    name: 'logoimg', maxCount: 1

}]), function(req, res, next){
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  
  var inst = "bi-instagram" ;
  var twt = "bi-twitter";
  var fac = "bi-facebook";
  
  var l1 ,l2,l3;
  var upImg1  ; 
  
  

  if (typeof req.files.logoimg === "undefined") {

   
  upImg1 = "uploads/noimg.png"
 

  } else{
    upImg1= req.files.logoimg[0].path;
    
   
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

  
  product.find({number:req.body.product}, (err,find)=> {
  

var h = `<center> <p style="color:green;">  تم حفظ تصميمك بنجاح للرجوع لصفحة الرئيسية اضغط <a href="/bill/view">هنا </a></p> </center>` ;
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
 
  
    <div > <a href="${req.body.logolink}" ><img src="/${upImg1}" width="200px"  ></a> </div> 
  
    
  
    <table class="table caption-top" style="width: 600px;" dir="rtl">


        <caption style="text-align: right;">قائمة المنتجات</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> صورة المنتج</th>
            <th scope="col">الكمية</th>
            <th scope="col">السعر</th>
          </tr>
          <tbody> </thead>
         `


         var sum=0;
        if(typeof req.body.number === "string"){

            sum+= req.body.number[0]*find[0].price; 
            response+=  ` <tr>
            <th scope="row">${1}</th>
            <td><img src="/${find[0].img}" width="80px"  ></td>
            <td>${req.body.number[0]} </td>
            
            <td>${find[0].price}</td>
            </tr>
           
        ` 
        response+=  ` </tbody></table><tr  > <h4>المجموع: ${sum}</h4></tr>`
        }else{


         
    
for(i=0;i<find.length;i++) {


    sum+= req.body.number[i]*find[i].price; 
    
    response+=  ` <tr>
    <th scope="row">${i+1}</th>
    <td><img src="/${find[i].img}" width="80px"  ></td>
    <td>${req.body.number[i]} </td>
    
    <td>${find[i].price}</td>
    </tr>
   
    ` 
    
    }
    response+=  ` </tbody></table><tr  > <h4>المجموع: ${sum}</h4></tr>`
    } 
    
  
response+=  `
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
  
    
    <table class="table caption-top" style="width: 100px;font-size:10px" dir="rtl">


    <caption style="text-align: right;">قائمة المنتجات</caption>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col"> صورة المنتج</th>
        <th scope="col">الكمية</th>
        <th scope="col">السعر</th>
      </tr>
      <tbody> </thead>
     `

var sum=0;

    if(typeof req.body.number === "string"){
        sum+= req.body.number[0]*find[0].price;
        icon+=  ` <tr>
        <th scope="row">${1}</th>
        <td><img src="/${find[0].img}" width="40px"  /></td>
        <td>${req.body.number[0]} </td>
        
        <td>${find[0].price}</td>
        </tr>
       
    ` 
    icon+=  ` </tbody></table><tr  > <h6>المجموع: ${sum}</h6></tr>`
    }else{


     

for(i=0;i<find.length;i++) {


    sum+= req.body.number[i]*find[i].price; 

    icon+=  ` <tr>
<th scope="row">${i+1}</th>
<td><img src="/${find[i].img}" width="40px"  /></td>
<td>${req.body.number[i]} </td>

<td>${find[i].price}</td>
</tr>

` 

}
icon+=  ` </tbody></table><tr  > <h6>المجموع: ${sum}</h6></tr>`

} 


icon+=  `
  
     
     
     
     
     
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





     let icons = new bill ({
        html_code:response,
        icons: icon,
        logoimg:upImg1,
         namec :req.body.namec,
        address:req.body.address,
        contact:req.body.contact,
        themcolor:req.body.themcolor,
        fontcolor:req.body.fontcolor,
        logolink:req.body.logolink,
        user:req.user._id
       
       
      })

for(i=0;i<find.length;i++) {
      icons.product.push(find[i]._id);
}
      icons.save((err)=>{
         
        if(!err){
       
        }
      
       else {
        
      console.log(err)
      
      
       }
      
      })
        



     return res.send(h+response)
})



})

var logoimg;

var namec,address,contact,themcolor,fontcolor,logolink;

router.post('/billup2',isAuthenticated,  upload.fields([{
  name: 'logoimg', maxCount: 1
}]), function(req, res, next){

  var inst = "bi-instagram" ;
  var twt = "bi-twitter";
  var fac = "bi-facebook";
  
  var l1 ,l2,l3;

  var upImg1 ;
  
  
  if (typeof req.files.logoimg === "undefined") {

   
  upImg1 = logoimg ;
 

  } else{
    upImg1= req.files.logoimg[0].path;
    
   
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

  product.find({number:req.body.product}, (err,find)=> {
  

    var h = `<center> <p style="color:green;">  تم حفظ تصميمك بنجاح للرجوع لصفحة الرئيسية اضغط <a href="/bill/view">هنا </a></p> </center>` ;
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
     
      
        <div > <a href="${req.body.logolink}" ><img src="/${upImg1}" width="200px"  ></a> </div> 
      
        
      
        <table class="table caption-top" style="width: 600px;" dir="rtl">
    
    
            <caption style="text-align: right;">قائمة المنتجات</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"> صورة المنتج</th>
                <th scope="col">الكمية</th>
                <th scope="col">السعر</th>
              </tr>
              <tbody> </thead>
             `
    
    var sum=0;
    
            if(typeof req.body.number === "string"){
                sum+= req.body.number[0]*find[0].price; 
                response+=  ` <tr>
                <th scope="row">${1}</th>
                <td><img src="/${find[0].img}" width="80px"  ></td>
                <td>${req.body.number[0]} </td>
                
                <td>${find[0].price}</td>
                </tr>
               
            ` 
            response+=  ` </tbody></table><tr  > <h4>المجموع: ${sum}</h4></tr>`
            }else{
    
    
     var sum =0;      
        
    for(i=0;i<find.length;i++) {
    
    
        sum+= req.body.number[i]*find[i].price; 
        
        response+=  ` <tr>
        <th scope="row">${i+1}</th>
        <td><img src="/${find[i].img}" width="80px"  ></td>
        <td>${req.body.number[i]} </td>
        
        <td>${find[i].price}</td>
        </tr>
       
    ` 
     
    }
    response+=  ` </tbody></table><tr  > <h4>المجموع: ${sum}</h4></tr>` 
    } 
        
      
    response+=  `
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
      
        
        <table class="table caption-top" style="width: 100px;font-size:10px" dir="rtl">
    
    
        <caption style="text-align: right;">قائمة المنتجات</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> صورة المنتج</th>
            <th scope="col">الكمية</th>
            <th scope="col">السعر</th>
          </tr>
          <tbody> </thead>
         `
    
    
    var sum=0;
        if(typeof req.body.number === "string"){
            sum+= req.body.number[0]*find[0].price;
            icon+=  ` <tr>
            <th scope="row">${1}</th>
            <td><img src="/${find[0].img}" width="40px"  /></td>
            <td>${req.body.number[0]} </td>
            
            <td>${find[0].price}</td>
            </tr>
           
        ` 
        icon+=  ` </tbody></table><tr  > <h6>المجموع: ${sum}</h6></tr>`
        }else{
    
    
         
    var sum =0;
    for(i=0;i<find.length;i++) {
    
        sum+= req.body.number[i]*find[i].price; 

        icon+=  ` <tr>
    <th scope="row">${i+1}</th>
    <td><img src="/${find[i].img}" width="40px"  /></td>
    <td>${req.body.number[i]} </td>
    
    <td>${find[i].price}</td>
    </tr>
    
    ` 
   
    
    }

    icon+=  ` </tbody></table><tr  > <h6>المجموع: ${sum}</h6></tr>`

    

    } 
    
    
    icon+=  `
         
      
         
         
         
         
         
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


     let quary = {_id: billid}

     bill.findOne(quary , (err,findbill)=> {
     
     
     if(findbill) {

      

      bill.updateOne(findbill ,{
          html_code:response,
          icons:icon,
          logoimg:upImg1 ,
          namec :req.body.namec,
        address:req.body.address,
        contact:req.body.contact,
        themcolor:req.body.themcolor,
        fontcolor:req.body.fontcolor,
        logolink:req.body.logolink,
       }, (err) =>{
       
       if(!err){
     
        
        console.log(err)
       }else {
        
        console.log(err)
       }
     
     })
     }
     
     if(!findbill){
     
      console.log(err)
     
     }
     })


 

  
  return res.send(h+response)

})

})


router.post ('/update/:bill_id',isAuthenticated,(req,res)=>{
  
  billid=req.params.bill_id;
  
 
  bill.findOne({_id : req.params.bill_id} , (err,findbill)=> {

     logoimg = findbill.logoimg ;
     namec =findbill.namec;
     address=findbill.address;
     contact=findbill.contact;
     themcolor=findbill.themcolor;
     fontcolor=findbill.fontcolor;
     logolink=findbill.logolink;
    

  })

  res.render('bill/update', {

    
    logoimg : logoimg ,
    namec :namec,
    address:address,
    contact:contact,
    themcolor:themcolor,
    fontcolor:fontcolor,
    logolink:logolink,
   
  
      })
})

router.get('/update',isAuthenticated,(req,res)=> {
    
  res.render('bill/update', {

  
      logoimg : logoimg ,
      namec :namec,
      address:address,
      contact:contact,
      themcolor:themcolor,
      fontcolor:fontcolor,
      logolink:logolink,
      
    
        })
    
})








module.exports= router