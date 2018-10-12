const cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 5000


app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('hello world');
});

app.get('/api/test', function (req, res) {
	res.send([1,2,3]);
})
app..listen(PORT, () => console.log(`Listening on ${ PORT }`))