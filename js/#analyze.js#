// TODO ***************************************************************************************
// - check to see if the word before the word I typed is the same as the word before the same word in the words object. 

// - make dropdown clickable to autopopulate. Disappear after autopopulate. 

// - attach dropdown to the side of the textarea. attach save button elsewhere too.

// - autosave every 5 seconds???

// - find a text editor that will transfer perfectly to word with the spacing, tabs, enter, bolding, etc

// - allow the editor to save to word files

// - analyze sentences and phrases (2-3 words)

// - account for question marks and exclamation marks

// - allow people to save things by topic (different folders within the data file)

// - REFACTOR CODE TO WORK BETTER AND NICER (MORE EFFICIENT)

// - 

//	PROBLEMS TO FIX
// - think of times when there will be a ." or ?" and account for those
// - 
// - 
// - 
// - 
// - 
//********************************************************************************************

//GLOBAL VARIABLES
var analyze;
var shift = false;
var question_mark = false;
var exclamation_point = false;
var period = false;
var comma = false;
var quotes = false;
var tab = false;
var completed_sentences = '';

//FOR TESTING
analyze = {
    words : {}
};
//
// addSuggestionToPage
//
// descr - adds a div element with suggestion words to the page
// @params - last_word - word just before the last space typed
function addSuggestionToPage(last_word){
    var div = document.querySelector('.top-right');
    div.innerHTML = "";
    var inner_divs = "";

    // sort words by count
    var sortable = [];
    for(var key in analyze.words[last_word].word_after){
	var aft = analyze.words[last_word].word_after[key];
	sortable.push([aft.word, aft.count]);
    }
    sortable.sort(function(a, b) {
	return b[1] - a[1];
    });

    // append sorted words to page
    for(var i = 0; i < sortable.length; i++){
	inner_divs += "<div  class='inner-div'><p tabindex="+(i+1)+" class='choice'><b>"+ sortable[i][0] + "</b> (" + sortable[i][1] + ")</p></div>";
	div.innerHTML = inner_divs;
	div.style.display = 'block';
    }

    // add class active to dropdown
    setTimeout(() => {
	var parent = document.querySelector('.top-right');
	var child = parent.childNodes[0].childNodes[0];
	var choices = document.querySelectorAll('.choice');
	for(var j = 0; j < choices.length; j++){
	    choices[j].addEventListener('focusin', (e) => {
			e.target.classList.add('active');
	    });
	    choices[j].addEventListener('focusout', (e) => {
		e.target.classList.remove('active');
	    });
	    choices[j].addEventListener('keydown', (e) => {
		if(e.keyCode !== 9 && e.keyCode !== 13){
		    moveCaretToEnd(document.querySelector('#essay'));
		}
	    });
	    choices[j].addEventListener('keyup', (e) => {
		if(e.keyCode === 13){
		    addWord(document.querySelector('#essay'), document.activeElement.innerText.substr(0, document.activeElement.innerText.indexOf('(') - 1));
		}
	    });
	}

	child.focus();
	
    }, 0);
}

// add selected dropdown word to textarea
function addWord(el, word) {
    moveCaretToEnd(el)
	.then((data) => {
	    el.value += word;
	}); 
}

// put cursor at the end of textarea box
function moveCaretToEnd(el) {
    return new Promise((res, rej) => {
	console.log(el);
    console.log(el.createTextRange);
    if (typeof el.selectionStart == "number") {
	el.focus();
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
	res();
    });
}

//
// autoPopulate
//
// descr - this function listens for the space bar, 
// then suggests words in a popup box for the writer to use.
function autoPopulate() {
    document.querySelector('#essay').addEventListener('keyup', function(e){
	//listen for space bar
	if(e.keyCode === 32){

	    //get the word right before the space just entered
	    var sentence_array = this.value.trim().split(" ");
	    var last_word = sentence_array[sentence_array.length - 1].toLowerCase();

	    //find last_word in words object
	    //if the word already exists, check the word before and if it's the same, populate the next word that comes the most frequently
	    if(analyze.words.hasOwnProperty(last_word)){
		//if word before is same, populate
		// if(analyze.words[last_word].word_before){

		// } else {

		// }
		
		addSuggestionToPage(last_word);
	    }
	    //else if doesn't exist, do nothing
	    else {}
	}
    });
}
autoPopulate();

//
// init
//
// descr - initializes the analyze object with data from the data folder, analyze.json file
// function init(){
//     $.ajax({
// 	type: "GET",
// 	url: '/analyze',
// 	contentType: "application/x-www-form-urlencoded",
// 	dataType: "json",
// 	success: function(response){
// 	    analyze = JSON.parse(response);
// 	    console.log(analyze);
// 	}
//     });
// }
// init();

function shiftPressed(){
    document.querySelector('#essay').addEventListener('keydown', function(e){
	if(e.keyCode === 16){
	    shift = true;
	}
	if(e.keyCode === 191){
	    question_mark = true;
	}
	if(e.keyCode === 49){
	    exclamation_point = true;
	}
	if(e.keyCode === 190){
	    period = true;
	}
	if(e.keyCode === 188){
	    comma = true;
	}
	if(e.keyCode === 222){
	    quotes = true;
	}
	if(e.keyCode === 9){
	    tab = true;
	}
	// console.log(e.keyCode);


	// on tab, switch the active field in dropdown box
	if(tab){
	    // e.preventDefault();
	    //     var active = document.querySelector('div.top-right>div.active')
	    //     if(active){
	    //     active.classList.remove('active');
	    // 	if(active.nextSibling){
	    // 	    active.nextSibling.classList.add('active');
	    // 	}
	    // 	else {
	    // 	    document.querySelector('.top-right').childNodes[0].classList.add('active');
	    // 	}
	    //     }
	}


	// listens for period, question mark, or exclamation mark
	if(period || (shift && question_mark) || (shift && exclamation_point) || comma || (shift && quotes)) {  //not working with question mark and exclamation
	    console.log("in");
	    //grab sentence and split into words
	    var sentence_words = this.value.substr(completed_sentences.length).trim().split(" ");
	    //disable the ability to grab the same sentence twice
	    setTimeout(() => {
		completed_sentences += this.value.substr(completed_sentences.length);
		console.log(sentence_words);
		console.log(completed_sentences);
	    }, 500);

	    //go through each word in sentence and add it to analyze object or increase count of previously exisiting word
	    for (var i = 0; i < sentence_words.length; i++) {
		if(sentence_words[i].includes("'")){
		    var word = sentence_words[i].toLowerCase().match(/\w+\'*\w+/)[0];
		}
		else {
		    var word = sentence_words[i].toLowerCase();
		}
		//define words before and after
		var before, after;
		if(typeof sentence_words[i - 1] !== 'undefined') { before = sentence_words[i - 1].toLowerCase().match(/\w+/)[0]; }
		else { before = null; }
		if(typeof sentence_words[i + 1] !== 'undefined') { after = sentence_words[i + 1].toLowerCase().match(/\w+/)[0]; }
		else { after = null; }

		//if object doesn't exist
		if(!analyze.words.hasOwnProperty(word)){
		    analyze.words[word] = {
			word_before : {},
			word : word,
			word_after : {},
			count : 1
		    };
		    //add the previous word if defined
		    if(before) {
			//if previous word exists, incrememnt the count
			if(analyze.words[word].word_before.hasOwnProperty(before)){
			    analyze.words[word].word_before[before].count++;
			}
			//if prev word doesn't exist, add it
			else {
			    analyze.words[word].word_before[before] = {
				word : before,
				count : 1
			    };
			}
		    }

		    //add the next word if defined
		    if(after) {
			//if word after exists, up the count
			if(analyze.words[word].word_after.hasOwnProperty(after)){
			    analyze.words[word].word_after[after].count++;
			}
			// if word after doesn't exist, add it
			else {
			    analyze.words[word].word_after[after] = {
				word : after,
				count : 1
			    };
			}
		    }
		    //if object does exist
		} else {
		    //up the count of the word
		    analyze.words[word].count++;
		    //add the word_before and word_after object if not present
		    if(!analyze.words[word].hasOwnProperty('word_before')){
			analyze.words[word].word_before = {};
		    }
		    if(!analyze.words[word].hasOwnProperty('word_after')){
			analyze.words[word].word_after = {};
		    }
		    //if the word before is undefined, add it
		    if(!analyze.words[word].word_before.hasOwnProperty(before)){
			//if there is a word before in the sentence
			if(before) {
			    analyze.words[word].word_before[before] = {
				word : before,
				count : 1
			    };
			}
		    } 
		    //if word before is defined, increment it
		    else {
			analyze.words[word].word_before[before].count++;
		    }

		    //if the word after is undefined, add it
		    if(!analyze.words[word].word_after.hasOwnProperty(after)){
			if(after) {
			    analyze.words[word].word_after[after] = {
				word : after,
				count : 1
			    };
			} 
		    } 
		    //if word after is defined, increment it
		    else {
			analyze.words[word].word_after[after].count++;
		    }
		}
	    }
	}
    });
}
shiftPressed();

//
// keyUp
//
// descr - 
function keyUp(){
    //sentences that have already been analyzed
    document.querySelector('#essay').addEventListener('keyup', function(e){
	if(e.keyCode === 16){
	    shift = false;
	}
	if(e.keyCode === 191){
	    question_mark = false;
	}
	if(e.keyCode === 49){
	    exclamation_point = false;
	}
	if(e.keyCode === 190){
	    period = false;
	}
	if(e.keyCode === 188){
	    comma = false;
	}
	if(e.keyCode === 222){
	    quotes = false;
	}
	if(e.keyCode === 9){
	    tab = false;
	}
	// console.log('shift: ', shift);
	// console.log('question_mark: ', question_mark);
	// console.log('exclamation_point: ', exclamation_point);
	// console.log('period: ', period);
	
    }); // end event listener
}
keyUp();

//
// saveToJson
//
// descr - saves analyze to data folder, analyze.json file
// function saveToJson(){
//     $.ajax({
// 	type: "POST",
// 	url: '/endpoint',
// 	data: analyze,
// 	contentType: "application/x-www-form-urlencoded",
// 	dataType: "json",
// 	success: function(response){
// 	    console.log(response);
// 	}
//     });
// }

//**************************** FINISHED TASKS ********************************************************
// *** - allow multiple sentences to be written (store sentences and use a substring to cut them off)
// *** - save all information in json object folder that I pull from
