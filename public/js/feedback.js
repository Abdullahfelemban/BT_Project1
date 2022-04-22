axios.get('/main_page/feedback')
.then((responseArr ) => {
  
  let feedback = responseArr.data
 var sum =0;
  
  const container = document.getElementById('feedback');
 
  var content= ` <table class="table" style="width: 500px; text-align: right;">  <thead > 
     <tr> 
        <th style="width: 50px;">التقييم</th> 
        <th>الملاحظة</th> 
     </tr>  </thead> `; 
  
  


     feedback.forEach((feedback2)=> {

   
       
   
    content+= ` <tr> <th> ${feedback2.rate}</th> <th >${feedback2.comment} </th>  </tr> ` ;
    
    
  sum = sum + parseInt(feedback2.rate); 
  
  })
  content+="</table>";

 
  content+=`<h4 style="text-align: right;">متوسط التقيم: ${sum/feedback.length}</h4>`;
    container.innerHTML += content;
   

})