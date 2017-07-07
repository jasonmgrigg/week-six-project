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
  res.render('gabble-create', {username:username})
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
      res.redirect('/gabble-create')
      console.log("First Log-In");
    }
    else{
      res.render('login-create');
    }
  })
})
//End of username authentication



//Start of gabble entry section
router.get('/gabble-create', function(req, res) {
  const username = req.session.username
  models.entries.findAll().then(function(entry, date) {
    res.render('gabble-create', {username: username, entry: entry, date: date})
    console.log("Gabble Entry")
  })
})

  router.post('/entries', function(req, res){
    const userid = req.session.userid
    const date = req.body.date
    const username = req.session.username
    const title = req.body.title
    const entry = models.entries.build({
      entry: req.body.entry,
      userId: req.session.userid,
      date: req.body.date,
      title: req.body.title
    })
    console.log("Gabble Sent");
    entry.save();
    res.redirect('/gabble-create')
  })
//Gabble-Create end

//Likes section
router.get('/likedisplay', function(req, res) {
  console.log("router.get for likes is working")
  const username = req.session.username
  const userId = req.session.userid
  const entryId = req.body.likeButton
  models.likes.findAll().then(function(likes) {
    res.render('likedisplay', {username: username, userId: userId, entryId: entryId})
  })
})

router.post('/likes', function (req,res) {
  console.log("Your Like Session is " + req.body.likeButton)
  const username = req.session.username
   const userId = req.session.userid
   const entryId = req.body.likeButton
   const likes = models.likes.build({
         entryId: req.body.likeButton,
         userId: req.session.userid
   });
//Likes is posting to the database!!!!  Whoo hoo


   likes.save().then(function (newLike) {
   });
   res.redirect('/likedisplay')
});
//End of Likes section

//Likes Display


//End of Likes Display
module.exports = router;
