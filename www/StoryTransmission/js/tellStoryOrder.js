

var tellStoryCurrentStoryImage = 0;
var numberOfWritingAreasCreated = 0;
var addedFinishButton = false;

var storyCardOrderText = [];

var baseStoryImageFolder = "../resources/images/storyImages/"

function initialiseStoryOrderTellStory(){
	addedFinishButton = false;
	numberOfWritingAreasCreated = 0;
	tellStoryCurrentStoryImage = -1;
	clickedNextStoryImage();
	$("#WriteStoryFromOrder").show();

}

function appendWritingSpaceTextArea(){
	$("#storyOrderWritingSpace").append(makeWritingSpaceTextArea());

	document.getElementById("writeArea"+(1+tellStoryCurrentStoryImage)).scrollIntoView();
	numberOfWritingAreasCreated += 1;
}

function makeWritingSpaceTextArea(){
	var writingSpaceTextAreaTemplateA = '<div id="writeArea';
	var writingSpaceTextAreaTemplateB = '"><h4>Scene ';
	var writingSpaceTextAreaTemplateC = '</h4><textarea placeholder="Tell the story for scene ';
	var writingSpaceTextAreaTemplateD = ' here" class="writeTextArea"></textarea></div>';
	var textAreaRaw = 
			writingSpaceTextAreaTemplateA+
			(tellStoryCurrentStoryImage+1)+
			writingSpaceTextAreaTemplateB +
			(tellStoryCurrentStoryImage+1)+
			writingSpaceTextAreaTemplateC +
			(tellStoryCurrentStoryImage+1)+
			writingSpaceTextAreaTemplateD;
	var textArea = jQuery.parseHTML(textAreaRaw);
	return(textArea);
}

function setTellStoryImages(){

	if(tellStoryCurrentStoryImage>0){
		$("#previousStoryImage").attr("src", 
			baseStoryImageFolder+storyCardOrder[tellStoryCurrentStoryImage-1]);
		$("#previousStoryImage").show();
	} else{
		$("#previousStoryImage").hide();
	}

	$("#currentStoryImage").attr("src", 
		baseStoryImageFolder+storyCardOrder[tellStoryCurrentStoryImage]);
	$("#CurrentSceneTitle").html("Scene "+(tellStoryCurrentStoryImage+1));

	if(tellStoryCurrentStoryImage<(storyCardOrder.length-1)){
		$("#nextStoryImage").attr("src", 
			baseStoryImageFolder+storyCardOrder[tellStoryCurrentStoryImage+1]);
		$("#nextStoryImage").show()
	} else{
		$("#nextStoryImage").hide()
	}
}

function clickedPreviousStoryImage(){
	if(tellStoryCurrentStoryImage>0){
		tellStoryCurrentStoryImage -= 1;
		setTellStoryImages();
		document.getElementById("writeArea"+(1+tellStoryCurrentStoryImage)).scrollIntoView();
	}
}

function clickedNextStoryImage(){
	if(tellStoryCurrentStoryImage<(storyCardOrder.length-1)){
		tellStoryCurrentStoryImage += 1;
		setTellStoryImages();
	}

	if(tellStoryCurrentStoryImage >= numberOfWritingAreasCreated){
		appendWritingSpaceTextArea();
	} else{
		document.getElementById("writeArea"+(1+tellStoryCurrentStoryImage)).scrollIntoView();
	}
	if((!addedFinishButton) && (tellStoryCurrentStoryImage == (storyCardOrder.length-1))){
		addedFinishButton = true;
		var NextButton = '<br /><button id="finishTellStoryOrderButton" class="btn btn-success" onclick="finishTellStoryOrder()">Finished</button>';
		$("#storyOrderWritingSpace").append(jQuery.parseHTML(NextButton));
		document.getElementById("finishTellStoryOrderButton").scrollIntoView();
	}

}

function finishTellStoryOrder(){
	$("#finishTellStoryOrderButton").hide();
	uploadTellStoryOrderData();
}


function uploadTellStoryOrderData(){
	// Make csv and send to server
	// headers
	
	var tellStoryTextAreas = $('#storyOrderWritingSpace textarea');

	var csvText = "participantID,sceneNumber,sceneID,storyText\n";
	for(var i=0;i<tellStoryTextAreas.length;++i){
		
		var storyText = tellStoryTextAreas[i].value;
		// add to list so we can access later
		storyCardOrderText.push(storyText);
		// replace any double-double quotes
		storyText = storyText.replace(/"/g, "'");
		// surround with double-double quotes to contain new lines etc.
		storyText = '"'+storyText+'"';
		var cells = [ 
			participantID,
			i+1, //scene number
			storyCardOrder[i], // image name
			storyText
		];

		csvText +=cells.join(",") + "\n";
	}

	// Upload to server
	var fd = new FormData();
	//var filename = participantID  + '_DT_' + distractionTaskNumber + '.csv';
	
	//fd.append('fname', filename);
	fd.append('data', csvText);
	fd.append('filetype','tellStoryFromOrderText');
	fd.append("id",participantID + "_tellStoryOrder");
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
