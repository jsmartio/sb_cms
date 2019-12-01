const express   = require('express')
const session   = require('express-session')
const users     = express.Router()
const cors      = require('cors')
const jwt       = require('jsonwebtoken')
const bcrypt    = require('bcrypt')
const uuid      = require('uuid')
const server    = require('../components/ServerFunctions')
const pj        = require('../components/config.json')
const User      = require('../models/User')
const Session   = require('../models/Session')
const Donor     = require('../models/Donor')
const Playlist  = require('../models/Playlist')

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  var today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// Verify if use is logged in AKA has an active session
users.post('/islogged', (req, res) => {
  if(req.session.uuid === undefined || req.session.uuid === ''){
    console.log('routes/Users > islogged sesion  *NOT* found')
    res.send('no')
  } else {
    console.log('routes/Users > islogged sesion found')
    res.send('yes')
  }
})

// Logout call by Navbar > User functions
users.post('/logout', (req, res) => {
    Session.destroy({   // remove any old sessions from this user 
      where: {
        session_key: req.session.uuid
      }
    })
    .then( () => {
      req.session.destroy(); // clear session info
      res.json({ status: 'logged out'})
    })
    .catch(err => {
      console.log('+++ logout session Error: ' + err)
      res.json({ status: 'logged out'})
    })
})

users.post('/login', (req, res) => {

  // establish that refering url is allowed\
  let refer = server.stripDown(req.headers.referer)
  if(refer.includes(pj.global.domain)) {

    let sess = req.session;
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      
      if (user) { // user exists in database now try to match password

        if (bcrypt.compareSync(req.body.password, user.password)) {
            // successful login
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 })

            sess.email = req.body.email
            sess.id = user.id
            sess.uuid = uuid()
            var today = new Date()
            const sessionData = {
              user_id: user.id,
              session_key: sess.uuid,
              created: today
            }
            Session.destroy({   // remove any old sessions from this user 
              where: {
                 user_id: user.id
              }
            }).then( () => {
              Session.create(sessionData)
              .then(user => {
                res.json({ 
                    status: 'session active',
                    token
                  })
                console.log('session posted to db')
              })
              .catch(err => {
                //res.send('+++ activating session error: ' + err)
                console.log('+++ activating session error: ' + err)
              })
            })
            .catch( err => {
              console.log('remove previous user sessions not err = ' + err);
            })

        } else {
          res.status(400).json({ authFail: "email/password combination not found" })
        }

      } else {  // failed to find user/password combo
        res.status(400).json({ error: 'User does not exist' })
      }

    })
    .catch(err => {
      res.status(400).json({ error: err })
      console.log('error: ' + err +' in filename' + __filename)
    })

  } else { // bad refering url
      res.status(400).json({ badref: "Bad referer" })
      console.log('Illegal refering domain =>' + refer + " should be => " + pj.global.domain)
  }

})

users.get('/adminpanel', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  // insert the new value here
  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/getusers', (req, res) => {

  // establish that refering url is allowed\
  let refer = server.stripDown(req.headers.referer)
  if( refer.includes(pj.global.domain)  && req.session.uuid !== undefined) {
    User.findAll({
      where: {
        isDeleted: 0
      }
    })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log("Client Error @ UserFunctions > get_users" + err)
    })
  } else {
    console.log('+++ not permitted to get users')
  }
})

users.post('/getdonors', (req, res) => {

  // establish that refering url is allowed\
  let refer = server.stripDown(req.headers.referer)
  if( refer.includes(pj.global.domain)  && req.session.uuid !== undefined) {
    Donor.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log("Client Error @ UserFunctions > getdonors " + err)
    })
  } else {
    console.log('+++ not permitted to get donors')
  }
})


users.post('/getplaylist', (req, res) => {

  // establish that refering url is allowed\
  let refer = server.stripDown(req.headers.referer)
  if( refer.includes(pj.global.domain)  && req.session.uuid !== undefined) {
    Playlist.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log("Client Error @ UserFunctions > getdonors " + err)
    })
  } else {
    console.log('+++ not permitted to get donors')
  }
})

module.exports = users
