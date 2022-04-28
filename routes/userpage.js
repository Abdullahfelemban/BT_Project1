
const { Router } = require("express")
const express = require("express")
const router = express.Router()
const page = require('../models/page_forms')








router.get("/:name", (req, res) => {
    let  quary  = {name:req.params.name};
   
    page.findOne(quary , (err,findpage)=> {

      if(findpage){

        page.updateOne(quary ,{view: findpage.view+1} , (err)=>{

      console.log(err)
        })



      }
           
       
   
   return res.send(findpage.html_code)
    
   
    }) 

    
});


















module.exports= router