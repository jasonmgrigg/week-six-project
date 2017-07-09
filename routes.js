const express = require('express');
const router = express.Router();
const models = require("./models");
const session = require('express-session');
const parseurl = require('parseurl');


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
  user.save()
  .then(function(user){
    if(user){
      req.session.username = req.body.username;
      req.session.userid = user.dataValues.id;
      let username = req.session.username;
      let userId = req.session.userid;
      res.redirect('/gabble-create')
      console.log("Your userId is " + userId);
    }
  })
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
      let userId = req.session.userid;
      res.redirect('/gabble-create')
      console.log("Your userId is " + userId);
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
    entry.save();
    console.log("Your entry is " + entry);
    res.redirect('/gabble-create')
  })
//Gabble-Create end

//Likes section
router.get('/likedisplay', function(req, res) {
  const username = req.session.username
  const userId = req.session.userid
  const entryId = req.body.likeButton
  const entry = req.body.entry
  models.likes.findAll().then(function(likes, entries) {
    res.render('likedisplay', {likes: likes, username: username, userId: userId, entryId: entryId, entry: entry})
    console.log("your entry is " + entry)
  })
})

router.post('/likes', function (req,res) {
  console.log("Your Like Session is " + req.body.likeButton)
  const username = req.session.username
   const userId = req.session.userid
   const entryId = req.body.likeButton
   const likes = models.likes.build({
         like: true,
         entryId: req.body.likeButton,
         userId: req.session.userid
   });
//Likes is posting to the database!!!!  Whoo hoo


   likes.save().then(function (newLike) {
   });
   res.redirect('/likedisplay')
});
//End of Likes section

module.exports = router;
