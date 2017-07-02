const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const data = require('./userData.js');
const app = express();
// const sessionConfig = require('./sessionCounter')
const routes = require("./routes");



app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(express.static('./public'));
app.use(session({
secret: 'keyboard cat',
resave: false,
saveUninitialized: true
}));

app.use(function (req, res, next) {
var views = req.session.views;

if (!views) {
  views = req.session.views = {};
}

// get the url pathname
var pathname = parseurl(req).pathname;

// count the views
views[pathname] = (views[pathname] || 0) + 1

next();
})


app.listen(3000, function(){
  console.log('Started express application!')
});
