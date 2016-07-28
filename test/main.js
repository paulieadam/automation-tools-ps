var url = 'https://duckduckgo.com/';

function checkSelectorForAttr(selector, attr){
	var results = [];
	var elements = document.querySelectorAll(selector);

	if (elements.length === 0) {
		return null;
	}

	for(var i = 0; i < elements.length; i++){
		var current = elements[i];
		var hasAttr = current.hasAttr(attr);
		if(!hasAttr) {
			results.push(current.outherHTML);
		}
	}
	return results;
}

// Making jquery available
casper.options.remoteScripts.push('https://code.jquery.com/jquery-2.2.3.min.js');

casper.test.begin('Testing the accessability', function(test){
	casper.start(url, function(){
		this.evaluate(function(){
			$.noConflict();
		});
	});

	casper.then(function(){
		test.assertDoesntExist('a input', 'Input element doesnt exist inside an anchor element');
	});

	casper.then(function(){
		test.assertExists('html[lang]', 'A html element with a "lang" attribute exists');
		test.assertTruthy(this.getElementAttribute('html[lang]', 'lang'), 'html lang attribute has a value');
	});

	casper.then(function(){
		test.assertExists('head title', 'A title element exists inside head');
	});

	casper.then(function(){
		var imagesWithNoAltAttr = this.evaluate(checkSelectorForAttr, 'img', 'alt');
		if(imagesWithNoAltAttr && imagesWithNoAltAttr.length > 0){
			test.fail('Some images don\t have an "alt" attribute');
		}
	});

	casper.run(function(){
		test.done();
	});
});