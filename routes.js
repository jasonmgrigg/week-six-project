const express = require('express');
const router = express.Router();
const models = require("./models");





router.get('/', function(req, res) {
  models.users.findAll().then(function(users) {
    res.render('index', {users: users})
  })
})

router.post('/users', function(req, res) {
  const username = models.users.build
  const password = models.users.build ({
    username: req.body.username,
    password: req.body.password
  })

  // username.save();
  password.save();
  res.redirect('/')

})


module.exports = router;
