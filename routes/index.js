var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('node-uuid');

/* GET home page. */
router.get('/newScript', function(req, res, next) {
  res.render('newScript', { title: 'Express' });
});

router.get('/', function(req, res, next) {
	fs.readdir('./files/', function(err, filenames) {
	    if (err) {
	      onError(err);
	      return;
	    }
	    var arr = [];
	    filenames.forEach(function(filename) {
	      arr.push(filename);

	    });
	    res.render('index', {arr: arr});
	  });
  
});

router.get('/:uuid', function(req, res, next) {
  var item = req.params.uuid;
  fs.readFile('./files/' + item, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  res.render('script', {item: item, data:JSON.stringify(data)});
	});
  
});

router.post('/uploadScript', function(req, res, next) {
	var id = uuid.v4();
	var script = new Buffer(req.body.script, 'base64').toString();
	script = decodeURIComponent(script);
	console.log(script);
	fs.writeFile('./files/' + id + '.js', script, function(err) {
		if(err) {
		    return console.log(err);
		}

		res.sendStatus(200);
	}); 
});


router.post('/:uuid/editScript', function(req, res, next) { 
	var id = req.params.uuid;
	var script = new Buffer(req.body.script, 'base64').toString();
	script = decodeURIComponent(script);
	console.log(script);
	fs.writeFile('./files/' + id, script, function(err) {
		if(err) {
		    return console.log(err);
		}

		res.sendStatus(200);
	}); 
});

module.exports = router;


