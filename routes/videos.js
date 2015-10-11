var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

//Get videos as JSON
router.get('/', function(req, res){
	var collection = db.get('videos');
	collection.find({}, function(err, videos){
		if (err) throw err;

		res.json(videos);
	});
});

//Add a video
router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

//Edit a Video
router.get('/:id', function(req, res) {
	var collection = db.get('videos');
	collection.findOne({_id: req.params.id}, function(err, video){
		if(err) throw err;

		res.json(video);
	});
});

//update a video
router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

//delete video
router.delete('/:id', function(req, res){
	var collection = db.get('videos');
	collection.remove({ _id: req.params.id }, function(err, video){
		if (err) throw err;

		res.json(video);
	});
});


module.exports = router;
