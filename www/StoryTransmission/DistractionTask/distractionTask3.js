
// TOOD: record screen size?




var numStimuli = 9;//15;
//var chosenLetters = ["A", "B", "C", "D", "E", "I", "J", "K", "L", "M" ,"O" ,"T" ,"U" ,"V" ,"Y"];
var chosenLetters = ["A", "B", "C", "D", "I", "K", "O", "U", "V"];
					//0,1,2,3,5,7,10,12,13


var selectStimOrder = []; // set in startDistractionTask();

var NumSymbolsObserved = 5 //7;
var NumberOfRounds = 4;

var gridImages = [];

var selectGridColumns = 3;
var displayGridColumns = 4;
var displayGridRows = 4;

var cellSize = "60px";
var cellSize2 = "80px";



var distractionTaskInstructionTime = 85 * 1000; // video is 1:24
var timeoutDistractionTaskInstruction = 0; // for keeping track of timeout
var timeoutNextDistractionStage = 0;
var timeoutSelectionStage = 0;
var distractionTaskDisplayTime = 20 * 1000;
var distractionTaskSelectTime = 20 * 1000;
var distractionTaskFeedbackTime = 2 * 1000;

var useTrashcan = false;
var noDragEnd = false;

//var distractionTaskInstructions = "Instructions for the task";  // set in instructions.js

//-----

var uploadDistractionTaskPHPLocation = '../DistractionTask/uploadDistractionTask.php';

// Where the symbols should be (correct, as displayed)
var currentDisplayLocations = [];
var currentDisplaySymbols = [];

var playerDisplayLocations = [];
var playerDisplaySymbols = [];
var playerDisplayCorrect = []; //VSLT "P&D"
var playerSymbolCorrect = []; //VSLT "D"
var playerLocationCorrect = []; //VSLT "P"
var playerTechnicalPoints = []; // VSLT "P + P&D"


var playerPoints = 0;
var maxPossiblePoints = 0;

var roundResponses = []; // save participant data

var timerType = "numeric" // or "bar"
var timerTotal = 1000;
var timerCurrent = 0;
var timerCountTime = 200;
var timerIntervalId = 0;

var dataTransferText = "";
var dataTransferSource = "";


var distractionTaskSaveFields = ['ParticipantID','playerDisplayLocations','distractionTaskNumber','playerDisplaySymbols','playerDisplaySymbols.alpha',
				'playerDisplayCorrect', 'playerTechnicalPoints','currentDisplaySymbols','currentDisplaySymbols.alpha',
				'currentDisplayLocations', 'playerSymbolsCorrect','playerLocationsCorrect','playerSymbolsAndLocationsCorrect', "time",
				"distractionTaskchosenLetters","distractionTaskselectStimOrder","distractionTaskNumSymbolsObserved",
				"distractionTaskNumberOfRounds","distractionTasknumStimuli","distractionTaskselectGridColumns","distractionTaskdisplayGridColumns",
				"distractionTaskdisplayGridRows","distractionTaskDisplayTime","distractionTaskSelectTime","distractionTaskFeedbackTime"];


var distractionStages;
var distractionStageCounter;

var tmpOutputText = "";

var distractionTaskNumber = 0;
//-----
// TODO: grid collapses if remove all of row ???

function startDistractionTask(taskNumber){

	//preloadGridImages(); // preloading should be done before.

	if(selectStimOrder.length ==0){
		for(var i=0; i<numStimuli;++i){
			selectStimOrder.push(i);
		}
		// randomise once, so it remains the same throughout the experiment
		shuffle(selectStimOrder);
	}

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

	playerPoints = 0;
	maxPossiblePoints = 0;
	updatePoints();

	if(typeof document.getElementById("trash")!="undefined" && !useTrashcan){
		hideMe("trash");
	}

	//makeDraggableImages();
	//makeDisplayGrid();
	showMe("distractionTaskContainer");
	setTimeout("nextDistractionStage()",100);


}


function nextDistractionStage(){
	distractionStageCounter += 1;
	console.log(distractionStages[distractionStageCounter]);

	// this can cause weird effects later on if there's a stray timeout still running.
	// so we just call it once when the distractionStageCounter is equal to the distractionStages.length

	if(distractionStageCounter == distractionStages.length){
		// Distraction task is done, move to next part of the experiment
		distractionTaskClearScreen();
		setTimeout("nextStage();",100);
	} else{
		if(distractionStages[distractionStageCounter]){
		switch (distractionStages[distractionStageCounter]) {
	                case "Instructions":
	                  // hide things we don't need
	                  hideMe("displayGrid");
	                  hideMe("selectGrid");
	                  hideMe("DragArrow");
	                  if(useTrashcan){
	                  	hideMe("trash");
	                  }
	                  // set instruction
	                  setInstruction("<h1>Memory Test Instructions</h1>");
	                  var introVideo = document.getElementById("DistractionTaskVideo");
	                  // reset the video to the start
  					  introVideo.currentTime = 0;
  					  // need to use block display to make video border size correct
	                  document.getElementById("DistractionTaskVideoDiv").style.display="block";
	                  // play the video
	                  introVideo.play();

	                  // Start the countdown timer
	                  startTimer(distractionTaskInstructionTime);
	                  // Have a backup timer, in case the video doesn't work or has trouble loading
	                  clearTimeout(timeoutDistractionTaskInstruction);
	                  timeoutDistractionTaskInstruction = setTimeout("DistractionTaskVideoEnded();",distractionTaskInstructionTime);
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
	                  distractionStageCounter = -1;
	                  uploadDistractionTaskData();  // successful upload starts next stage
	                default:
	                	break;
	     }
	 }
	 }
}

function distractionTaskClearScreen(){
	hideMe('timer');
	hideMe('displayGrid');
	document.getElementById("displayGrid").innerHTML = "";
	document.getElementById("selectGrid").innerHTML = "";
	if(useTrashcan){
		hideMe("trash");
	}
	hideMe('selectGrid');
	hideMe("instructions")
	hideMe("DragArrow");
	hideMe("DistractionTaskVideoDiv");
}

function startTimer(t){
	clearInterval(timerIntervalId);
	showMe("timer");
	var d = new Date();
	var n = d.getTime();
	timerCurrent = n;
	timerTotal = n + t;
	timerIntervalId = setInterval("incTimer()",timerCountTime);
}

function incTimer(){
	if(timerType=="numeric"){
		var d = new Date();
	    var timeLeft_seconds = Math.round((timerTotal - d.getTime())/1000);
	    if(timeLeft_seconds>0){
	    	document.getElementById("timer").innerHTML = "Remaining time: " + timeLeft_seconds;
	    } else{
	    	document.getElementById("timer").innerHTML = "Remaining time: 0";
	    }
	} else{
		//console.log(timerCurrent+" "+timerTotal + " "+timerCountTime);
		timerCurrent += timerCountTime;
		if(timerCurrent >= timerTotal){
			clearInterval(timerIntervalId);
		}
		document.getElementById("timerProgress").value = (timerCurrent/ timerTotal)*100;
	}
}

function DistractionTaskVideoEnded(){
	// this is triggered either by either the video stopping
	// or the backup timeout firing

	// stop the video, just in case
	var introVideo = document.getElementById("DistractionTaskVideo");
	introVideo.pause();

	// clear distraction task backup timeout action
	clearTimeout(timeoutDistractionTaskInstruction);
	hideMe("DistractionTaskVideoDiv");
	nextDistractionStage();
}

function displayImages(){
	distractionTaskClearScreen();

	setInstruction(distractionTaskWatchInstructions);

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
	clearTimeout(timeoutNextDistractionStage);
	timeoutNextDistractionStage = setTimeout("nextDistractionStage();",distractionTaskDisplayTime);
	startTimer(distractionTaskDisplayTime);
}

function startSelectionStage(){
	distractionTaskClearScreen();
	setInstruction(distractionTaskSelectInstructions);
	makeDisplayGrid();
	makeDraggableImages();
	// can't use showMe() because it changes the display to 'inline'
	//document.getElementById("displayGrid").style.display='grid';
	//document.getElementById("selectGrid").style.display='grid';
	showMe("displayGrid");
	showMe("selectGrid");
	if(useTrashcan){
		showMe("trash");
	}
	showMe("DragArrow");

	clearTimeout(timeoutSelectionStage);
	timeoutSelectionStage = setTimeout("nextDistractionStage();",distractionTaskSelectTime);
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
				//updatePoints();
				// change to tick image
				imgDiv.src = "../DistractionTask/utilImages/tick.png";
				//imgDiv.setProperty("draggable",false);
			} else{
				// change to cross image
				imgDiv.src = "../DistractionTask/utilImages/cross.png";
			}
		}

	}

	maxPossiblePoints += NumSymbolsObserved;
	updatePoints();

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
	playerTechnicalPoints = correctLocationPoints + correctSymbolAndLocationPoints;


	recordResponses(correctSymbolPoints,correctLocationPoints,correctSymbolAndLocationPoints);

	// clear screen for short pause before moving on
	setTimeout("makeDisplayGrid()",distractionTaskFeedbackTime - 500);

	// move on to next stage
	setTimeout("nextDistractionStage()",distractionTaskFeedbackTime);
}


function preloadGridImages(){
	if(gridImages.length==0){
		for(var i=0; i < numStimuli; ++i){
			var symbolName = '../DistractionTask/images/stim-'+ i+".png";
			gridImages[i] = new Image();
			gridImages[i].src = symbolName;
		}
		var tickImage = new Image();
		var crossImage = new Image();
		tickImage.src = "../DistractionTask/utilImages/tick.png";
		crossImage.src = "../DistractionTask/utilImages/cross.png";
	}	
}


// --------

function setupSave(){
	// (set up columns to push to??)

	for(var i=0; i< distractionTaskSaveFields.length; ++i){
		roundResponses[distractionTaskSaveFields[i]] = [];
	}
}

function recordResponses(correctSymbolPoints,correctLocationPoints,correctSymbolAndLocationPoints){
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

	// symbols in letter format
	var playerSymbolLetters = numbersToLetters(playerSymbolNumbers);

	var playerSymbolsText = playerSymbolNumbers.join("_");
	var playerSymbolsLettersText = playerSymbolLetters.join("_");

	var displaySymbolsText = currentDisplaySymbols.join("_");
	var displaySymbolsLettersText = numbersToLetters(currentDisplaySymbols).join("_");
	
	var playerDisplayCorrectText = playerDisplayCorrect.join("_");
	

	//var res= [];
	roundResponses["ParticipantID"].push(participantID);
	roundResponses["currentDisplayLocations"].push(displayLocationsText);
	roundResponses["distractionTaskNumber"].push(distractionTaskNumber);
	roundResponses["currentDisplaySymbols"].push(displaySymbolsText);
	roundResponses["currentDisplaySymbols.alpha"].push(displaySymbolsLettersText);
	roundResponses["playerDisplaySymbols"].push(playerSymbolsText);
	roundResponses["playerDisplaySymbols.alpha"].push(playerSymbolsLettersText)
	roundResponses["playerDisplayLocations"].push(playerLocationsText);
	roundResponses["playerDisplayCorrect"].push(playerDisplayCorrectText);
	roundResponses["playerTechnicalPoints"].push(playerTechnicalPoints); // defined  in doFeedback()
	roundResponses["playerSymbolsCorrect"].push(correctSymbolPoints);
	roundResponses["playerLocationsCorrect"].push(correctLocationPoints);
	roundResponses["playerSymbolsAndLocationsCorrect"].push(correctSymbolAndLocationPoints);
	roundResponses["time"].push(getCurrentTime());

	roundResponses["distractionTaskchosenLetters"].push(chosenLetters.join("_"));
	roundResponses["distractionTaskselectStimOrder"].push(selectStimOrder.join("_")); // set in startDistractionTask();
	roundResponses["distractionTaskNumSymbolsObserved"].push(NumSymbolsObserved);
	roundResponses["distractionTaskNumberOfRounds"].push(NumberOfRounds);
	roundResponses["distractionTasknumStimuli"].push(numStimuli);
	roundResponses["distractionTaskselectGridColumns"].push(selectGridColumns);
	roundResponses["distractionTaskdisplayGridColumns"].push(displayGridColumns);
	roundResponses["distractionTaskdisplayGridRows"].push(displayGridRows);
	roundResponses["distractionTaskDisplayTime"].push(distractionTaskDisplayTime);
	roundResponses["distractionTaskSelectTime"].push(distractionTaskSelectTime);
	roundResponses["distractionTaskFeedbackTime"].push(distractionTaskFeedbackTime);



}

function numbersToLetters(nums){
	var out = [];
	for(var i=0;i<nums.length; ++i){
		out.push(chosenLetters[nums[i]]);
	}
	return(out);
}

function uploadDistractionTaskData(){
	// Make csv and send to server
	// headers
	var csvText = distractionTaskSaveFields.join(",");
	// data
	for(var r =0;r < roundResponses["ParticipantID"].length; ++r){
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
	//var filename = participantID  + '_DT_' + distractionTaskNumber + '.csv';
	
	//fd.append('fname', filename);
	fd.append('data', csvText);
	fd.append('filetype','distraction');
	fd.append("id",participantID + "_distraction_" + distractionTaskNumber);
	$.ajax({
		type: 'POST',
		url: uploadSurveyPHPLocation,
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		console.log(data);
		var bits = data.split(";");
		if(bits.length==2){
			addToFileLog(bits[0],bits[1]);
		}
		setTimeout("nextStage()",500);
	});
	//TODO: action on fail?
}

//--------


function makeDraggableImages(){

	var text = "";
	

	for(var i=0; i <numStimuli; ++i){

		rowNumber = Math.floor(i / selectGridColumns);
		colNumber = i % selectGridColumns;

		var selImagei = selectStimOrder[i];

		text += '<div id="selectDiv_'+ rowNumber + "_" + colNumber +'" style="display:inline-block;">';
		text += getImageText(selImagei,true);		 
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
	console.log(tx);
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
	document.getElementById("points").innerHTML = "Points: "+playerPoints +" /" + maxPossiblePoints;
}

// Drag and Drop

function drag(ev) {
	var tid = ev.target.id;
    ev.dataTransfer.setData("text", tid);
    dataTransferText = tid;
    var px = document.getElementById(tid).parentNode;
    ev.dataTransfer.setData("parent",px.id)
    dataTransferSource = px.id;
    noDragEnd = false;

}

// TODO: 
// this event listener + "drop(ev)" are both firing when dragging an item from the display grid to another space on the display grid
document.addEventListener("dragend", function( ev ) {
	  
	      if(distractionStages[distractionStageCounter] == "select"){
      			var toLocation = ev.target.id;
				var content = ev.dataTransfer.getData("text");
				var fromLocation = ev.dataTransfer.getData("parent");

		      	if(browser=="Chrome"){
		      		fromLocation = dataTransferSource;
		      		content = dataTransferText;
		      	}

		      	var imageNumber = content.split("_")[1];
		      	var selectGridLocation = getSelectGridLocationID(parseInt(imageNumber));
	      		//deleting image selGrid_1; display_1_3
	      		console.log("Dragend Source:" + imageNumber + " fromLocation:"+fromLocation + " toLocation:" + toLocation);
	      		//Source:6 fromLocation:display_1_2 toLocation:selGrid_6
	      		if(fromLocation.substr(0,7)=="display"){
	      			// remove from display
	      			document.getElementById(fromLocation).innerHTML = "";
	      			// add back to select grid
	      			document.getElementById(selectGridLocation).innerHTML = getImageText(imageNumber, true);
	      		}

	      }
  		
}, false);

function drop(ev) {
	console.log("-- DROP -------");
	ev.preventDefault();
	if(distractionStages[distractionStageCounter] == "select"){
		
		var toLocation = ev.target.id;
		var content = ev.dataTransfer.getData("text");
		var fromLocation = ev.dataTransfer.getData("parent");

      	if(browser=="Chrome"){
      		fromLocation = dataTransferSource;
      		content = dataTransferText;
      	}

      	var imageNumber = content.split("_")[1];
      	var selectGridLocation = getSelectGridLocationID(parseInt(imageNumber));



      	if(toLocation.substr(0,7)=="selGrid"){
      		// dragged into image div, get parent.
      		toLocation = document.getElementById(toLocation).parentNode.id;
      	}

		console.log("DROP imageNumber:"+imageNumber + " fromLocation:"+fromLocation + " toLocation:" + toLocation);

		if(fromLocation.substr(0,6)=="select" && toLocation.substr(0,7)=="display"){
			// from select to display
			// replace select grid location with blank card
			document.getElementById(selectGridLocation).innerHTML = '<img id="' + 'selGrid_' + imageNumber +'" draggable="false" src="../DistractionTask/images/blank.png" class="card">';
			// Add to display
			addImage(toLocation,imageNumber);
		}
		if(fromLocation.substr(0,7)=="display" && toLocation.substr(0,7)=="display"){
			console.log("Display to Display");
			// from display to display
			// Add to display
			addImage(toLocation,imageNumber);
			// remove from source
			document.getElementById(fromLocation).innerHTML = "";
		}

		


	}

}

function getSelectGridLocationID(imageNumber){
	var imageLocation = 0;
	for(var i=0; i < selectStimOrder.length;++i){
		if(selectStimOrder[i]==imageNumber){
			imageLocation = i;
		}
	}
	
	var rowNumber = Math.floor(imageLocation / selectGridColumns);
	var colNumber = imageLocation % selectGridColumns;
	var locx = "selectDiv_" + rowNumber + "_" + colNumber;
	return(locx);
}

function preventDefault(ev){
	ev.preventDefault();
}

function addImage(location, imageNumber){
	console.log("AI"+" location: "+location+", Image number:"+imageNumber);
	var locdiv = document.getElementById(location);

	if(locdiv.id.substring(0,7)=="selGrid"){
			locdiv = locdiv.parentNode;
			console.log("SEL PASTE "+ locdiv.id);
	}

	// TODO: if already has an image, return it to the select grid
	if(locdiv.innerHTML!=""){
		// if it's dragged into the img node, get the parent div

		var ximg = locdiv.getElementsByTagName('img')[0].id;
		var replacedImageNumber = parseInt(ximg.split("_")[1]);
		// select div is not necessarily placed 1 to 9
		// so find position from selectStimOrder 
		var selectGridLoc = getSelectGridLocationID(replacedImageNumber);
		
		console.log("Put back " + ximg + ":"+selectGridLoc + ";" + replacedImageNumber);
		document.getElementById(selectGridLoc).innerHTML = getImageText(replacedImageNumber,true);
	}
	locdiv.innerHTML = getImageText(imageNumber, true);
}






