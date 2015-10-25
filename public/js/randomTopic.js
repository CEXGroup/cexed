
var topics = ["The 80's", "Country", "Elvis Presley", "Top Hits", "Taylor Swift", "The Beatles", "Rap"];

exports.getTopic = function(){
		//console.log('imherer');
		return topics[Math.floor((Math.random() * topics.length))];
		// document.getElementById('topic').innerHTML = topics[Math.floor((Math.random() * 5))];
  };
  // module.exports.getTopic = getTopic;
