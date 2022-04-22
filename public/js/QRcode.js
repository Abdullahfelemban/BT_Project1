
function publish2(id){
 

    

  
  
  window.location.href="/QRcode/publish/"+id

 

  
}









axios.get('/QRcode/icons')
.then((responseArr ) => {
  
  let QRcode = responseArr.data

  const container = document.getElementById('QRcode');
  var content=""; 
  var id= 0;

 
  
if (responseArr.data.length == 0){

  content += '<h1 class="add" style="margin-bottom:100px;"> <a href="/QRcode/editor" > <i class="bi bi-plus-circle"></i>  </a></h1>'

}



QRcode.forEach((QRcode1)=> {

   
    
    id++;
     
  
  
    if(id == 1){
       
        //add start row 
        content+= '  <div class="row">'
       
      }
      // add content
      
     
      content += `<div class="card" >
     
  
        <div   id="collapse-${id}" class="collapse show" aria-labelledby="heading-${id}" data-parent="#accordion">
          <div class="card-body">
    
          ${QRcode1.icons}
            
          </div>
<br><br>

<h3 style="position: absolute;bottom: 35px;right: 20px;" >  <i class="bi bi-eye"></i> ${QRcode1.view}  </h3>
        </div>
  
        <div class="card-header" style="position:absolute;bottom: 0px;" id="heading-${id}">
        <h5 class="mb-0"> 
          <button onclick="update_click(this.id)" id="${QRcode1._id}" class="btn btn-primary btn-lg" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">   تعديل </button>
          <button  onclick="delete_click(this.id)" id="${QRcode1._id}"  class="btn btn-danger btn-lg" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">  حذف </button>
          <button onclick="publish2(this.id)" id="${QRcode1._id}" class="btn btn-success btn-lg" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}"> نشر  </button>
        </h5>
       
      </div>
      
      </div>
     
      `


     if((id==responseArr.data.length)&&!(id!=1 && id%4 == 0)){

        
        content += '<h1 class="add" style="margin-bottom:100px;"> <a href="/QRcode/editor" > <i class="bi bi-plus-circle"></i>  </a></h1>'

     }


      if(id!=1 && id%4 == 0){
       
        
        // add end of row ,and start new row on every 5 elements
        content += '</div><div class="row">'
        if(id==responseArr.data.length){

        
          content += '<h1 class="add" style="margin-bottom:100px;"> <a href="/QRcode/editor" > <i class="bi bi-plus-circle"></i>  </a></h1>'
  
       }
      }
     
    });

 
    // after looping dont forget to close the last row 
    
    content += '</div>'
 
  
    container.innerHTML += content;

   
   
  });