//TODO: record browser type, location of country


// Define and keep track of order of stages

var experimentLocation = "USA";  // changed by localisation survey
var sample1 = "";
var sample2 = "";
var numberOfRecordedSamples = 2;

var startTime = getCurrentTime();

var participantID = "";

var workerCode = "TRANSMISSION" + new Date().getTime();

// these are shuffled below
var prestigeType = ["HighP","LowP"];
var storyType    = ["Muki","Taka"];
var speechEvaluationOrder = ["HighP","LowP"];

var stages = [
      "consent",
      "techTest",
      "localisation",  
			'story1','distraction1','recording1',
			'story2','distraction2','recording2',
      'speechEvaluation1.play','speechEvaluation1.eval',
      'speechEvaluation2.play','speechEvaluation2.eval',
			'demographySurvey','checkUploaded','workerCode'];
      // TODO: I give my consent to use this data ...
      // TODO: check country ip address

//stages = ["localisation", 'demographySurvey','workerCode'];

var stageCounter = -1;


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
                case "speechEvaluation1.play":
                  speechEvaluation(0);
                  break;
                case "speechEvaluation2.play":
                  speechEvaluation(1);
                  break;
                case "speechEvaluation1.eval":
                  launchSpeechEvaluationSurvey(0);
                  break;
                case "speechEvaluation2.eval":
                  launchSpeechEvaluationSurvey(1);
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

  // for now: just choose randomly
  // careful: presitgeType is used by other functions
  shuffle(prestigeType);
  shuffle(storyType);
  // e.g. USA_HighP_Muki
  sample1 = experimentLocation + "_" + prestigeType[0] + "_" + storyType[0];
  sample2 = experimentLocation + "_" + prestigeType[1] + "_" + storyType[1];

  shuffle(speechEvaluationOrder);

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
  $.getScript("../survey/SURVEY_speechEvaluation.js");
  $.getScript("../survey/SURVEY_consent.js");
  $.getScript("../survey/SURVEY_localisation.js");
  $.getScript("../survey/SURVEY_demography_USA.js");
  // the last survey to be loaded should call surveysLoaded() to start the experiment
  $.getScript("../survey/SURVEY_demography_UK.js",surveysLoaded());
});

function surveysLoaded(){
  setTimeout("nextStage();",1000);
}