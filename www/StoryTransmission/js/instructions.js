// Instructions

var endSurveyText = "Thank you for completing the survey, follow the link below to get your worker code";
var workerCodeText = "Please copy and paste this code into Mechanical Turk: <br /><br />";

var uploadingText = "Uploading your story ...";

var recordingInstructionText = "Press record and tell us your story!";

var playStoryInstructionText = "Click the button below to listen to the story";

function setInstruction(t){
	document.getElementById("instructions").innerHTML = t;
}

function endSurvey(){
	setInstruction(endSurveyText);
}

function showWorkerCode(){
	setInstruction(workerCodeText + workerCode);
}