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


	var survey = new Survey.Model(surveyJSON);
	$("#surveyContainer").Survey({
	    model: survey,
	    onComplete: endFunction,
	    css: myCss

	});
	survey.locale = "my";

	showMe("surveyContainer");
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

	sd["_MT_assignmentId"] = MTMTWorkerData["MT_assignmentId"];
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
	uploadSurvey(outString);

}

function uploadSurvey(surveyText){
	var fd = new FormData();
	var filename = participantID  + '.csv';
	
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

function finishLocalisation(survey) {
    
    localisationSurveyResults = survey.data;
    
    if(survey.data['localisation']=="USA"){
    	setExperimentParameters("USA");
    } 
    else{
	    if(survey.data['localisation']=="UK"){
	    	setExperimentParameters("UK");
	    }
	    else{
		    if(survey.data['localisation']=="Other" & survey.data['localisation2']=="USA"){
				setExperimentParameters("USA");
		    } 
		    else{
		    if(survey.data['localisation']=="Other" & survey.data['localisation2']=="UK"){
				setExperimentParameters("UK");
		    } 	
		    }
		}
	}

	setTimeout("nextStage()",100);
}

// $( document ).ready(function() {

// 	launchLocalisationSurvey();
// });

