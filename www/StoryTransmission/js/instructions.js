// Instructions

var techWarning = "In this experiment, we need to record your voice.  <br /><br /> Please follow the instructions below to allow us to use your microphone.<br /><br />Recording will not begin immediately - you will be told when recording starts and stops.";

var failTechTest = "Sorry, we could not access a microphone on your device.";

//var endSurveyText = "Thank you for completing the survey, follow the link below to get your worker code. <br /><br />" ;

var endSurveyText_MechanicalTurk = "Thank you for completing the survey!<br /><br />Below you will find your worker code.  Save your code in a secure location for entry on Mechanical Turk. Your Completion Code must match the one entered here in order to receive compensation for your participation. <br /><br /> COMPLETION CODE: <br />";

//var endSurveyText.Prolific = "Please follow the link below to complete the survey on Prolific Academic. <br /><br />";

var uploadingText = "Uploading your story ...";

var recordingInstructionText = "Press record and tell us your story!";

var playStoryInstructionText = "Click the button below to listen to the story";

var speechEvaluationInstructionText1 = "Listen to the speaker in the clip by pressing the 'Play' button, you will be asked questions about how they sound.";
var speechEvaluationInstructionText2 = "Listen to this other speaker by pressing the 'Play' button, you will be asked questions about how they sound.";

var distractionTaskInstructions = "Instructions for the distraction task";

function setInstruction(t){
	document.getElementById("instructions").innerHTML = t;
}

function endSurvey(){
	// Not currently used
	setInstruction(endSurveyText);
}

function showWorkerCode(){
	setInstruction(endSurveyText_MechanicalTurk + workerCode);
}