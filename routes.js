const express = require('express');
const router = express.Router();
const models = require("./models");

//Start of first index page rendering
router.get('/', function(req, res) {
  models.users.findAll().then(function(users) {
  res.render('index', {users: users})
  })
})
//End of first index page rendering




//Start of username and password creation section
router.get('/login-create', function(req, res) {
  models.users.findAll().then(function(users) {
    res.render('login-create', {users: users})
  })
})



router.post('/users', function(req, res) {
  const username = models.users.build
  const password = models.users.build ({
    username: req.body.username,
    password: req.body.password
  })

  password.save();
  res.redirect('/')
})
//End of username and password creation



//Start of username authentication section
//DOES NOT WORK YET
function authenticate(req, username, password){
  var authenticatedUser = models.users.find(function (users) {
    if (username === models.users.username && password === models.users.password) {
      req.session.authenticated = true;
    } else {
      return false
    }
  });
  console.log(req.session);
  return req.session;
}

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/', function(req, res){
var username = req.body.username;
var password = req.body.password;
console.log("Authenticate router.post working")

authenticate(req, username, password);
if (req.session && req.session.authenticated){
  res.render('loggedin', {users: users});
} else {
  res.redirect('/');
}
})
//End of username authentication
//DOES NOT WORK YET



//Start of gabble entry section
router.get('/gabble-create', function(req, res) {
  models.users.findAll().then(function(entries) {
    res.render('gabble-create', {entries: entries})
  })
})



router.post('/entries', function(req, res) {
  const entry = models.entries.build ({
    entry: req.body.entry
  })

  entry.save();
  res.redirect('/')
})

module.exports = router;
