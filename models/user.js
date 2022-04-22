const mongoose = require('mongoose')
const bcrypt = require ('bcrypt-nodejs')


const userschema = new mongoose.Schema({

   username: {
        type: String,
        required: true,
        unique : true
    },
    fullname: {
        type: String
        
    },
    password: {
        type: String,
        required: true
    },
 
    kind : {

        type : Number,
        required: true
    },

    grade:{

        type : Number ,
        default : 0
    }
   
  

})

userschema.methods.hashPassword = (password)=>{

    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

userschema.methods.comparePasswords= (password,hash)=>{

    return bcrypt.compareSync(password,hash)
}






let user = mongoose.model('user',userschema, 'users')


module.exports = user