const mongoose = require('mongoose')



const customerSchema = new mongoose.Schema({

   

  name: {

    default:'من الصفحة التعريفية',
        type: String
    },

    email:{

      type: String
    },

    filter: 
        {
          default:'62501ecde4825a564ed12f20',
          type: mongoose.Schema.Types.ObjectId,
          ref: "filter"
        },
        user:{

          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
          }
  
})




let customer = mongoose.model('customer',customerSchema, 'customer')

module.exports = customer