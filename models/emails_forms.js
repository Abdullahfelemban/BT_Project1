const mongoose = require('mongoose')



const emailSchema = new mongoose.Schema({

   

  html_code: {

        type: String
    },

    icons:{

      type: String
    },

    logoimg:{

      type: String
    },
    adsimg:{

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
    buttonlink:{
      type: String

    },
    
    user:{

      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
      }
  
})




let email = mongoose.model('email',emailSchema, 'emails_forms')

module.exports = email