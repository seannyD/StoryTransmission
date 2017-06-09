//TODO: record browser type, location of country


// Define and keep track of order of stages

var experimentLocation = "USA";  // changed by localisation survey
var sample1 = "";
var sample2 = "";
var numberOfRecordedSamples = 0; // increased every time a recording is called

var startTime = getCurrentTime();

var participantID = "";

var workerCode = "";
var progressBar = true;

// these are shuffled below
var prestigeType = ["HighP","LowP"];
var storyType    = ["Muki","Taka"];
var speechEvaluationOrder = ["HighP","LowP"];

var stages = [
      "consent",
      "speakerTest",
      "techTest",
      "micTest",
      "localisation",  
			'story1','distraction1','recording1',
			'story2','distraction2','recording2',
      'speechEvaluation1.play','speechEvaluation1.eval',
      'speechEvaluation2.play','speechEvaluation2.eval',
			'demographySurvey','checkUploaded','workerCode'];
      // TODO: I give my consent to use this data ...
      // TODO: check country ip address

var stagesLabels = {"consent":"Consent >",
                    "speakerTest": "Sound setup >",
                    "techTest": "Sound setup >",
                    "micTest": "Sound setup >",
                    "localisation": "Location >",
                    'story1': "Story 1 >",
                    'distraction1': "Memory test >",
                    'recording1': "Recording 1 >",
                    'story2':"Story 2 >",
                    'distraction2':"Memory test >",
                    'recording2': "Recording 2 >",
                    'speechEvaluation1.play':"Survey 1 >",
                    'speechEvaluation1.eval':"Survey 1 >",
                    'speechEvaluation2.play':"Survey 2 >",
                    'speechEvaluation2.eval':"Survey 2 >",
                    'demographySurvey':"Survey 3 >",
                    'checkUploaded':"Upload results >",
                    'workerCode':"Worker Code"
                    }

//stages = ["localisation", 'demographySurvey','workerCode'];

var stageCounter = -1;


function nextStage(){
  console.log("Next Stage");
	clearScreen();
  setInstruction("");

	stageCounter += 1;

  if(stageCounter >= stages.length){
    showWorkerCode(); // by default, end the experiment nicely!
  } else{

  if(progressBar){
    document.getElementById(stagesLabels[stages[stageCounter]]+"_Progress").style.background="#5cb85c";
    document.getElementById(stagesLabels[stages[stageCounter]]+"_Progress").style.color="#FFFFFF";
  }

	switch (stages[stageCounter]) {
                case "consent":
                  setInstruction("<h1>The effects of social transmission biases on human cultural evolution</h1>");
                  launchSurvey(consentSurvey);
                  break;
                case "speakerTest":
                  doSpeakerTest();
                  break;
                case "techTest":
                  hideMe("testDiv");
                  doTechTest();
                  break;
                case "micTest":
                  doMicTest();
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
                  testRecording = false;
                  numberOfRecordedSamples += 1;
                  showRecordingControls(sample1);
                  break;
                case "recording2":
                  testRecording = false;
                  numberOfRecordedSamples += 1;
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
                default:
                  showWorkerCode(); // by default, end the experiment nicely!
                  break;
                }
  }
}


function setExperimentParameters(loc){
	experimentLocation = loc;
	chooseStimuli();

  participantID = loc+"_"+new Date().getTime();
  workerCode = "TRANSMISSION_" + Math.round(Math.random()*1000000);
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
  if(useTrashcan){
    hideMe("trash");
  }
  hideMe("loader");
  hideMe("techTest");
  hideMe("testRecorder");
  hideMe("SpeakerTest");

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

  preloadGridImages();
  makeProgressBar();

});

function surveysLoaded(){
  setTimeout("nextStage();",1000);
  var urlvars = getUrlVars();
  if(urlvars["test"]){
    showMe("testDiv");
    document.getElementById("stagesText").value = stages;
  }
}


function makeProgressBar(){
  if(progressBar){
    var numUniqueStagesLabels = 0;
    for(var i=0; i< stages.length; ++i){
      if(i==0 || stagesLabels[stages[i]] != stagesLabels[stages[i-1]]){
        numUniqueStagesLabels += 1;
      }
    }
    var divPer = 100/numUniqueStagesLabels;
    var out = "";
    for(var i=0; i< stages.length; ++i){
        if(i==0 || stagesLabels[stages[i]] != stagesLabels[stages[i-1]]){
          out += '<div id="' + stagesLabels[stages[i]] +'_Progress" class="progressBar" style="float:left;width:' + divPer+'%">' + stagesLabels[stages[i]] + '</div>';
        }      
    }
    document.getElementById("progressBarContainer").innerHTML = out;
  }
}


// -------------------
//   For testing

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function startTestRun(){
    console.log("Test run");
    stageCounter = -1;
    var tx = document.getElementById("stagesText").value;
    stages = tx.split(",");

    makeProgressBar();

    asynchronousUploading = document.getElementById("asynchronousCheck").checked;
    if(document.getElementById("mp3Check").checked){
      audioSaveType = "mp3";
    } else{
      audioSaveType = "wav";
    }

  recordingOutputSampleRate = parseInt(document.getElementById("sampleRate").value);


  NumSymbolsObserved = parseInt(document.getElementById("NumSymbolsObserved").value);
  NumberOfRounds = parseInt(document.getElementById("NumberOfRounds").value);
  selectGridColumns = parseInt(document.getElementById("selectGridColumns").value);
  displayGridColumns = parseInt(document.getElementById("displayGridColumns").value);
  displayGridRows = parseInt(document.getElementById("displayGridRows").value);
  distractionTaskInstructionTime = parseInt(document.getElementById("distractionTaskInstructionTime").value);
  distractionTaskDisplayTime = parseInt(document.getElementById("distractionTaskDisplayTime").value);
  distractionTaskSelectTime = parseInt(document.getElementById("distractionTaskSelectTime").value);
  distractionTaskFeedbackTime= parseInt(document.getElementById("distractionTaskFeedbackTime").value);



    hideMe("testDiv");
    setTimeout("nextStage();",1000);

}