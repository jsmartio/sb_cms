const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser')
const session       = require('express-session')
const app           = express()
const port          = process.env.PORT || 5000
const pj            = require('./components/config.json')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


app.use(session({
  secret: pj.global.cookie_secret,
  proxy: true,
  httpOnly:false,
  resave: pj.global.cookie_resave,
  saveUninitialized: pj.global.cookie_saveUninitialized,
  cookie: {
    secure: false,
    httpOnly: false,
    domain: pj.global.domain,
    path: '/'
  }
}))

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')

app.use('/server', Users)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})