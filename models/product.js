const mongoose = require('mongoose')



const product = new mongoose.Schema({

   

  img: {

        type: String
    },

    number:{

      type: String,
      unique:true
    },

    name:{

      type: String
    },
    price:{

      type: Number
    },user:{

      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
      }
  
})




let product1 = mongoose.model('product',product, 'product')

module.exports = product1