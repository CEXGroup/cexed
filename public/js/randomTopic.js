
var topics = ["America", "Cows", "Party Animals", "Children", "Pizza"];

exports.getTopic = function(){
		//console.log('imherer');
		return topics[Math.floor((Math.random() * 5))];
		// document.getElementById('topic').innerHTML = topics[Math.floor((Math.random() * 5))];


  };

  // module.exports.getTopic = getTopic;
