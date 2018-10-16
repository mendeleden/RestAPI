const cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');
var uniqid = require('uniqid');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 5000
const weburl ='https://infinite-crag-79113.herokuapp.com/';
var objects = [];

app.use(express.json({ //determine if request contains malformed object 
  verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(404).send(errReturn(req.method, req.url, 'NOT a Json Object'));
      throw Error('invalid JSON');
    }
  }
}));;// middleware to process json


app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('Cisco - Basic REST API');
});



app.get('/api/objects', function (req, res) {
	var arr=[];
	for(i=0;i<objects.length; i++){
		var str = weburl.concat('api/objects/').concat(objects[i].uid);  //print all objects with custom url
		arr.push({"url": str});	
	}
	res.send(arr);
});


app.get('/api/objects/:uid', function (req, res) {
	
	var cc =findObject(req.params.uid);   //try find object
	if(!cc)
		res.status(404).send(errReturn(req.method, req.url, 'Cannot Find Object'));

	res.send(cc);
});

app.post('/api/objects', function (req, res) {
	
	var tmp = {uid : uniqid()};

	var inputkeys = Object.keys(req.body);
	var inputvalues = Object.values(req.body);
	
	for(i=0;i<inputkeys.length;i++) //create the new object with the values and keys from request
	{
		if(inputkeys[i] != 'uid') //do not allow overwrite the uid
			tmp[inputkeys[i]] = inputvalues[i];
	}

	objects.push(tmp);
	res.send(tmp);
});

app.put('/api/objects/:uid', function (req, res) {
	
	var cc =findObject(req.params.uid);
	if(!cc)
		return res.status(404).send(errReturn(req.method, req.url, 'Cannot Find Object'));	
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
	
	var cc =findObject(req.params.uid);
	if(!cc)
		res.status(404).send(errReturn(req.method, req.url, 'Cannot find Object'));
	const index = objects.indexOf(cc);   //find the index of the object 
	objects.splice(index, 1);		 // if object was found, remove from objects
	res.send();
});

function errReturn(verb, url, txt){ //format error response object
	var err = {
		"verb" : verb,
		"url" : weburl.concat(url),
		"message" : txt
	}
	return err;
}

function findObject(uid){
	
	return objects.find(c=> c.uid == uid);  //check objects for matching uids
}





app.listen(PORT, () => console.log(`Listening on ${ PORT }`))