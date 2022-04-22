const db = require('../config/database')
const User = require('../models/user')

 


    let manger = new User()
    manger.username = "manger",
    manger.kind = 1 ,
    manger.point=0,
    manger.fullname = "Manger",
    manger.password = manger.hashPassword(12345),
    
    
    manger.save( (err)=> {
            if (err) {
                console.log(err)
            }
        })
    