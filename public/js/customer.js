
function deletec(id){

    axios.delete('/customer/delete2/'+id)
    .then((res)=>{

 
  window.location.href = '/customer/view'
})

.catch((err)=>{


  console.log(err)
})
    
}

function updatec(id){

  axios.post('/customer/updatec/'+id)
  .then((res)=>{


window.location.href = '/customer/update'
})

.catch((err)=>{


console.log(err)
})
  
}



axios.get('/customer/show')
.then((responseArr ) => {
  
  let customer = responseArr.data

  
  const container = document.getElementById('customer');
 
  var content= ` <table class="table" id="table1" >  <thead > 
     <tr> 
        <th>الاسم</th> 
        <th>التصنيف</th> 
        <th>البريد الالكتروني</th> 
     </tr>  </thead> `; 
  
  


  customer.forEach((customer)=> {

   
    
   
    content+= ` <tr> <th> ${customer.name}</th> <th >${customer.filter.name} </th> <th> ${customer.email} </th>  <th> <a onclick="updatec(this.id)" id="${customer._id}" > <i style=" display: inline-block;color:blue;cursor: pointer; " id class="bi bi-pencil"></i> </a> </th>
    
    <th> <a onclick="deletec(this.id)" id="${customer._id}" > <i style=" display: inline-block;color:red;cursor: pointer; " id class="bi bi-trash3-fill"></i> </a> </th> </tr> ` ;
    
    
  
  
  })
  content+="</table>";

    container.innerHTML += content;
   

})
