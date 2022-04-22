
function deletef(id){

    axios.delete('/customer/delete/'+id)
    .then((res)=>{

 
  window.location.href = '/customer/filter'
})

.catch((err)=>{


  console.log(err)
})
    
}





axios.get('/customer/filters')
.then((responseArr ) => {
  
  let filter = responseArr.data

  const container = document.getElementById('filter');
  
  
  var content=""; 
  



  filter.forEach((filter)=> {

   if(filter._id === '62501ecde4825a564ed12f20'){

    content+= ` <div > <p  style=" display: inline-block; width:260px ; text-align:right;">  ${filter.name}   <p>  </div> ` ;
    

   }else{
    
    
    content+= ` <div > <a onclick="deletef(this.id)" id="${filter._id}" > <i style=" display: inline-block;color:red;cursor: pointer; " id class="bi bi-trash3-fill"></i> </a><p  style=" display: inline-block; width:260px ; text-align:right;">  ${filter.name}   <p>  </div> ` ;
   }
    
  
  
  })
  
    container.innerHTML += content;
   

})

    
    axios.get('/customer/filters')
    .then((responseArr ) => {
      
      let filter = responseArr.data
    
      
      const container2 = document.getElementById('selectFilter');
      
     
      var content2="";
    



content2+= `<select name="Cfilter" > `
    filter.forEach((filter)=> {

   
    
        
        content2+= `  <option  value="${filter._id}"> ${filter.name} </option>  `;
      
      
      })
      
      content2+=  ` </select>  `
        container2.innerHTML += content2;

})


axios.get('/customer/filters')
    .then((responseArr ) => {
      
      let filter = responseArr.data
    
      
      const container3 = document.getElementById('emailto');
      
     
      var content3="";
    



content3+= `<select name="to"  multiple> `
    filter.forEach((filter)=> {

   
    if(filter._id!='62501ecde4825a564ed12f20'){
        
        content3+= ` <option  value="${filter._id}"> ${filter.name} </option>  `;
      
    }
      })
      
      content3+=  ` </select>  `
        container3.innerHTML += content3;

})





   
  


