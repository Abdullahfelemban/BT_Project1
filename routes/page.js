const { Router } = require("express")
const express = require("express")
const router = express.Router()
const page = require('../models/page_forms')
const fs = require('fs')
const link = require('../models/link')
const customer = require('../models/customer')

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()&&req.user.kind==2) return next()
    res.redirect('/main_page/main')
    
}

 
  
 

router.get('/view',isAuthenticated,(req,res)=> {
    
   
      

  req.flash('info1',' ')
  res.render('pageForm/view', {

  
  message1: req.flash('info1'),
  
    })
      
})



router.get('/editor',isAuthenticated,(req,res)=> {
    
   
       

    
      
    page.find({user:req.user._id}, (err,findpage)=> {

     

      
      if((findpage.length>3)&&(req.user.grade==0)){

        
        req.flash('info1','تم الوصول الى اقصى عدد التصاميم المسموح بها لباقة حسابك ، لاضافة اكثر نرجو ترقية الحساب')
        res.render('pageForm/view', {

        
        message1: req.flash('info1'),
        
          })
      }else{


        res.render('pageForm/editor')


      }




      })
   


})




router.delete ('/delete/:page_id',isAuthenticated,(req,res)=>{
  
    var alert = require('alert');
    
  let quary = {_id: req.params.page_id}

 
  
  page.findOne(quary).populate('link').exec(function (err,findpage) {

  
    
  if(findpage) {

  

    for(i=0;i<findpage.link.length;i++){
        
        link.deleteOne({_id:findpage.link[i].id} , (err) =>{

if(err){
       console.log(err)
}
        })
        }
    

    page.deleteOne(findpage , (err) =>{
    
    if(!err){
  
     
      res.status(200).json('deleted')
    }else {
     
      res.status(404).json(' was not deleted')
    }
  
  })
  }

  if(!findpage){
  
    alert("wrong number")
  
  }
  })
  
  })

  router.delete('/delete1/:page_id', async (req, res) =>{


    

    let quary = {_id: req.params.page_id}
  
    page.findOne(quary).populate('link').exec(function (err,findpage) {

       

    if(findpage) {

        for(i=0;i<findpage.link.length;i++){
      if(findpage.link[i].img!= 'uploads/noimg.png') {
        fs.unlink(findpage.link[i].img, (err) => {
            if (err) {
              console.error(err)
              
            }
        })
      }
    }
      if(findpage.logoimg!= 'uploads/noimg.png') {
        fs.unlink(findpage.logoimg, (err) => {
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

    page.find( {user:req.user.id})
  
    .exec(function (err, pagesforms) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
       
        res.json(pagesforms);
      }
  
      
    });
  }
    
  
  });


  


  router.get("/view/:pageid", (req, res) => {
    let  quary  = {_id:req.params.pageid};
   
    page.findOne(quary , (err,findpage)=> {

      if(findpage){

        page.updateOne(quary ,{view: findpage.view+1} , (err)=>{

console.log(err)
        })



      }
           
       
   
   return res.send(findpage.html_code)
    
   
    }) 

    
});


router.post('/email/:email/:user', (req,res)=> {
        
console.log(req.params.email)
        
  let customer1 = new customer ({

     
      email: req.params.email,
     user:req.params.user
      

    })
  
    customer1.save((err)=>{
       
      if(!err){

         
      }

     else {
      
      console.log(err)
    


     

      
     }
    
    })
  
})
  




module.exports= router