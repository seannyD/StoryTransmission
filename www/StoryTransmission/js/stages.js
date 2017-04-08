// Define and keep track of order of stages

var experimentLocation = "USA";  // changed by localisation survey
var sample1 = "";
var sample2 = "";
var numberOfRecordedSamples = 2;

var startTime = getCurrentTime();

var participantID = "";

var workerCode = "TRANSMISSION" + new Date().getTime();



var stages = [
      "consent",
      "techTest",
      "localisation",  
			'story1','distraction1','recording1',
			'story2','distraction2','recording2',
			'demographySurvey','checkUploaded','workerCode'];

//stages = ["localisation", 'demographySurvey','workerCode'];

var stageCounter = -1;

function getCurrentTime(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return(date+' '+time);
}


function nextStage(){
  console.log("Next Stage");
	clearScreen();
  setInstruction("");

	stageCounter += 1;
	switch (stages[stageCounter]) {
                case "consent":
                  launchSurvey(consentSurvey);
                  break;
                case "techTest":
                  doTechTest();
                  break;
                case "localisation": 
                	launchLocalisationSurvey();
                  break;
                case "story1":
                	showPlayStory(0);
                  break;
                case "story2":
                	showPlayStory(1);
                  break;
                case "distraction1": // up
                  startDistractionTask(0);
                  break;
                case "distraction2":
                  startDistractionTask(1);
                  break;
                case "recording1":
                  showRecordingControls(sample1);
                  break;
                case "recording2":
                  showRecordingControls(sample2);
                  break;
                case "demographySurvey":
                  launchDemographySurvey();
                  break;
                case "checkUploaded":
                  checkRecordingsHaveUploaded();
                  break;
                case "workerCode":
                  showWorkerCode();
                  break;
                default:break;
                }
}


function setExperimentParameters(loc){
	experimentLocation = loc;
	chooseStimuli();

  participantID = loc+"_"+new Date().getTime();

}

function chooseStimuli(){

  //  1. HighP, Muki
  //  2. HighP, Taka & Toro
  //  3. LowP, Muki
  //  4. LowP, Taka & Toro

  var prestigeType = ["HighP","LowP"];
  var storyType    = ["Muki","Taka"];

  // for now: just choose randomly
  shuffle(prestigeType);
  shuffle(storyType);
  // e.g. USA_HighP_Muki
  sample1 = experimentLocation + "_" + prestigeType[0] + "_" + storyType[0];
  sample2 = experimentLocation + "_" + prestigeType[1] + "_" + storyType[1];


}

function clearScreen(){
	hideMe("surveyContainer");
	hideMe("playStoryContainer");
	hideMe("recorderContainer");
  hideMe("distractionTaskContainer");
  hideMe("loader");
  hideMe("techTest");

}

// START THE EXPERIMENT
$( document ).ready(function() {
  clearScreen();
  $.getScript("../survey/SURVEY_consent.js");
  $.getScript("../survey/SURVEY_localisation.js");
  $.getScript("../survey/SURVEY_demography_USA.js");
  // the last survey to be loaded should call surveysLoaded() to start the experiment
  $.getScript("../survey/SURVEY_demography_UK.js",surveysLoaded());
});

function surveysLoaded(){
  setTimeout("nextStage();",1000);
}