var userCommand = process.argv[2];
var userInput = process.argv[3];

function getTweets() {
	
	var keys = require('./keys.js');

	var Twit = require('./node_modules/twit');
	
	var client = new Twit(keys.twitterKeys);
	
	client.get('search/tweets',{q: 'JasonSinn1'},function(err, data, response) {
   	console.log(data);
	});
};

function spotifySong() {
	var SpotifyWebApi = require('./node_modules/spotify-web-api-node');
 
	var spotifyApi = new SpotifyWebApi();
	
	if (userInput != undefined) {
		
		spotifyApi.searchTracks(userInput)

	  	.then(function(data) {

	    	console.log(data.body.tracks.items[0].artists[0].name);
	    	console.log(data.body.tracks.items[0].album.name);
	    	console.log(data.body.tracks.items[0].name);
	    	console.log(data.body.tracks.items[0].preview_url);
	  	}, 

	  	function(err) {
	    	console.error(err);
	  	});

  	} else {

  		userInput = 'The Sign';
  		spotifySong();
  	}
};

function movieThis() {
	var request = require('request');

	var imdbUrl = 'http://www.omdbapi.com/?t=' + userInput +'&y=&plot=short&r=json';
	// var tomatoUrl = 

	console.log(imdbUrl);

	request(imdbUrl, function(error, response, body){
		if (!error && response.statusCode == 200 && userInput != undefined) {
			var movieInfo = ['Title', 'Year', 'imdbRating', 'Country', 'Language', 'Plot', 'Actors'];

			for (var i = 0; i < movieInfo.length; i++) {
				console.log(JSON.parse(body)[movieInfo[i]]);
			}

			// request(tomatoUrl, function(error, response, body){
			// 	console.log(JSON.parse(body));
			// });

			console.log('https://www.rottentomatoes.com/search/?search='+ userInput);

		} else {
			userInput = 'Mr Nobody';
			movieThis();
		}
	});
};

function doWhatItSays() {
	var fs = require('fs');

	var writeThis = [process.argv[3], process.argv[4]];

	fs.writeFile('random.txt', writeThis, function(error){
		if (error) {
			console.log('error');
		} else {
			console.log('created the file');
		}
	});

	fs.readFile('random.txt', {encoding: 'utf8'}, function(err, data) {
		if (err) {
			return console.log(err);
		} else {

			var array = data.split(',');

			userCommand = array[0];
			userInput = array [1];

			switchCase();

		}
	})
};

function switchCase() {
	switch (userCommand){
		case 'my-tweets': getTweets(); 
		break;

		case 'spotify-this-song': spotifySong();
		break;

		case 'movie-this': movieThis();
		break;

		case 'do-what-it-says': doWhatItSays();
		break;
	}
}

switchCase();