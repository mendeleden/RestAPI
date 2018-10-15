const cool = require('cool-ascii-faces');
var express = require('express');
const Joi = require('joi')
var path = require('path');
var uniqid = require('uniqid');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 5000
const weburl ='https://infinite-crag-79113.herokuapp.com';
var objects = [
	{ uid : 1, name: 'course 1'},
	{ uid : 2, name: 'course 2'},
	{ uid : 3, name: 'course 3'},
];

app.use(express.json({
  verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(404).send({"verb": req.method, "url": weburl.concat(req.url), "message": 'NOT A JSON Object'});
      throw Error('invalid JSON');
    }
  }
}));;// middleware to process json


app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('Cisco - Basic REST API');
});

app.get('/api/test', function (req, res) {
	res.send([1,2,3]);
});


app.get('/api/objects', function (req, res) {
	var arr=[];
	for(i=0;i<objects.length; i++){
	
	var str = "https://infinite-crag-79113.herokuapp.com/api/objects/";
	var str = str.concat(objects[i].uid);
	arr.push({"url": str});	
	}
	res.send(arr);
});


app.get('/api/objects/:uid', function (req, res) {
	
	
	var cc =objects.find(c=> c.uid == (req.params.uid));
	if(!cc)
		res.status(404).send('didnt find');

	res.send(cc);
});

app.post('/api/objects', function (req, res) {
	
	var tmp = {uid : uniqid()};

	var inputkeys = Object.keys(req.body);
	var inputvalues = Object.values(req.body);
	
	for(i=0;i<inputkeys.length;i++)
	{
		if(inputkeys[i] != 'uid')
			tmp[inputkeys[i]] = inputvalues[i];
	}
	objects.push(tmp);
	res.send(tmp);
});

app.put('/api/objects/:uid', function (req, res) {
	
	var cc =objects.find(c=> c.uid == req.params.uid);
	if(!cc)
		return res.status(404).send('didnt find');	
	var inputkeys = Object.keys(req.body);
	var inputvalues = Object.values(req.body);
	var tmp = {uid : req.params.uid};
	for(i=0;i<inputkeys.length;i++)
	{
		if(inputkeys[i] != 'uid')
			tmp[inputkeys[i]] = inputvalues[i];
	}
	const index = objects.indexOf(cc);
	objects.splice(index, 1);
	objects.push(tmp);
	res.send(tmp);

});

app.delete('/api/objects/:uid', function (req, res) {
	var cc =objects.find(c=> c.uid == req.params.uid);
	if(!cc)
		res.status(404).send('didnt find');
	const index = objects.indexOf(cc);
	objects.splice(index, 1);

	res.send(cc);
});



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))