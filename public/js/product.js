axios.get('/product/icons')
.then((responseArr ) => {
  
  let product = responseArr.data

  const container = document.getElementById('product');
  var content=""; 
  var id= 0;

 
  
if (responseArr.data.length == 0){

  content += '<h1 class="add" style="margin-bottom:100px;"> <a href="/product/add" > <i class="bi bi-plus-circle"></i>  </a></h1>'

}



product.forEach((product1)=> {

   
    
    id++;
     
  
  
    if(id == 1){
       
        //add start row 
        content+= '  <div class="row">'
       
      }
      // add content
      
     
      content += `<div class="card" >
     
  
        <div   id="collapse-${id}" class="collapse show" aria-labelledby="heading-${id}" data-parent="#accordion">
          <div class="card-body">
    
         
          <img src="${product1.img}" width="200px"> 
          

          <div style="text-align: right;position: absolute;bottom: 50px;margin-top: 50px ;" >
          <div style="background-color: white;" >اسم المنتج: ${product1.name}  </div>
          <div style="background-color: white;">رقم المنتج: ${product1.number}  </div>
          <div style="background-color: white;">سعر المنتج: ${product1.price}  </div>
        </div>

          </div>
<br><br>


        </div>
        
        <div class="card-header" style="position:absolute;bottom: 0px;margin-right: 40px ;" id="heading-${id}">
        
        <h5 class="mb-0"> 
        
          <button onclick="update_click(this.id)" id="${product1._id}" class="btn btn-primary btn-lg" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">   تعديل </button>
          <button  onclick="delete_click(this.id)" id="${product1._id}"  class="btn btn-danger btn-lg" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">  حذف </button>
          
        </h5>
        
      </div>
      
      </div>
     
      `


     if((id==responseArr.data.length)&&!(id!=1 && id%4 == 0)){

        
        content += '<h1 class="add" style="margin-bottom:100px;"> <a href="/product/add" > <i class="bi bi-plus-circle"></i>  </a></h1>'

     }


      if(id!=1 && id%4 == 0){
       
        
        // add end of row ,and start new row on every 5 elements
        content += '</div><div class="row">'
        if(id==responseArr.data.length){

        
          content += '<h1 class="add" style="margin-bottom:100px;"> <a href="/product/add" > <i class="bi bi-plus-circle"></i>  </a></h1>'
  
       }
      }
     
    });

 
    // after looping dont forget to close the last row 
    
    content += '</div>'
 
  
    container.innerHTML += content;

   
   
  });
