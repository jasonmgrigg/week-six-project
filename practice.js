function authenticate(req, username, password){
var authenticatedUser = models.user.find(function (user) {
  if (username === models.user.username && password === models.user.password) {
    req.session.authenticated = true;
    console.log('User & Password Authenticated');
  } else {
    return false
  }
});
console.log(req.session);
return req.session;
}

app.get('/foo', function (req, res, next) {
res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.get('/', function(req, res){
res.redirect('/login');
})

app.get('/login', function (req, res){
res.render('login');
});

app.post('/', function(req, res){
var username = req.body.username;
var password = req.body.password;
authenticate(req, username, password);
if (req.session && req.session.authenticated){
  res.render('index', { users: users });
} else {
  res.redirect('/');
}
})

// app.get('/', function(req, res){
//   models.User.findAll().then(function(users){
//     res.render('index',{users: users})
//   })
//
// })
