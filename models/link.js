const mongoose = require('mongoose')



const linkSchema = new mongoose.Schema({

   

  linkname: {

        type: String
    },

    link:{

      type: String
    },

    click:{

      type: String
    },
    img:{

        type: String
      },



    
})




let link = mongoose.model('link',linkSchema, 'link')

module.exports = link