
const mongoose = require('mongoose')



const coupon = new mongoose.Schema({

   

  createdate: {

  
        type: Date
    },

    startdate:{

      type: Date
    },
    used:{

      type:Number
},
    enddate: {
         
          type: Date
        },

        end:{

     type:Number
     
        },
        user:{

          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
          }
  
})




let coupon2 = mongoose.model('coupon',coupon, 'coupon')

module.exports = coupon2
