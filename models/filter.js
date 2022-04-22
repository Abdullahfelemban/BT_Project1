const mongoose = require('mongoose')



const filterSchema = new mongoose.Schema({

   

  name: {

        type: String
    },
    user:{

      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
      }

  
  
})




let filter = mongoose.model('filter',filterSchema, 'filter')

module.exports = filter