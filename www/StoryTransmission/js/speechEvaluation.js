// Speech evaluation
// 1. Play Comma Gets a Cure recording matching accent of Recording I
// Received Pronunciation → Received Pronunciation, Comma Gets a Cure
//Inland South → Inland South, Comma Gets a Cure
// 2. ****6-point (?) **Likert items TBD**
//		Randomize order


var evaluationPrestigeType="";
var speechEvaluationStartTime = "";
var currentEvaluationNumber = 0;

var originalSpeechEvaluationQuestionOrder = [];

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
	//shuffle(speechEvaluationSurvey['pages'][0]['questions']);

	// shuffle the order of questions
	originalSpeechEvaluationQuestionOrder = [];
	for(var i=0; i < speechEvaluationSurvey['pages'][0]['elements'].length; ++i){
		originalSpeechEvaluationQuestionOrder.push([]);
		for(var j=0; j <speechEvaluationSurvey['pages'][0]['elements'][i]['rows'].length; ++j){
			originalSpeechEvaluationQuestionOrder[i].push(speechEvaluationSurvey['pages'][0]['elements'][i]['rows'][j]);
		}
		shuffle(speechEvaluationSurvey['pages'][0]['elements'][i]['rows']);
	}
	console.log(originalSpeechEvaluationQuestionOrder);

	launchSurvey(speechEvaluationSurvey, finishSpeechEvaluationSurvey);

}

function finishSpeechEvaluationSurvey(survey){
	console.log(JSON.stringify(survey.data));
	console.log(survey.data);
	var sdx= survey.data;
	

	var qorder = "";
	for(var i=0;i< Object.keys(sdx).length;++i){
		var key = Object.keys(sdx)[i];
		console.log(key);
		console.log(Object.keys(sdx[key]));
		qorder += Object.keys(sdx[key]).join("_");
		qorder += "#";
	}

	// The speech evalutation questions have been randomly mixed up, so we need to re-order them:
	var sd = {};
	// // add all non-survey data bits
	// for(var i=0; i < sdx.length;++i){
	// 	//sd.push({});
	// 	for(var key in sdx[i]){
	// 		if(!key in originalSpeechEvaluationQuestionOrder[i]){
	// 			sd[key] = sdx[Object.keys(sdx)[i]][key];
	// 		} 
	// 	}
	// }

	console.log(Object.keys(sdx));
	console.log(originalSpeechEvaluationQuestionOrder);

	// add survey questions in original order
	for(var i=0; i<originalSpeechEvaluationQuestionOrder.length;++i){
		for(var j=0; j<originalSpeechEvaluationQuestionOrder[i].length;++j){
			var key = originalSpeechEvaluationQuestionOrder[i][j];
			console.log(key);
			sd[Object.keys(sdx)[i] + "_" + key] = sdx[Object.keys(sdx)[i]][key];
		}
	}

	sd["QuestionOrder"] = qorder;

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