const { compile } = require("ejs")
const { Router } = require("express")
const express = require("express")
const router = express.Router()
const pageform = require('../models/page_forms')
const link = require('../models/link')
var uuid = require('uuid');

isAuthenticated = (req,res,next) => {
  if (req.isAuthenticated()&&req.user.kind==2) return next()
  res.redirect('/main_page/main')
  
}


var pageid ,dis ,name,themcolor,fontcolor,backcolor;



var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './linkuploads')
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v4()+".png")
    }
})

var upload = multer({ storage: storage })




router.post('/linkuploads',isAuthenticated, upload.fields([{
    name: 'logoimg', maxCount: 1
}, {

  name: 'img',
}]), function(req, res, next){
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  let icons ;
  var links ;
 var upImg1,upImg2,upImgs;
  if (typeof req.files.logoimg === "undefined") {

   
    upImg1 = "uploads/noimg.png"
   
  
    } else{
      upImg1= req.files.logoimg[0].path;
      
     
    }

    

    if (typeof req.files.img === "undefined") {

   
        upImg2 = "uploads/noimg.png"
      
        }
      else{
       
        upImg2= req.files.img[0].path;
    
      }

      upImgs="uploads/noimg.png";
      


      var icon = `
    
      <body style="background-color:${req.body.backcolor}">
    
      
      <center>
     
      
      
        <div ><img src="/${upImg1}" width="100px"  ></a> </div> 
      
        <p style="color:${req.body.fontcolor}">${req.body.dis} </p>  `
      
        
  
        if(typeof req.body.linkadd === "string"){
  
            icon += `   <div> <button type="button"  style="color:${req.body.fontcolor};cursor:text; width: 200px;height: 35px;border-radius: 50px;background-color: ${req.body.themcolor};text-align: right;" >
          <img src="/${upImg2}" AlIGN="left" style="display:inline;" width="30px"> 
          <span  style="font-size: 15px;display:inline;" >${req.body.linkadd}</span></button></div><br>
      
          `
  
        } else{
  

            
        for(i=0;i<req.body.linkadd.length;i++){

           
  
            icon += `   <div style="margin-top: 5px;"> <button type="button"   style="color:${req.body.fontcolor};cursor:text;  width: 200px;height: 35px;border-radius: 50px;background-color: ${req.body.themcolor};text-align: right;" >
          <img src="/${req.files.img[i].path}" AlIGN="left" style="display:inline;" width="30px"> 
          <span  style="font-size: 15px;display:inline;" >${req.body.linkadd[i]}</span></button></div>
      
          `
        }
      }
      
      icon +=`
         
         <div style="background-color:${req.body.themcolor}; width: 100%;height: 100px;margin-top: 10px;position: relative;bottom: 0px;">
            
          <div style="text-align: center;"> 
     
              <h5 style="color:${req.body.fontcolor};font-size: 10px;">  الاشتراك بالقائمة البريدية</h5>
             <input type="text"   > <button style="cursor:text;" type="button" class="btn btn-danger">اشتراك</button>
          
          </div> 
    
      
      </div>
      </center>
    
      </body>`
  

      var h = `<center> <p style="color:green;">  تم حفظ تصميمك بنجاح للرجوع لصفحة الرئيسية اضغط <a href="/pageForm/view">هنا </a></p> </center>` ;
  var response = `
  <head>
 
  
    <link rel="shortcut icon" href="/imgs/icon.png" />
   
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    <title>Business Tools</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
   
  </head>
    <body style="background-color:${req.body.backcolor} ;">
  
    
    <center>
   
    
    
      <div ><img src="/${upImg1}" width="200px"  ></a> </div> <br><br>
    
      <p style="color:${req.body.fontcolor}; font-size:32px">${req.body.dis} </p> <br> `

     
      icons = new pageform ({

        html_code:response,
        icons: icon,
        logoimg:upImg1,
        dis:req.body.dis,
        name:req.body.name, 
        view:0,
        themcolor:req.body.themcolor,
        fontcolor:req.body.fontcolor,
        backcolor:req.body.backcolor,
        user:req.user._id
      })

      if(typeof req.body.linkadd === "string"){

         links = new link ({

            linkname:req.body.linkadd ,
        
            link: req.body.link,
        
            click: 0,
            img:upImg2 ,
          })

          links.save(function(err, links){
            icons.link.push(links);
            icons.save();
        }) 
        response += `   <div > <button type="button"  onclick="location.href='${req.body.link}';" style="color:${req.body.fontcolor}; width: 600px;height: 80px;border-radius: 50px;background-color: ${req.body.themcolor};text-align: right;" >
        <img src="/${upImg2}" AlIGN="left" style="display:inline;margin-left: 20px;" width="70px"> 
        <span  style="font-size: 40px;display:inline;margin-right: 20px;" >${req.body.linkadd}</span></button></div><br>
    
        `

      } else{

       
      
      for(i=0;i<req.body.linkadd.length;i++){

        

         links = new link ({

            linkname:req.body.linkadd[i] ,
        
            link: req.body.link[i],
        
            click: 0,
            img:req.files.img[i].path ,
          })

            links.save();
            
        icons.link.push(links);
        
        
       response += `   <div > <button type="button"  onclick="location.href='${req.body.link[i]}';" style="color:${req.body.fontcolor}; width: 600px;height: 80px;border-radius: 50px;background-color: ${req.body.themcolor};text-align: right;" >
        <img src="/${req.files.img[i].path}" AlIGN="left" style="display:inline;margin-left: 20px;" width="70px"> 
        <span  style="font-size: 40px;display:inline;margin-right: 20px;" >${req.body.linkadd[i]}</span></button></div><br>
    
        `
      }
     
      
      

   
    }
    
         response +=`
       
       <div style="background-color:${req.body.themcolor}; width: 100%;height: 190px;margin-top: 250px;position: relative;bottom: 0px;">
          <br><br>
        <div style="text-align: center;"> 
        
            <h5 style="color:${req.body.fontcolor}">  الاشتراك بالقائمة البريدية</h5>
           <input type="text"   id="mail" > <button onclick="get_click()" type="button" class="btn btn-danger">اشتراك</button>
           <input type="hidden" id="user" value="${req.user._id}">
        </div> 
  
    
    </div>
    </center>
    <script src="/axios/dist/axios.min.js"> </script>
    <script>
    function get_click()
    {
      const mail = document.getElementById("mail");
      const user = document.getElementById("user");
          axios.post('/pageForm/email/'+mail.value+'/'+user.value)
          .catch((err)=>{
  
            console.log(err)
              })
  
    }
    
    
    </script>
    </body>`
    
    
   
icons.html_code = response ;
      
   
      

      icons.save();


  return res.send(h+response)

})

var logoimg;
var upImg1,name;






router.post('/linkuploads2',isAuthenticated,  upload.fields([{
    name: 'logoimg', maxCount: 1

}]), function(req, res, next){
  
   
    let icons ;
    var links ;
  
    if (typeof req.files.logoimg === "undefined") {
  
     
      upImg1 = logoimg;
     
    
      } else{
        upImg1= req.files.logoimg[0].path;
        
       
      }
  
     

  
        var icon = `
      
        <body style="background-color:${req.body.backcolor}">
      
        
        <center>
       
        
        
          <div ><img src="/${upImg1}" width="100px"  ></a> </div> 
        
          <p style="color:${req.body.fontcolor}">${req.body.dis} </p>  `
        
          
    
          if(typeof req.body.linkadd === "string"){
    
              icon += `   <div> <button type="button"  style="color:${req.body.fontcolor};cursor:text; width: 200px;height: 35px;border-radius: 50px;background-color: ${req.body.themcolor};text-align: right;" >
            <img src="/${req.body.pic}" AlIGN="left" style="display:inline;" width="30px"> 
            <span  style="font-size: 15px;display:inline;" >${req.body.linkadd}</span></button></div><br>
        
            `
    
          } else{
    
  
              
          for(i=0;i<req.body.linkadd.length;i++){
  
             
    
              icon += `   <div style="margin-top: 5px;"> <button type="button"   style="color:${req.body.fontcolor};cursor:text;  width: 200px;height: 35px;border-radius: 50px;background-color: ${req.body.themcolor};text-align: right;" >
            <img src="/${req.body.pic[i]}" AlIGN="left" style="display:inline;" width="30px"> 
            <span  style="font-size: 15px;display:inline;" >${req.body.linkadd[i]}</span></button></div>
        
            `
          }
        }
        
        icon +=`
           
           <div style="background-color:${req.body.themcolor}; width: 100%;height: 100px;margin-top: 10px;position: relative;bottom: 0px;">
              
            <div style="text-align: center;"> 
       
                <h5 style="color:${req.body.fontcolor};font-size: 10px;">  الاشتراك بالقائمة البريدية</h5>
               <input type="text"   > <button style="cursor:text;" type="button" class="btn btn-danger">اشتراك</button>
            
            </div> 
      
        
        </div>
        </center>
      
        </body>`
    
  
        var h = `<center> <p style="color:green;">  تم حفظ تصميمك بنجاح للرجوع لصفحة الرئيسية اضغط <a href="/pageForm/view">هنا </a></p> </center>` ;
    var response = `
    <head>
   
    
      <link rel="shortcut icon" href="/imgs/icon.png" />
     
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
      <title>Business Tools</title>
      <!-- CSS only -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
     
    </head>
      <body style="background-color:${req.body.backcolor} ;">
    
      
      <center>
     
      
      
        <div ><img src="/${upImg1}" width="200px"  ></a> </div> <br><br>
      
        <p style="color:${req.body.fontcolor}; font-size:32px">${req.body.dis} </p> <br> `
      
       
  
        if(typeof req.body.linkadd === "string"){
  
            pageform.find( {_id:pageid  }).populate('link').exec(function (err,page) {
  
    
                if (err) {
                  console.log(err);
                  res.json(err);
                } else {
                 
                   

                    link.updateOne({_id:page[0].link[0].id},{
                        linkname: req.body.linkadd,

                        link:req.body.link
                    
                        
                    
                    }, (err) =>{
                     
                        console.log(err)

                    })

                  
                }
            
                
              });
        


          response += `   <div > <button type="button"  onclick="location.href='${req.body.link}';" style="color:${req.body.fontcolor}; width: 600px;height: 80px;border-radius: 50px;background-color: ${req.body.themcolor};text-align: right;" >
          <img src="/${req.body.pic}" AlIGN="left" style="display:inline;margin-left: 20px;" width="70px"> 
          <span  style="font-size: 40px;display:inline;margin-right: 20px;" >${req.body.linkadd}</span></button></div><br>
      
          `
  
        } else{
  
          
            pageform.find( {_id:pageid  }).populate('link').exec(function (err,page) {
              
       
                if (err) {
                  console.log(err);
                  res.json(err);

                  
                } else {
                 
                    for(i=0;i<req.body.linkadd.length;i++){
                   console.log(page[0].link[i].id)
                    var quary ={_id:page[0].link[i].id}
                    link.updateMany(quary,{

                        
                        linkname:req.body.linkadd[i],

                        link: req.body.link[i],
                    
                       
                    
                    }, (err) =>{
                     
                        console.log(err)

                    })

                
                }
                   
            
        } 
    });
        
      
    for(i=0;i<req.body.linkadd.length;i++){
          
        response += `   <div > <button type="button"  onclick="location.href='${req.body.link[i]}';" style="color:${req.body.fontcolor}; width: 600px;height: 80px;border-radius: 50px;background-color: ${req.body.themcolor};text-align: right;" >
         <img src="/${req.body.pic[i]}" AlIGN="left" style="display:inline;margin-left: 20px;" width="70px"> 
         <span  style="font-size: 40px;display:inline;margin-right: 20px;" >${req.body.linkadd[i]}</span></button></div><br>
     
         `
               } 
  
     
      }
      
           response +=`
         
         <div style="background-color:${req.body.themcolor}; width: 100%;height: 190px;margin-top: 250px;position: relative;bottom: 0px;">
            <br><br>
          <div style="text-align: center;"> 
     
              <h5 style="color:${req.body.fontcolor}">  الاشتراك بالقائمة البريدية</h5>
             <input type="text" id="mail" > <button  type="button"  onclick="get_click()" class="btn btn-danger">اشتراك</button>
             <input type="hidden" id="user" value="${req.user._id}">
          </div> 
    
      
      </div>
      </center>
      <script src="/axios/dist/axios.min.js"> </script>
      <script>
      function get_click()
      {
  
        const mail = document.getElementById("mail");
        const user = document.getElementById("user");
            axios.post('/pageForm/email/'+mail.value+'/'+user.value)
            .catch((err)=>{
  
              console.log(err)
                })
    
      }
      
      
      </script>
      </body>`
      
      

  
  
  
       let quary = {_id: pageid}
  
       pageform.findOne(quary , (err,findpage)=> {
       
       
       if(findpage) {
  
        
  
        pageform.updateOne(findpage ,{
            
            html_code:response,
            icons:icon,
            logoimg:upImg1,
            name:req.body.name,
            dis:req.body.dis,
            themcolor:req.body.themcolor,
            fontcolor:req.body.fontcolor,
            backcolor:req.body.backcolor
        
        }, (err) =>{
         
         if(!err){
       
          
          console.log(err)
         }else {
          
          console.log(err)
         }
       
       })
       }
       
       if(!findpage){
       
        console.log(err)
       
       }
       })
  
  
   
  
    
    return res.send(h+response)
  
  })
  
  

  router.post ('/update/:page_id',isAuthenticated,(req,res)=>{
  
    pageid =req.params.page_id;
    
    
    pageform.findOne({_id :req.params.page_id} , (err,findpage)=> {
  
       logoimg = findpage.logoimg ;
       dis=findpage.dis;
       name=findpage.name;
       themcolor=findpage.themcolor;
       fontcolor=findpage.fontcolor;
       backcolor=findpage.backcolor;

    })

    res.render('pageForm/update', {

    
        logoimg : logoimg ,
        dis:dis,
        name:name, 
        themcolor:themcolor,
        fontcolor:fontcolor,
        backcolor:backcolor
      
          })
  })  

  router.get('/update',isAuthenticated,(req,res)=> {
    
    res.render('pageForm/update', {
  
    
       
        logoimg : logoimg ,
        dis:dis,
        name:name, 
        themcolor:themcolor,
        fontcolor:fontcolor,
        backcolor:backcolor
      
      
          })
      
  })


  router.route('/links').get(function (req, res) {

    pageform.find( {_id:pageid  }).populate('link').exec(function (err,links) {
  
    
      if (err) {
        console.log(err);
        res.json(err);
      } else {
       
        res.json(links);
      }
  
      
    });
    
    
  
  });


module.exports= router