const cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('hello world');
});

app.get('/api/test', function (req, res) {
	res.send([1,2,3]);
})
app.listen(5000, () => console.log('listening onoo port 5000'));