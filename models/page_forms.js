const mongoose = require('mongoose')



const pageSchema = new mongoose.Schema({

   

  html_code: {

        type: String
    },

    icons:{

      type: String
    },logoimg:{

        type: String
      },

    dis:{

      type: String
    },
    name:{

        type: String
      },
      view:{

        type: Number

      }
      
      ,themcolor:{

        type: String
      },fontcolor:{

        type: String
      },backcolor:{

        type: String
      },
      
      link: 
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "link"
      }],
      user:{

        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
        }
    
})




let page = mongoose.model('page',pageSchema, 'pages_forms')

module.exports = page