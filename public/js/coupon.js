

axios.get('/main_page/coupon2')
.then((responseArr ) => {
  
  let coupon = responseArr.data
 
  const container = document.getElementById('coupon');
 
  var content= ` <table class="table" style="width: 700px; text-align: right;">  <thead > 
     <tr> 
        <th >الكوبون</th> 
        <th ">الحالة</th>
        <th >تاريخ الانشاء</th>
        <th>تاريخ الاستخدام</th> 
        <th>تاريخ الانتهاء</th> 
     </tr>  </thead> `; 
  
  
var use,start,end ;

     coupon.forEach((coupon2)=> {

   if(coupon2.used==0){

    use ='غير مستخدم'
    start=''
    end=''
   }else{

    use ='مستخدم'
    start=coupon2.startdate.slice(0, 10);
    end=coupon2.enddate.slice(0, 10);
   }
       
   
    content+= ` <tr>
    
    
    <th> ${coupon2._id}</th> 
    <th >${use} </th>
    <th >${coupon2.createdate.slice(0, 10)} </th>
    <th >${start} </th>
    <th >${end} </th>
    
    
    
    
    </tr> ` ;
    
    
  
  
  })
  content+="</table>";

 
  
    container.innerHTML += content;
   

})