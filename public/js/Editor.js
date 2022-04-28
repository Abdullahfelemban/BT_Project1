var i=1;
var y=0;
function add(){   

  
    i++
  if(i<4){
        var node = document.createElement('div');        
        node.innerHTML = '<span class="input-group mb-3" > <span class="input-group-text">الرابط ' + i + '</span> <input type="text" placeholder="https://example.com" class="form-control" name="s'+i+'"    ><span> <select class="form-select" name="sm'+i+'" aria-label="Default select example">' + `  <option selected>اختر نوع الرابط</option>
        <option value="1">انستقرام</option>
        <option value="2">تويتر</option>
        <option value="3">فيس بوك</option>
      </select>
    </span>
</span> `;  


  }

       if(i==3){
       document.getElementById('add2').style.display = 'none' ;
       }
        document.getElementById('container2').appendChild(node);    

        
    }
  


    function addlink(){   

      y++
     
      
            var node = document.createElement('div');        
            node.innerHTML = ` <div style="margin-bottom: 20px ; padding-top: 20px; border:1px solid black; width:80%;" >
            
        <span class="input-group mb-3" >
        
        <span class="input-group-text">عنوان الرابط</span>
            <input  type="text" class="form-control" name="linkadd"  >
            </span>
        <span class="input-group mb-3" >
            <span class="input-group-text">الرابط</span>
            <input placeholder="https://example.com" type="text" class="form-control" name="link"  >

            </span>

            <span class="input-group mb-1" >
            <label style=" cursor:pointer;">
                <i title="اضافة ايقونة" class="bi bi-image" style="font-size:30px ;" ></i>  <input width="100px" type="file" name="img" style="display:none"></label>
    </span>
           
           
            </div>
            `;   
      
            
          
            document.getElementById('container').appendChild(node);    
        }







        axios.get('/linkuploads/links')

        .then((responseArr ) => {
          
          let page = responseArr.data;
        
          const container = document.getElementById('container3');
          
          var  content ;
         
          console.log(page[0].link)
         
          content = ` `  ;


 

for(i=0;i<page[0].link.length;i++){
            
            content += ` <div style="margin-bottom: 20px ; padding-top: 20px; border:1px solid black; width:80%;" >
        
    <span class="input-group mb-3" >
    
    <span class="input-group-text">عنوان الرابط</span>
        <input value="`+page[0].link[i].linkname+`"  type="text" class="form-control" name="linkadd"  >
        </span>
    <span class="input-group mb-3" >
        <span class="input-group-text">الرابط</span>
        <input value="`+page[0].link[i].link+`" placeholder="https://example.com" type="text" class="form-control" name="link"  >



        </span>

        <input type="hidden" value="`+page[0].link[i].img+`" name="pic">
       
       
       
        </div>
        `  ;

}
      
          container.innerHTML = content;




      })
