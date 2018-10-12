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

app.get('/apm/justin', function (req, res) {
	res.send('im brother batman');
});


app.get('/apm/dwyer', function (req, res) {
	res.send('hodor');
});


app.get('/apm/janja', function (req, res) {
	res.send('<img src="https://umassathletics.com/images/2016/9/21/2016_17_um_TENNIS_0033_Janja_Kovacevic.jpg">');
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))