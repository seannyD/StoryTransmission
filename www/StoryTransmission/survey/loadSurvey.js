Survey.Survey.cssType = "bootstrap";

$.getScript("../survey/introAndLocalisation.js");
$.getScript("../survey/demography_USA.js");
$.getScript("../survey/demography_UK.js");

var uploadSurveyPHPLocation = '../survey/uploadSurvey.php';

var localisationSurveyResults = "";

var mycustomSurveyStrings = {
    completeText: "Next",
    completingSurvey: " "
};
Survey.surveyLocalization.locales["my"] = mycustomSurveyStrings;

function launchSurvey(surveyJSON, endFunction){
	var survey = new Survey.Model(surveyJSON);
	$("#surveyContainer").Survey({
	    model: survey,
	    onComplete: endFunction
	});
	survey.locale = "my";

	showMe("surveyContainer");
}

function launchLocalisationSurvey(){
	var survey = new Survey.Model(introAndLocalisationSurvey);
	$("#surveyContainer").Survey({
	    model: survey,
	    onComplete: finishLocalisation
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
	sd['Location'] = experimentLocation;
	sd['Story1'] = sample1;
	sd['Recording1File'] = participantID + "_" + sample1;
	sd['Story2'] = sample2;
	sd['Recording2File'] = participantID + "_" + sample2;
	sd['startTime'] = startTime;
	sd['endTime'] = getCurrentTime();

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
			var filename = participantID + "_" + currentStorySample + '.csv';
			
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

