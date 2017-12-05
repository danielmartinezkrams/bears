// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express')      // call express
var bodyParser = require('body-parser')
var app        = express()                 // define our app using express
const MongoClient = require('mongodb').MongoClient

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    db.collection('bears').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    console.log(result)
    res.render('index.ejs', {bears: result})
  })
});

// more routes for our API will happen here
app.post('/bears', (req, res) => {
  db.collection('bears').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/api')
  })
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var db
MongoClient.connect('mongodb://malbinson:berkeley@ds119436.mlab.com:19436/tester', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
