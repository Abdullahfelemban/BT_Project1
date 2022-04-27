const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')


 passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  
 
passport.use('local.signup', new localStrategy({


    username : 'username',
    fullname : 'fullname',
    password : 'password',
    
    passReqToCallback : true

} , (req,username,password,done)=>{

   

    if (req.body.password != req.body.password2) {

        return done (null, false , req.flash ('error','كلمة السر لا تتطابق '))

    }else {
        User.findOne({username: username}, (err,user)=> {
            if(err) {
                return done(err)
            }
            if(user) {
                return done(null, false, req.flash('error', 'اسم المستخدم موجود مسبقا'))
            }
             
            if (!user) {
                //create user
                let newUser = new User()
                newUser.username = req.body.username,
                newUser.kind = 2 ,

                newUser.fullname = req.body.fullname,
                newUser.password = newUser.hashPassword(req.body.password),
                newUser.save ((err,user)=> {
                    if(!err) {
                        return done(null, user,req.flash('success', 'تم تسجيلك بنجاح , تستطيع الان تسجيل الدخول'))
                    } else { alert(err)  }
                })
            }
        })
    }




}))





passport.use( 'local.login_user' , new localStrategy({
    username : 'username',
    fullname : 'fullname',
    password : 'password',
    passReqToCallback : true
}, (req,username,password, done)=> { 

    User.findOne({username: username ,   kind: 2  }, (err,user)=> {

        
       
        if (err) {
            return done(null, false, req.flash('error', 'حدث خطا ما'))
        } 
        if(!user) {
            
            
            return done(null, false, req.flash('error', 'اسم المستخدم غير موجود'))

          
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null,user)

            } else {
                return done(null,false, req.flash('error', ' كلمة السر خاطئة'))

            }
        }
    })
}))



passport.use( 'local.login_manger' , new localStrategy({
    username : 'username',
    fullname : 'fullname',
    password : 'password',
    passReqToCallback : true
}, (req,username,password, done)=> { 
   
    User.findOne({username: username , kind: 1  }, (err,user)=> {

       
        if (err) {
            return done(null, false, req.flash('error', '  حدث خطا ما'))
        } 
        if(!user) {
            
            
            return done(null, false, req.flash('error', '   المستخدم غير موجود'))

          
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null,user)

            } else {
                return done(null,false, req.flash('error', '   كلمة السر خطا'))

            }
        }
    })
}))


passport.use( 'update_userPass' , new localStrategy({
    username : 'username',
    fullname : 'fullname',
    password : 'password',
    passReqToCallback : true
}, (req,username,password, done)=> { 

  let quary = {username:username  }

    User.findOne(quary , (err,user)=> {

        
       
        if (err) {
            return done(null, false, req.flash('error', 'حدث خطا ما'))

        } 
        if(!user) {
            
            req.logOut()
            return done(null, false, req.flash('error', 'اسم المستخدم غير موجود'))
            
          
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

              User.updateOne(quary,{fullname : req.body.fullname ,password: user.hashPassword(req.body.password2)} ,(err,user) =>{

                req.logOut()
                return done(null,null,req.flash('success', ' تم تحديث كلمة السر بنجاح, تستطيع تسجيل الدخول الان'))
              })
            } else {
                req.logOut()
                return done(null,false, req.flash('error', ' كلمة السر خاطئة'))
                
            }
        }
    })
}))
