// Instructions

var techWarning = "In this experiment, we need to record your voice.  <br /><br /> Please follow the instructions below to allow us to use your microphone.<br /><br />Recording will not begin immediately - you will be told when recording starts and stops.";

var failTechTest = "Sorry, we could not access a microphone on your device.";

var endSurveyText = "Thank you for completing the survey, follow the link below to get your worker code";
var workerCodeText = "Please copy and paste this code into Mechanical Turk: <br /><br />";

var uploadingText = "Uploading your story ...";

var recordingInstructionText = "Press record and tell us your story!";

var playStoryInstructionText = "Click the button below to listen to the story";

var speechEvaluationInstructionText1 = "Listen to the speaker in the clip by pressing the 'Play' button, you will be asked questions about how they sound.";
var speechEvaluationInstructionText2 = "Listen to this other speaker by pressing the 'Play' button, you will be asked questions about how they sound.";

function setInstruction(t){
	document.getElementById("instructions").innerHTML = t;
}

function endSurvey(){
	setInstruction(endSurveyText);
}

function showWorkerCode(){
	setInstruction(workerCodeText + workerCode);
}