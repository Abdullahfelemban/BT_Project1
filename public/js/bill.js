function publish3(id){
 


    window.localStorage.setItem('idbill',id);
    window.location.href="/bill/publish"
   
  
    
  
    
  }
  
  
  
  axios.get('/bill/icons')
  
  .then((responseArr ) => {
    
    let bill = responseArr.data
  
    const container = document.getElementById('bill');
    var content=""; 
    var id= 0;
  
 
    
  if (responseArr.data.length == 0){
  
    content += '<h1 class="add" style="margin-bottom:200px;"> <a href="/bill/editor" > <i class="bi bi-plus-circle"></i>  </a></h1>'
  
  }
  
  
  
  bill.forEach((bill)=> {
  
     
      
      id++;
       
    
    
      if(id == 1){
         
          //add start row 
          content+= '<div class="row">'
         
        }
        // add content
        
       
        content += `<div class="card" >
       
    
          <div id="collapse-${id}" class="collapse show" aria-labelledby="heading-${id}" data-parent="#accordion">
            <div class="card-body">
      
            ${bill.icons}
  
            
              
            </div>
          </div>
    
          <div class="card-header" id="heading-${id}">
          <h5 class="mb-0"> 
            <button onclick="update_click(this.id)" id="${bill._id}" class="btn btn-primary btn-lg" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">   تعديل </button>
            <button  onclick="delete_click(this.id)" id="${bill._id}"  class="btn btn-danger btn-lg" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">  حذف </button>
            <button onclick="publish3(this.id)" id="${bill._id}" class="btn btn-success btn-lg" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}"> نشر  </button>
          </h5>
        </div>
        </div>`
  
  
       if((id==responseArr.data.length)&&!(id!=1 && id%4 == 0)){
  
          
          content += '<h1 class="add" style="margin-bottom:200px;"> <a href="/bill/editor" > <i class="bi bi-plus-circle"></i>  </a></h1>'
  
       }
  
  
        if(id!=1 && id%4 == 0){
         
          
          // add end of row ,and start new row on every 5 elements
          content += '</div><div class="row">'
          if(id==responseArr.data.length){
  
          
            content += '<h1 class="add" style="margin-bottom:200px;"> <a href="/bill/editor" > <i class="bi bi-plus-circle"></i>  </a></h1>'
    
         }
        }
       
      });
  
   
      // after looping dont forget to close the last row 
      
      content += '</div>'
   
    
      container.innerHTML += content;
  
     
     
    });
  
  
    
    
  
      