const express = require("express")
const app = express()
const db = require('./config/database')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportsetup = require('./config/passport_setup')

const http = require('http');
const https = require('https');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use('/uploads', express.static('uploads'));
app.use('/linkuploads', express.static('linkuploads'));
app.use('/QRuploads', express.static('QRuploads'));
app.use('/productuploads', express.static('productuploads'));
app.use('/billup', express.static('billup'));
app.use(session({
  secret: 'smart session',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000 * 30}
}))


app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.get('*',(req,res,next)=>{

  res.locals.user = req.user || null 
  next()


})

app.set('view engine', 'ejs')




app.get('/', (req,res)=> {

    res.redirect('/main_page/user')
     
 })

 const main = require('./routes/main_page')

 app.use('/main_page', main)

 const email = require('./routes/email')

 app.use('/emailForm', email)

 const page = require('./routes/page')

 app.use('/pageForm', page)

 const QRcode = require('./routes/QRcode')

 app.use('/QRcode', QRcode)

 const email2 = require('./routes/uploads')

 app.use('/emailForm', email2)


 const upload = require('./routes/uploads')

 app.use('/', upload)
 

 const linkupload = require('./routes/linkuploads')

 app.use('/pageForm', linkupload)

 const update = require('./routes/uploads')

 app.use('/uploads', update)

 const update1 = require('./routes/linkuploads')

 app.use('/linkuploads', update1)

 const user = require('./routes/user')

 app.use('/user', user)

 const customer = require('./routes/customer')

 app.use('/customer', customer)

 
 const qr = require('./routes/QRuploads')

 app.use('/QRcode', qr)

 const pro = require('./routes/product')

 app.use('/product', pro)

 const proup = require('./routes/product_up')

 app.use('/product', proup)


 const proup1 = require('./routes/product_up')

 app.use('/product_up', proup1)
  

 const bill = require('./routes/bill')

 app.use('/bill', bill)

 const bill2 = require('./routes/billup')

 app.use('/billup', bill2)

 const bill3 = require('./routes/billup')

 app.use('/bill', bill3)
https.createServer({
  key: fs.readFileSync("/etc/letsencrypt/live/businesstools.online/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/businesstools.online/fullchain.pem")
}, app).listen(443);
 
 app.listen(80, ()=> {

    console.log(' app is wokring on port 1600')
})
