const cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 5000

var courses = [
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


app.get('/api/courses', function (req, res) {
	res.send(courses);
});


app.get('/api/courses/:id', function (req, res) {
	var cc =courses.find(c=> c.id == parseInt(req.params.id));
	if(!cc)
		res.status(404).send('didnt find');

	res.send(cc);
});

app.post('/api/courses', function (req, res) {
	const ctmp =
	{
		id : courses.length +1,
		name : req.body.name	
	};
	courses.push(ctmp);

	res.send(ctmp);
});





app.listen(PORT, () => console.log(`Listening on ${ PORT }`))