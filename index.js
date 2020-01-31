var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));
app.use(cors());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/'));
});

app.get('/bichos', function(req, res){
  var bichos = fs.readdirSync('./client/assets');
  var path_name = bichos[bichos.length-1];
  res.json({ path: 'assets/'+path_name });
});

app.post('/drawing', function(req, res) {
  var data = req.body;
  var d = Date.now();
  var path_name = 'client/assets/bicho_'+d+'.json';
  fs.writeFile(path_name, JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
