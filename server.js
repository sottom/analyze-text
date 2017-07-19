const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs');
var root = 'C:/Users/sotto/Coding/essay-analysis/';
// tell the express app what middleware to use
//from bytes to useable data.
app.use(bodyParser.urlencoded({ extended: true }));
//allow access to static files
app.use(express.static('./'));

app.get('/', function (req, res) {
  res.sendFile(root + 'index.html');
})

app.get('/analyze', function (req, res) {
  fs.readFile('C:/Users/sotto/Coding/essay-analysis/data/analyze.json', function(err, data){
  	data = data.toString();
  	res.json(data);
  });
})

app.post('/endpoint', function (req, res) {
  console.log("in");
  words = JSON.stringify(req.body);
  fs.writeFile('C:/Users/sotto/Coding/essay-analysis/data/analyze.json', words, function(data){
  	console.log(data);
  });
  res.json({frank:"frank"});
})
 
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})