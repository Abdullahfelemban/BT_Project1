const mongoose = require('mongoose')



const feedback = new mongoose.Schema({

   

  rate: {

        type: String
    },

    comment:{

      type: String
    },

        user:{

          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
          }
  
})




let feedback2 = mongoose.model('feedback',feedback, 'feedback')

module.exports = feedback2