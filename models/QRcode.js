const mongoose = require('mongoose')



const QRcode = new mongoose.Schema({

   

  html_code: {

        type: String
    },

    icons:{

      type: String
    },

    logoimg:{

      type: String
    },
    link:{

      type: String
    },view:{

        type:Number
    },user:{

      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
      }
  
})




let QR = mongoose.model('QRcode',QRcode, 'QRcode')

module.exports = QR