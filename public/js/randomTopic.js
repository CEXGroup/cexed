
var topics = ["The 80's", "Love", "Country", "Parties", "Elvis Presley","Booty","Booty", "Top Hits", "Taylor Swift", "The Beatles", "Rap","TV Shows", "Children's Songs", "Movies", "Death"];

exports.getTopic = function(){
		//console.log('imherer');
		return topics[Math.floor((Math.random() * 15))];
		// document.getElementById('topic').innerHTML = topics[Math.floor((Math.random() * 5))];
  };
  // module.exports.getTopic = getTopic;
