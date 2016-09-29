var friendsData 	= require('../data/friends.js');
var path 			= require('path');

module.exports = function(app){

	// function compare(arr1, arr2) {
	// 	var totalDifference = 0;
	// 		for (var i = 0; i < arr1.length; i++) {
    // 			return totalDifference += Math.abs(arr1[i] - arr2[i]);
	// 		}
	// }
	function compare(arr1, arr2){
 	 var result = 0;
	  
	  for(var i=0; i<arr1.length; i++){
	    if(arr1[i] !== arr2[i]){
	      if(arr1[i] > arr2[i]){
	        result += (arr1[i] - arr2[i]);
	      } else{
	        result += (arr2[i] - arr1[i]);
	      }
	    }
	  }
	  return result;
	}
	
	
	// API GET Requests
	app.get('/api/friends', function(req, res){
		
		res.json(friendsData);
		
	});
	//Do something to get match
	app.get('/api/match', function(req, res){
		// var output = function() {
			// console.log(friendsData);
		// for(var i = 0; friendsData.length > i; i++) {
		// 		var match = compare(friendsData[i].scores, friendsData[i+1].scores);
		// 		console.log(match);
		// 		if (match == 0) {
		// 			return friendsData[i]
		// 		} else if (match == 1) {
		// 			return friendsData[i+1]
		// 		} else if (match <= 4) {
		// 			return friendsData[i+2]
		// 		} else {

		// 		    return {
		// 					"name" : "Jason Chan",
		// 					"photo" : "https://pbs.twimg.com/profile_images/621921614377058304/ailqyj6j.jpg",
		// 					"scores" : [1,2,3,4,5,1,1,1,1,1]
		// 				   }
		// 		}
		// 	}

		// }
		// res.json(output());

		function findTheOne(user){
		  var scoresUnsorted = [];
		  var scoresSort = [];
		  for(var i=0; i<friendsData.length; i++) {
		    scoresSort.push(compare(user.scores, friendsData[i].scores));
		  }
		  
		  scoresSort.forEach(function(item){
		    scoresUnsorted.push(item);
		  });

		  var sorted = scoresSort.sort(function(a, b){
		    return a - b;
		  });

		  var theIndex = scoresUnsorted.indexOf(sorted[0]);

		  return friendsData[theIndex];
		}

		res.json(findTheOne(friendsData[friendsData.length-1]));
		
	});

	// API POST Requests
	app.post('/api/friends', function(req, res){
			
			// if(friendsData == true) {
			// 	friendsData.push(req.body);
			// 	res.json(true); // KEY LINE
			// } else {
			// 	res.json(false);
			
			friendsData.push(req.body);
			res.json(true); // KEY LINE

		
			


	});

	// resets everything

	app.post('/api/clear', function(req, res){
		// Empty out the arrays of data
		friendsData = [
			{
				"name" : "Jason Chan",
				"photo" : "https://pbs.twimg.com/profile_images/621921614377058304/ailqyj6j.jpg",
				"scores" : [1,2,3,4,5,1,1,1,1]
			}
		];

		console.log(friendsData);
	})
}