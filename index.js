const cool = require('cool-ascii-faces');
var express = require('express');
const Joi = require('joi')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 5000

var objects = [
	{ id : 1, name: 'course 1'},
	{ id : 2, name: 'course 2'},
	{ id : 3, name: 'course 3'},
];

app.use(express.json()); // middleware to process json

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('hello world!!!');
});

app.get('/api/test', function (req, res) {
	res.send([1,2,3]);
});


app.get('/api/objects', function (req, res) {
	res.send(objects);
});


app.get('/api/objects/:id', function (req, res) {
	var cc =objects.find(c=> c.id == parseInt(req.params.id));
	if(!cc)
		res.status(404).send('didnt find');

	res.send(cc);
});

app.post('/api/objects', function (req, res) {
	
	var tmp = {id : objects.length +1};

	var inputkeys = Object.keys(req.body);
	var inputvalues = Object.values(req.body);
	for(i=0;i<inputkeys.length;i++)
	{
		tmp[inputkeys[i]] = inputvalues[i];
	}
	objects.push(tmp);
	res.send(tmp);
});

app.put('/api/objects/:id', function (req, res) {
	var cc =objects.find(c=> c.id == parseInt(req.params.id));
	if(!cc)
		return res.status(404).send('didnt find');	
	var inputkeys = Object.keys(req.body);
	var inputvalues = Object.values(req.body);
	for(i=0;i<inputkeys.length;i++)
	{
		cc[inputkeys[i]] = inputvalues[i];
	}

	res.send(cc);

});

app.delete('/api/objects/:id', function (req, res) {
	var cc =objects.find(c=> c.id == parseInt(req.params.id));
	if(!cc)
		res.status(404).send('didnt find');
	const index = objects.indexOf(cc);
	objects.splice(index, 1);
		
	res.send(cc);
});



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))