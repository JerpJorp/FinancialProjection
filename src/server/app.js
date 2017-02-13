var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://JerpJorpMaster:j0rpj0rp@ds145299.mlab.com:45299/financial-projection');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

var BudgetModel = require('./budget.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // APIs
  // select all
  app.get('/budgets', function(req, res) {
    BudgetModel.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // create
  app.post('/budgets', function(req, res) {
    var obj = new BudgetModel(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find
  app.get('/budgets/:userId', function(req, res) {
    BudgetModel.findOne({userId: req.params.userId}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

   // update
  app.put('/budgets/:userId', function(req, res) {
    BudgetModel.findOneAndUpdate({userId: req.params.userId}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

 // delete 
  app.delete('/cat/:userId', function(req, res) {
    Cat.findOneAndRemove({userId: req.params.userId}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });

  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });

  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+app.get('port'));
  });
});

module.exports = app;