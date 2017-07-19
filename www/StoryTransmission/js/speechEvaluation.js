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

var evalAudioToPlay; // stores which audio was played most recently

function speechEvaluation(sampleNum){
	// note that this might be called from playAndEvaluation() if participant can answer survey while listening
    
	if(sampleNum==0){
		setInstruction(speechEvaluationInstructionText1);
	}
	if(sampleNum==1){
		setInstruction(speechEvaluationInstructionText2);
	}
	
	currentEvaluationNumber = sampleNum;
	evaluationPrestigeType = speechEvaluationOrder[sampleNum];
	evalAudioToPlay = audioFolder+experimentLocation + "_" + evaluationPrestigeType+"_Comma.mp3";

	var audio = document.getElementById('playEvalPlayer');
    var source = document.getElementById('playEvalSource');
	audio.pause();
	source.src = evalAudioToPlay;
	audio.load();
	
	speechEvaluationStartTime = getCurrentTime();
	readyToPlay = true;
	showMe("playEvalContainer");
	showMe("playEvalButton");

}

function playEvalButtonPress(){
	var audio = document.getElementById('playEvalPlayer');
    var source = document.getElementById('playEvalSource');
	audio.oncanplaythrough = audio.play();
	hideMe("playEvalButton");
	showMe("surveyContainer");

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

function playAndEvaluation(sampleNum){
	speechEvaluation(sampleNum);
	launchSpeechEvaluationSurvey(sampleNum);
	hideMe("surveyContainer"); // hide until participant starts playing the voice
}

function finishSpeechEvaluationSurvey(survey){


	// stop audio playing (if playing)
	var audio = document.getElementById('playEvalPlayer');
    audio.pause();


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
	sd['evaluationFile'] = evalAudioToPlay;
	sd['evaluationPrestige'] = evaluationPrestigeType;
	sd['evaluationPresentationNumber'] = currentEvaluationNumber;

	sd["_MT_assignmentId"] = MTWorkerData["MT_assignmentId"];
  	sd["_MT_hitID"] = MTWorkerData["MT_hitId"];
  	sd["_MT_workerId"] = MTWorkerData["MT_workerId"];

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
	
	//fd.append('fname', filename);
	fd.append('data', surveyText);
	fd.append("filetype","survey");
	fd.append('id', participantID+"_SpEval_"+currentEvaluationNumber);
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
}