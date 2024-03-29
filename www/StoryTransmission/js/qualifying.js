uploadQualSurveyPHPLocation= '../survey/uploadQualSurvey.php';


function startQualifyingExperiment(){
	stages = [
	  "qualifyingConsent",
	  "browserTest",
      "speakerTest",
      "techTest",
      "micTest",
      "qualifyingSurvey",
      "qualifyingWorkerCode"];

      makeProgressBar();


      // TODO: change workerCode
      participantID = "Q_"+new Date().getTime();
      // this is just temporary
      workerCode = "QF_" + Math.round(Math.random()*1000000);

}


function launchQualifyingSurvey(){

	var myCss = {
        matrix: {root: "table table-striped"}  
   	};

	var survey = new Survey.Model(qualifyingTaskSurvey);
	$("#surveyContainer").Survey({
	    model: survey,
	    onComplete: finishQualifyingSurvey,
	    css: myCss
	});
	survey.locale = "my";
	showMe("surveyContainer");

}

function finishQualifyingSurvey(survey){
	var sd = survey.data;
    var codedExperimentLocation = "ASU";

    if(survey.data['qualCountry']=="us"){
    	experimentLocation = "USA";
    } 
    else{
	    if(survey.data['qualCountry']=="uk"){
	    	experimentLocation  = "UK";
	    	codedExperimentLocation = "KU";
	    }
	    else{
		    if(survey.data['qualCountry']=="other" & survey.data['qualCountryOther']=="us"){
				experimentLocation = "USA";
		    } 
		    else{
		    if(survey.data['qualCountry']=="other" & survey.data['qualCountryOther']=="uk"){
				experimentLocation = "UK";
				codedExperimentLocation = "KU";
		    } 	
		    }
		}
	}


	var codedExperimentState = sd["qualUsStateCounty"] || sd["qualUkStateCounty"] || "OT";

	// Set worker code
	workerCode = "QF_" + codedExperimentLocation + "_" + codedExperimentState +"_"+ Math.round(Math.random()*1000000);

	// Save data

	sd['ParticipantId'] = participantID;
	sd['workerCode'] = workerCode;
	sd['Location'] = experimentLocation;
	sd['startTime'] = startTime;
	sd['endTime'] = getCurrentTime();
	
	sd["_MT_assignmentId"] = MTWorkerData["MT_assignmentId"];
  	sd["_MT_hitID"] = MTWorkerData["MT_hitId"];
  	sd["_MT_workerId"] = MTWorkerData["MT_workerId"];

  	// Prolific users

	sd["prolificParticipant"] = prolificParticipant.toString();
  	sd["prolific_pid"] = prolific_pid;
  	sd["prolific_session_id"] = prolific_session_id;

	// for (var key in localisationSurveyResults) {
	//   if (localisationSurveyResults.hasOwnProperty(key)) {
	//     //console.log(key + " -> " + p[key]);
	//     sd["Loc_"+key] = localisationSurveyResults[key];
	//   }
	// }
	console.log(JSON.stringify(sd));
	var outString = ConvertToCSV(sd);
	console.log(outString);
	uploadSurvey(outString);

	// write to qualifyingSurvey/...
	var fd = new FormData();

	fd.append('data', outString);
	fd.append("filetype","qualify");
	fd.append("id",participantID + "_Qual_0");
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

function showQualifyingWorkerCode(){
	if(prolificParticipant){
		setInstruction(endQualifyingSurveyText_Prolific);
	} else{
		setInstruction(endQualifyingSurveyText_MechanicalTurk + "<h1>" +workerCode + "</h1>");
	}
}