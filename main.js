var casper = require('casper').create();
var fs = require('fs');

var data;

casper.on('remote.message', function(msg){
	console.log('remote message is: ' + msg);
});

casper.start('http://www.google.ca/', function() {
	this.fill('form', {q:'hello world'}, true);
});

casper.wait(1000, function(){
	data = this.evaluate(function(){
			var targetElements = document.querySelectorAll('.g h3 a');
			var data = [];

			for(var index = 0; index < targetElements.length; index++) {
				var currentElement = targetElements[index];
				var currentLink = currentElement.getAttribute('href');
				var currentTitle = currentElement.text;

				var currentItem = {
						'link': currentLink,
						'title': currentTitle
				};

				data.push(currentItem);
			}
			return data;
	});
});

casper.run(function(){
	fs.write('./output/output.json', JSON.stringify(data, null, '\t'));
	this.exit();
});