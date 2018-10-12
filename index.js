const cool = require('cool-ascii-faces')
var express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

app.set('PORT', (process.env.PORT || 5000))

app.get('/', (req, res) => {
	res.send('hello world');
});

app.get('/api/test', (req, res) => {
	res.send([1,2,3]);
})
app.listen(5000, () => console.log('listening onoo port 5000'));