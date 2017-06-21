// warn user about recording and test sound

 var audio_context;
 var recorder;

 var micTestFails = 0;

function doTechTest(){
	setInstruction(techWarning);
	// TODO: vary image based on web browser
	showMe("techTest");
}

function userAgreedToShareMicrophone(){
	hideMe("techTest");
	showMe("loader");
	initRecorder();
}

function userDeclinedToShareMicrophone(){
	setInstruction(participantDeclinedToShareMicrophoneText);
	showMe("techTest");
}

function recorderInitialised(success){
	if(success){
		setTimeout("nextStage();",200);
	} else{
		setInstruction(failTechTest);
		// TODO: End experiment
	}
}

function doMicTest(){
	testRecording  = true;
	document.getElementById("startRecordingButton").disabled=false;
    document.getElementById("stopRecordingButton").disabled=true;
    document.getElementById("startRecordingButton").className="btn btn-success";
    document.getElementById("stopRecordingButton").className="btn btn-danger disabled";
	setInstruction(micTestText);
	showMe("recorderContainer");
	hideMe("multipleRecordingsDiv");
	hideMe('testRecorder');
}

function micTestFail(){
	micTestFails += 1;
	if(micTestFails>=3){
		hideMe("testRecorder");
		setInstruction(micFailMessage);
	} else{
		// Try again
		stageCounter-=1;
		nextStage();
	}
	}

function doSpeakerTest(){
	setInstruction(speakerTestText);
	showMe("SpeakerTest");
	hideMe("finishedTestAudioButton");
}

function speakerTestStarted(){
	setTimeout('showMe("finishedTestAudioButton")',1000);
}

function finishedTestAudio(){
	// TODO: stop audio playing
	var au = document.getElementById("TestAudio");
	au.pause();
	setTimeout("nextStage()",100);
}

function testRecorderAudioStarted(){
	showMe("micWorkedButton");
}