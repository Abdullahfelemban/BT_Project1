const mongoose = require('mongoose')



const bill = new mongoose.Schema({

   

  html_code: {

        type: String
    },

    icons:{

      type: String
    },

    logoimg:{

      type: String
    }, namec :{
        type: String
      },
      address:{
  
        type: String
  
      },
      contact:{
  
        type: String
      },
      themcolor:{
        type: String
      },
      fontcolor:{
        type: String
  
      },
      logolink:{
        type: String
      },

    product: 
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    }],
user:{

type: mongoose.Schema.Types.ObjectId,
ref: "user"
}
  
})




let bill1 = mongoose.model('bill',bill, 'bill')

module.exports = bill1