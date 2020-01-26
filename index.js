var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client'));
app.use(cors());

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/'));
});

app.post('/drawing', function(req, res) {
  var data = req.body;
  fs.writeFile('client/assets/temp.json', JSON.stringify(data), (err) => {
    // JSON.stringify(data)
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
