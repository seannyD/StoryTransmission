// warn user about recording and test sound

 var audio_context;
 var recorder;

function doTechTest(){
	setInstruction(techWarning);
	// TODO: vary image based on web browser
	showMe("techTest");
}

function userAgreedToShareMicrophone(){
	initRecorder();
}

function recorderInitialised(success){
	if(success){
		setTimeout("nextStage();",200);
	} else{
		setInstruction(failTechTest);
		// TODO: End experiment
	}
}