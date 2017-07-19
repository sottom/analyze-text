var fs = require('fs');
var readline = require('readline');

var myInterface = readline.createInterface({
  input: fs.createReadStream('C:/Users/sotto/Documents/')
});

var search_for_closing_bracket = false;
var closing_bracket_found = false;
var lineNum_of_closing_bracket;

var lineno = 0;
myInterface.on('line', function (line) {
  if(line.indexOf("bookmark_bar") > -1)
  		search_for_closing_bracket = true;
  if(search_for_closing_bracket){
  	console.log(line);
  	// if(line.indexOf("} ]") > -1){
  	// 	line.replace("}", '}, {' +  + '}')
  	// }
  }else{

  }
  lineno++;
});