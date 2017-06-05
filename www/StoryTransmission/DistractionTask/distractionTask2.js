
// TODO: work out proper score, symbol + location + location&symbol.
// Check that the symbols stay in same place in select grid
// TODO: scale images? Or leave all same size?
// TODO: move to pure css to avoid grid problems?
// TOOD: record screen size?


var numStimuli = 15;
var NumSymbolsObserved = 7;
var NumberOfRounds = 3;

var selectGridColumns = 3;
var displayGridColumns = 6;
var displayGridRows = 4;

var cellSize = "60px";
var cellSize2 = "80px";


var distractionTaskInstructionTime = 5 * 1000;
var distractionTaskDisplayTime = 30 * 1000;
var distractionTaskSelectTime = 30 * 1000;
var distractionTaskFeedbackTime = 2 * 1000;

var distractionTaskInstructions = "Instructions for the task";

//-----

var uploadDistractionTaskPHPLocation = '../DistractionTask/uploadDistractionTask.php';

// Where the symbols should be (correct, as displayed)
var currentDisplayLocations = [];
var currentDisplaySymbols = [];

var playerDisplayLocations = [];
var playerDisplaySymbols = [];
var playerDisplayCorrect = [];
var playerTechnicalPoints = [];

var playerPoints = 0;

var roundResponses = []; // save participant data


var timerTotal = 1000;
var timerCurrent = 0;
var timerCountTime = 200;
var timerIntervalId = 0;


var distractionTaskSaveFields = ['participantID','playerDisplayLocations','playerDisplaySymbols',
				'playerDisplayCorrect', 'playerTechnicalPoints','currentDisplaySymbols','currentDisplayLocations', "time"];

var distractionStages;
var distractionStageCounter;

var tmpOutputText = "";

var distractionTaskNumber = 0;
//-----
// TODO: grid collapses if remove all of row ???

function startDistractionTask(taskNumber){

	distractionTaskNumber = taskNumber;
	
	distractionStages = ['Instructions'];
	distractionStageCounter = -1;

	for(var i=0; i < NumberOfRounds;++i){
		distractionStages.push("display");
		distractionStages.push("select");
		distractionStages.push("feedback");
	}
	distractionStages.push("upload");

	// set the grid dimensions
	var dg = 	document.getElementById("displayGrid");
	var gtc = "";
	for(var i=0; i<displayGridColumns;++i){
		gtc += cellSize2 + " "
	}
	
	//dg.style.setProperty('grid-template-columns', gtc);

	setupSave();

	updatePoints();

	//makeDraggableImages();
	//makeDisplayGrid();
	showMe("distractionTaskContainer");
	setTimeout("nextDistractionStage()",100);


}


function nextDistractionStage(){
	distractionStageCounter += 1;
	console.log(distractionStages[distractionStageCounter]);
	if(distractionStageCounter >= distractionStages.length){
		// Distraction task is done, move to next part of the experiment
		distractionTaskClearScreen();
		setTimeout("nextStage();",100);
	} else{
		switch (distractionStages[distractionStageCounter]) {
	                case "Instructions":
	                  setInstruction(distractionTaskInstructions);
	                  startTimer(distractionTaskInstructionTime);
	                  setTimeout("nextDistractionStage();",distractionTaskInstructionTime);
	                  break;
	                case "display":
	                  displayImages();
	                  break;
	                case "select":
	                  startSelectionStage();
	               	  break;
	                case "feedback": 
	                  doFeedback();

	                  break;
	                case "upload":
	                  uploadDistractionTaskData();
	                default:
	                	break;
	     }
	 }
}

function distractionTaskClearScreen(){
	hideMe('timer');
	hideMe('displayGrid');
	document.getElementById("displayGrid").innerHTML = "";
	document.getElementById("selectGrid").innerHTML = "";
	hideMe("trash");
	hideMe('selectGrid');
	hideMe("instructions")
}

function startTimer(t){
	clearInterval(timerIntervalId);
	showMe("timer");
	timerTotal = t;
	timerCurrent = 0;
	timerIntervalId = setInterval("incTimer()",timerCountTime);
}

function incTimer(){
	//console.log(timerCurrent+" "+timerTotal + " "+timerCountTime);
	timerCurrent += timerCountTime;
	if(timerCurrent >= timerTotal){
		clearInterval(timerIntervalId);
	}
	document.getElementById("timerProgress").value = (timerCurrent/ timerTotal)*100;
}

function displayImages(){
	distractionTaskClearScreen();

	// show grid
	//document.getElementById("displayGrid").style.display='grid';
	showMe("displayGrid");

	makeDisplayGrid();

	// choose random locations
	var candidateLocations = [];
	for(var i=0; i < displayGridColumns*displayGridRows;++i){
		candidateLocations.push(i);
	}
	shuffle(candidateLocations);
	var chosenLocations = candidateLocations.slice(0,NumSymbolsObserved);
	console.log(chosenLocations);
	
	// choose random symbols
	var candidateSymbols = [];
	for(var i=0; i < numStimuli;++i){
		candidateSymbols.push(i);
	}
	shuffle(candidateSymbols);
	var chosenSymbols = candidateSymbols.slice(0,NumSymbolsObserved);
	console.log(chosenSymbols);

	// add symbols to correct location divs
	currentDisplaySymbols = [];
	currentDisplayLocations = [];
	for(var i=0; i <NumSymbolsObserved;++i){
		
		var row = Math.floor(chosenLocations[i] / displayGridColumns);
		var col = chosenLocations[i] % displayGridColumns;
		console.log(chosenLocations[i]+ " place "+row+" "+col);
		currentDisplayLocations.push([row,col]);

		var displayDiv = "display_"+row+"_" + col;

		var symbolName = 'stim-'+ chosenSymbols[i];
		currentDisplaySymbols.push(chosenSymbols[i]);
		var symbolSRC = '../DistractionTask/images/'+symbolName +'.png';

		document.getElementById(displayDiv).innerHTML = getImageText(chosenSymbols[i],false);
	}

	// start the countdown
	setTimeout("nextDistractionStage();",distractionTaskDisplayTime);
	startTimer(distractionTaskDisplayTime);
}

function startSelectionStage(){
	distractionTaskClearScreen();
	makeDisplayGrid();
	makeDraggableImages();
	// can't use showMe() because it changes the display to 'inline'
	//document.getElementById("displayGrid").style.display='grid';
	//document.getElementById("selectGrid").style.display='grid';
	showMe("displayGrid");
	showMe("selectGrid");
	showMe("trash");

	setTimeout("nextDistractionStage();",distractionTaskSelectTime);
	startTimer(distractionTaskSelectTime);
}

function doFeedback(){

	var hasNoResponses = true;	
	var numCorrect = 0;

	playerDisplayLocations = [];
	playerDisplaySymbols = [];
	playerDisplayCorrect = [];



	// Is the right symbol in the right place?
	// Need to iterate through all cells
	var correctSymbolAndLocationPoints = 0;
	for(var i=0; i <displayGridColumns*displayGridRows;++i){
		var row = Math.floor(i / displayGridColumns);
		var col = i % displayGridColumns;

		// is there a symbol at this location?
		var displayDivName = "display_"+row+"_" + col;
		var displayDiv = document.getElementById(displayDivName);
		if(displayDiv.hasChildNodes()){
			var imgDiv = displayDiv.childNodes[0];
			var symbolName = imgDiv.id; // e.g. selGrid_1
			var symbolNumber = parseInt(symbolName.split("_")[1]);
			console.log("SYMBOL NAME " + symbolName)

			// check it's the right one
			var correct = false;
			for(var j=0; j<currentDisplaySymbols.length; ++j){
					//console.log([row,col,currentDisplaySymbols[j],currentDisplayLocations[j]]);
					if(currentDisplaySymbols[j] == symbolNumber){
						if(currentDisplayLocations[j][0] == row && currentDisplayLocations[j][1] == col){
							correct = true;
							break;
						}
					}
				}

			// TODO: Record location etc.
			playerDisplayLocations.push([row,col]);
			playerDisplaySymbols.push(symbolName);
			playerDisplayCorrect.push(correct);

			hasNoResponses = false;

			if(correct){
				// if it is, increase points, 
				correctSymbolAndLocationPoints += 1;
				playerPoints += 1;
				updatePoints();
				// change to tick image
				imgDiv.src = "../DistractionTask/utilImages/tick.png";
				//imgDiv.setProperty("draggable",false);
			} else{
				// change to cross image
				imgDiv.src = "../DistractionTask/utilImages/cross.png";
			}
		}

	}

	// Have they selected the right symbol, at least?
	var correctSymbolPoints = 0;
	for(var i=0; i< playerDisplaySymbols.length; ++i){
		var sx = parseInt(playerDisplaySymbols[i].split("_")[1]);
		for(var j=0; j < currentDisplaySymbols.length; ++j){
			if(sx == currentDisplaySymbols[j]){
				correctSymbolPoints += 1;
				//break; // break out of lower loop
			}
		}
	}

	// Have they put something in the right location, at least?
	var correctLocationPoints = 0;
	for(var i=0; i< playerDisplayLocations.length; ++i){
		for(var j=0; j < currentDisplayLocations.length; ++j){
			if(playerDisplayLocations[i][0] == currentDisplayLocations[j][0] && 
				playerDisplayLocations[i][1] == currentDisplayLocations[j][1]){
					correctLocationPoints += 1;
					//break; // break out of lower loop
			}
		}
	}
	console.log("Technical points "+correctSymbolPoints + " " + correctLocationPoints + " "+ correctSymbolAndLocationPoints);
	playerTechnicalPoints = correctSymbolPoints + correctLocationPoints + correctSymbolAndLocationPoints;


	recordResponses();

	// move on to next stage
	setTimeout("nextDistractionStage()",distractionTaskFeedbackTime);
}

// --------

function setupSave(){
	// (set up columns to push to??)

	for(var i=0; i< distractionTaskSaveFields.length; ++i){
		roundResponses[distractionTaskSaveFields[i]] = [];
	}
}

function recordResponses(){
	//playerDisplayLocations;
	//playerDisplaySymbols;
	//playerDisplayCorrect;
	//playerDisplayCorrect;
	//currentDisplayLocations;

	var displayLocationsText = "";
	for(var i=0;i<currentDisplayLocations.length;++i){
		displayLocationsText += currentDisplayLocations[i][0] + "-" + currentDisplayLocations[i][1]+"_";
	}

	var playerLocationsText = "";
	for(var i=0;i<playerDisplayLocations.length;++i){
		if(playerDisplayLocations[i].length==2){
			playerLocationsText += playerDisplayLocations[i][0] + "-" + playerDisplayLocations[i][1]+"_";
		}
	}

	var playerSymbolNumbers = [];
	for(var i=0; i<playerDisplaySymbols.length; ++i){
		playerSymbolNumbers.push(playerDisplaySymbols[i].split("_")[1]);
	}
	var playerSymbolsText = playerSymbolNumbers.join("_");
	var displaySymbolsText = currentDisplaySymbols.join("_");
	var playerDisplayCorrectText = playerDisplayCorrect.join("_");

	//var res= [];
	roundResponses["participantID"].push(participantID);
	roundResponses["currentDisplayLocations"].push(displayLocationsText);
	roundResponses["currentDisplaySymbols"].push(displaySymbolsText);
	roundResponses["playerDisplaySymbols"].push(playerSymbolsText);
	roundResponses["playerDisplayLocations"].push(playerLocationsText);
	roundResponses["playerDisplayCorrect"].push(playerDisplayCorrectText);
	roundResponses["playerTechnicalPoints"].push(playerTechnicalPoints); // defined  in doFeedback()
	roundResponses["time"].push(getCurrentTime());


}

function uploadDistractionTaskData(){
	// Make csv and send to server
	// headers
	var csvText = distractionTaskSaveFields.join(",");
	// data
	for(var r =0;r < roundResponses["participantID"].length; ++r){
		csvText += "\n";
		for(var i=0; i< distractionTaskSaveFields.length; ++i){
			csvText+=roundResponses[distractionTaskSaveFields[i]][r] + ",";
		}
		// remove trailing comma
		csvText = csvText.substring(0,csvText.length-1);
	}

	tmpOutputText = csvText;

	// Upload to server
	var fd = new FormData();
	var filename = participantID  + '_DT_' + distractionTaskNumber + '.csv';
	
	fd.append('fname', filename);
	fd.append('data', csvText);
	$.ajax({
		type: 'POST',
		url: uploadDistractionTaskPHPLocation,
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		console.log(data);
		setTimeout("nextStage()",500);
	});

}

//--------


function makeDraggableImages(){

	var text = "";

	for(var i=0; i <numStimuli; ++i){

		rowNumber = Math.floor(i / selectGridColumns);
		colNumber = i % selectGridColumns;

		text += '<div id="selectDiv_'+ rowNumber + "_" + colNumber +'" style="display:inline-block;">';
		text += getImageText(i,true);		 
		text += "</div>"

	}
	
	var sg = 	document.getElementById("selectGrid")
	sg.innerHTML = text;
	var gtc='';
	for(var i=0; i<selectGridColumns;++i){
		gtc += cellSize2 + " "
	}
	
	//sg.style.setProperty('grid-template-columns', gtc);
	//sg.style.display =  "grid";
	
}

function getImageText(imageNumber, draggable){
	var tx = '<img id="selGrid_' + imageNumber +
		 '" src="../DistractionTask/images/stim-'+ imageNumber +'.png"' 
	if(draggable){
		tx += ' draggable="true" '+'ondragstart="drag(event)" ondrop="drop(event)" '
	}
	//tx += 'style="width:'+cellSize+'">';
	tx += 'class="card">';
	return(tx);
}

function makeDisplayGrid(){


		
	var text = "";
	for(var i=0; i<displayGridRows; ++i){
		//row = table.insertRow(i);
		//text += "<br />"
		for(var j=0; j <displayGridColumns; ++j){
			//var cell = row.insertCell(j);
			var idx = 'display_'+i+"_"+j;
			text += '<div id="'+idx+'" ondrop="drop(event)" ' +
				'ondragover="preventDefault(event)" ' +
				'class="displayCell"'+
				//'style="width:'+cellSize2+';height:'+cellSize2+';border-style:solid;display:inline-block;"'+
				'></div>';
		}
	}
	// show the display grid
	var dg = 	document.getElementById("displayGrid");
	dg.innerHTML = text;
	//dg.style.width =  (90*displayGridColumns)+"px";

}

function updatePoints(){
	// TODO: update points display;
	document.getElementById("points").innerHTML = playerPoints;
}

// Drag and Drop

function drag(ev) {
	var tid = ev.target.id;
    ev.dataTransfer.setData("text", tid);
    var px = document.getElementById(tid).parentNode;
    ev.dataTransfer.setData("parent",px.id)

}

function drop(ev) {
	console.log("-------");
	ev.preventDefault();
	if(distractionStages[distractionStageCounter] == "select"){
		
		var location = ev.target.id;
		var content = ev.dataTransfer.getData("text");
		var source = ev.dataTransfer.getData("parent");
		console.log("DROP source:"+source + " location:"+location + " content:" + content);
		if((location=="trash" || location=="trashimg")){
			if(source.substr(0,7)=="display"){
			// Throwing example away
			document.getElementById(source).innerHTML = "";
			// Put back in select grid
			var i = parseInt(content.split("_")[1]);
			var rowNumber = Math.floor(i / selectGridColumns);
			var colNumber = i % selectGridColumns;
			var locx = "selectDiv_" + rowNumber + "_" + colNumber;
			console.log("Trash " + locx + " " + content);
			addImage(locx, content);
			} 

		} else{
				addImage(location,content);
				document.getElementById(source).innerHTML = "";
		}
	}

}

function preventDefault(ev){
	ev.preventDefault();
}

function addImage(location, content){
	console.log("AI"+" "+location+" "+content);
	var imageNum = content.split("_")[1];
	var locdiv = document.getElementById(location);

	// TODO: if already has an image, return it to the select grid
	if(locdiv.innerHTML!=""){
		// if it's dragged into the img node, get the parent div
		if(locdiv.id.substring(0,7)=="selGrid"){
			locdiv = locdiv.parentNode;
			console.log("SEL PASTE "+ locdiv.id);
		}
		var ximg = locdiv.getElementsByTagName('img')[0].id;
		var i = ximg.split("_")[1];
		var rowNumber = Math.floor(i / selectGridColumns);
		var colNumber = i % selectGridColumns;
		var locx = "selectDiv_" + rowNumber + "_" + colNumber;
		console.log("Put back " + ximg + ":"+locx);
		document.getElementById(locx).innerHTML = getImageText(i,true);
	}
	locdiv.innerHTML = getImageText(imageNum, true);
}






