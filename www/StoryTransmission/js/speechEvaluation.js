// Speech evaluation
// 1. Play Comma Gets a Cure recording matching accent of Recording I
// Received Pronunciation → Received Pronunciation, Comma Gets a Cure
//Inland South → Inland South, Comma Gets a Cure
// 2. ****6-point (?) **Likert items TBD**
//		Randomize order


var evaluationPrestigeType="";
var speechEvaluationStartTime = "";
var currentEvaluationNumber = 0;

function speechEvaluation(sampleNum){

	// TODO: randomise order that samples are played
    
	if(sampleNum==0){
		setInstruction(speechEvaluationInstructionText1);
	}
	if(sampleNum==1){
		setInstruction(speechEvaluationInstructionText2);
	}
	
	currentEvaluationNumber = sampleNum;
	evaluationPrestigeType = speechEvaluationOrder[sampleNum];
	audioToPlay = audioFolder+experimentLocation + "_" + evaluationPrestigeType+"_Comma.mp3";
	
	speechEvaluationStartTime = getCurrentTime();
	readyToPlay = true;
	showMe("playStoryContainer");
	showMe("playStoryButton");

}

function launchSpeechEvaluationSurvey(sampleNum){
	// shuffle question order
	// TODO: make sure that all questions are on the same page, otherwise, shuffle pages
	shuffle(speechEvaluationSurvey['pages'][0]['questions']);
	launchSurvey(speechEvaluationSurvey, finishSpeechEvaluationSurvey);
}

function finishSpeechEvaluationSurvey(survey){
	console.log(JSON.stringify(survey.data));
	console.log(survey.data);
	var sd = survey.data;

	sd['ParticipantId'] = participantID;
	sd['Location'] = experimentLocation;
	sd['Story1'] = sample1;
	sd['Recording1File'] = participantID + "_" + sample1;
	sd['Story2'] = sample2;
	sd['Recording2File'] = participantID + "_" + sample2;
	sd['startTime'] = speechEvaluationStartTime;
	sd['endTime'] = getCurrentTime();
	sd['evaluationFile'] = audioToPlay;
	sd['evaluationPrestige'] = evaluationPrestigeType;
	sd['evaluationPresentationNumber'] = currentEvaluationNumber;

	for (var key in localisationSurveyResults) {
	  if (localisationSurveyResults.hasOwnProperty(key)) {
	    //console.log(key + " -> " + p[key]);
	    sd["Loc_"+key] = localisationSurveyResults[key];
	  }
	}
	console.log(JSON.stringify(sd));
	var outString = ConvertToCSV(sd);
	console.log(outString);

	var filename = participantID  + '_SpeechEvaluation_' +evaluationPrestigeType +'.csv';

	uploadSpeechEvaluationSurvey(outString,filename);

}

function uploadSpeechEvaluationSurvey(surveyText, filename){
	var fd = new FormData();
	
	fd.append('fname', filename);
	fd.append('data', surveyText);
	$.ajax({
		type: 'POST',
		url: uploadSurveyPHPLocation,
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		console.log(data);
		setTimeout("nextStage()",500);
	});
}