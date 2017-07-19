var fs = require('fs');
var gulp = require('gulp');

gulp.task("read", function(){
	fs.readFile('C:/Users/sotto/Documents/Txt_Essays/IS Application for Realz.txt', 'utf8', function(err, data) {
		var essay_obj = {
			words : {

			}
		};
		data = data.replace(/\r?\n|\r/g, '');
		var essay_array = data.toLowerCase().split(" ");
		//loop through all words
		for (var i = 0; i < essay_array.length; i++) {
			//if key is defined
			if(typeof essay_obj.words[essay_array[i]] !== 'undefined'){
			
				essay_obj.words[essay_array[i]].count++;
			// if key was not defined, define it, add a count at 1
			} else {
				essay_obj.words[essay_array[i]] = {
					word : essay_array[i],
					count : 1
				};
			}
		}
		var count_array = [];
		var counter = 0;
		for(var key in essay_obj.words){
			count_array.push([essay_obj.words[key].word, essay_obj.words[key].count]);
		}
		var bob = count_array.sort(function(a, b) {
		    return b[1] - a[1];
		});
			console.log(bob);
			//send this to a data json object for this filename
	});
});