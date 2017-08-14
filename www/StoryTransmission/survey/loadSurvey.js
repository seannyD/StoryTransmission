Survey.Survey.cssType = "bootstrap";

// Survey Scripts loaded in stages.js

var uploadSurveyPHPLocation = '../survey/uploadSurvey.php';

var localisationSurveyResults = "";

var mycustomSurveyStrings = {
    completeText: "Next",
    completingSurvey: " "
};
Survey.surveyLocalization.locales["my"] = mycustomSurveyStrings;

function launchSurvey(surveyJSON, endFunction){
	if(endFunction == null){

		endFunction = function (){
			setTimeout("nextStage()",200);}
	}

	var myCss = {
        matrix: {root: "table table-striped"}  
   	};

   	showMe("surveyContainer");
	var survey = new Survey.Model(surveyJSON);
	$("#surveyContainer").Survey({
	    model: survey,
	    onComplete: endFunction,
	    css: myCss

	});
	survey.locale = "my";

	
}

function launchLocalisationSurvey(){

	var myCss = {
        matrix: {root: "table table-striped"}  
   	};

	var survey = new Survey.Model(localisationSurvey);
	$("#surveyContainer").Survey({
	    model: survey,
	    onComplete: finishLocalisation,
	    css: myCss
	});
	survey.locale = "my";
	showMe("surveyContainer");
}

function launchDemographySurvey(){
	if(experimentLocation=="USA"){
		launchSurvey(demographyUSA, finishDemographySurvey);
	}
	if(experimentLocation == "UK"){
		launchSurvey(demographyUK, finishDemographySurvey);
	}
}

function nextSurvey(survey){
	//alert(JSON.stringify(survey.data));
}

function finishDemographySurvey(survey){
	console.log(JSON.stringify(survey.data));
	console.log(survey.data);
	var sd = survey.data;

	sd['ParticipantId'] = participantID;
	sd['workerCode'] = workerCode;
	sd['Location'] = experimentLocation;
	sd['Story1'] = sample1;
	sd['Recording1File'] = participantID + "_" + sample1;
	sd['Story2'] = sample2;
	sd['Recording2File'] = participantID + "_" + sample2;
	sd['startTime'] = startTime;
	sd['endTime'] = getCurrentTime();

	sd["_MT_assignmentId"] = MTWorkerData["MT_assignmentId"];
  	sd["_MT_hitID"] = MTWorkerData["MT_hitId"];
  	sd["_MT_workerId"] = MTWorkerData["MT_workerId"];

  	// Prolific users

	sd["prolificParticipant"] = prolificParticipant.toString();
  	sd["prolific_pid"] = prolific_pid;
  	sd["prolific_session_id"] = prolific_session_id;

  	sd["browser"] = browser;
  	sd["os"] = os;

	for (var key in localisationSurveyResults) {
	  if (localisationSurveyResults.hasOwnProperty(key)) {
	    //console.log(key + " -> " + p[key]);
	    sd["Loc_"+key] = localisationSurveyResults[key];
	  }
	}
	console.log(JSON.stringify(sd));
	var outString = ConvertToCSV(sd);
	console.log(outString);
	uploadSurvey(outString);

}

function uploadSurvey(surveyText){
	var fd = new FormData();
	//var filename = participantID  + '.csv';
	
	//fd.append('fname', filename);
	fd.append('data', surveyText);
	fd.append('filetype', "survey");
	fd.append('id', participantID+"_Survey_0");
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

function finishLocalisation(survey) { 

	// these survey results are saved as part of the main survey, see (finishDemographySurvey)
    
    localisationSurveyResults = survey.data;
    
    if(survey.data['localisation']=="USA"){
    	setExperimentParameters("USA");
    } 
    else{
	    if(survey.data['localisation']=="UK"){
	    	setExperimentParameters("UK");
	    }
	    else{
		    if(survey.data['localisation']=="other" & survey.data['localisation2']=="USA"){
				setExperimentParameters("USA");
		    } 
		    else{
		    if(survey.data['localisation']=="other" & survey.data['localisation2']=="UK"){
				setExperimentParameters("UK");
		    } 	
		    }
		}
	}
	console.log("Set Localisation to "+ experimentLocation);
	setTimeout("nextStage()",100);

}

// $( document ).ready(function() {

// 	launchLocalisationSurvey();
// });

