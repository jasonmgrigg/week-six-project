const express = require('express');
const router = express.Router();
const models = require("./models");
const session = require('express-session');
const parseurl = require('parseurl');



//Start of first index page rendering
// router.get('/', function(req, res) {
//   models.users.findAll().then(function(users) {
//   res.render('index', {users: users})
//   })
// })
//End of first index page rendering




//Start of username and password creation section
router.get('/login-create', function(req, res) {
  models.users.findAll().then(function(users) {
    res.render('login-create', {users: users})
  })
})



router.post('/users', function(req, res) {
  var user = models.users.build ({
    username: req.body.username,
    password: req.body.password
  })
  req.session.username = req.body.username;
  let username = req.session.username
  console.log("Your Session Username is " + username);
  user.save();
  res.render('welcome', {username:username})
  // res.redirect('/')
})
//End of username and password creation



//Start of username authentication section
router.get('/', function(req, res) {
  res.render('login')
});

router.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  models.users.find({
    where: {
      username: username,
      password: password
    }
  }).then(function(user){
    if(user){
      req.session.username = req.body.username;
      req.session.userid = user.dataValues.id;
      let username = req.session.username;
      let userid = req.session.userid;
      console.log("ID is " + req.session.userid)
      console.log("username is " + username)
      res.render('gabble-create', {username:username})
    }
    else{
      res.render('login-create');
    }
  })
  // console.log("Your username is " + username);
})
//End of username authentication



//Start of gabble entry section
router.get('/gabble-create', function(req, res) {
  models.users.findAll().then(function(entry) {
    res.render('gabble-create', {entry: entry})
    console.log("Gabble Entry")
  })
})



  router.post('/entries', function(req, res){
    const entryUser = req.session.username
    const userid = req.session.userid
    console.log("Entries userID is " + userid)
    const username = req.session.username
    const entry = models.entries.build({
      entry: req.body.entry,
      userId: req.session.userid
    })

    // const entry = req.body.entry;
    // console.log(req.session.username);
    // models.entries.find({
    //   where: {
    //     entry: entry

    entry.save();
    res.render('gabble-create', {username:username})

  })
//Gabble-Create end

module.exports = router;
