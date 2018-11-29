
// Define and keep track of order of stages

var experimentLocation = "USA";  // changed by localisation survey
var sample1 = "";
var sample2 = "";
var numberOfRecordedSamples = 0; // increased every time a recording is called

var browser = "Firefox";
var os = "MacIntel";
var browserCanAutoplay = false;  // tested later

var startTime = getCurrentTime();

var timeLog = [];
var fileLog = []; //log of files and locations on server
addToTimeLog("Page Load");

var participantID = "";

var workerCode = "";
var MTWorkerData = {};
var prolificParticipant = false;
var prolific_pid = "";
var prolific_session_id = "";

var progressBar = true;

// these are shuffled below
var prestigeType = ["HighP","LowP"];
var storyType    = ["Muki","Taka"];
var speechEvaluationOrder = ["HighP","LowP"];

var stages = [
      "consent",
      "browserTest",  // now later so we can test the autoplay
      "speakerTest",
      "techTest",
      "micTest",
      "localisation",  
			'story1','distraction1','recording1',
      'prestory2',
			'story2','distraction2','recording2',
      //'speechEvaluation1.play','speechEvaluation1.eval',
      //'speechEvaluation2.play','speechEvaluation2.eval',
      'speechEvaluation1.playAndEval',
      'speechEvaluation2.playAndEval',
			'demographySurvey','checkUploaded','workerCode'];
      // TODO: I give my consent to use this data ...
      // TODO: check country ip address

var stagesLabels = {"consent":"Consent >",
                    "speakerTest": "Sound setup >",
                    "techTest": "Sound setup >",
                    "micTest": "Sound setup >",
                    "localisation": "Location >",
                    'story1': "Story 1 >",
                    'distraction1': "Memory test 1 >",
                    'recording1': "Recording 1 >",
                    'prestory2':"Story 2 >",
                    'story2':"Story 2 >",
                    'distraction2':"Memory test 2 >",
                    'recording2': "Recording 2 >",
                    'speechEvaluation1.play':"Speech evaluation >",
                    'speechEvaluation1.eval':"Speech evaluation >",
                    'speechEvaluation2.play':"Speech evaluation >",
                    'speechEvaluation2.eval':"Speech evaluation >",
                    'speechEvaluation1.playAndEval':"Speech evaluation >",
                    'speechEvaluation2.playAndEval':"Speech evaluation >",
                    'demographySurvey':"About you >",
                    'checkUploaded':"Upload results >",
                    'workerCode':"Worker Code",
                    'qualifyingSurvey':"Survey >",
                    'qualifyingWorkerCode':"Worker Code",
                    'qualifyingConsent':"Consent >",
                    'browserTest':"Consent >",
                    "storyOrderConsent": "Consent >",
                    "storyOrderConsentStage3": "Consent >",
                    'storyOrderInstructions':"Instructions >",
                    'storyOrderInstructionVideo':"Instructions >",
                    'storyOrder':"Story Cards >",
                    'WriteStoryFromOrder':"Write story >",
                    "selectMostImportantScene":"Importance >",
                    "storyOrderPreSecondStageInstructions":"Story task >",
                    "storyOrderEndSurvey":"Survey >",
                    "storyOrderFinish":"Upload results >",
                    "storyOrderEnterParticipantID":"Consent >"
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

  addToTimeLog(stages[stageCounter]);

	switch (stages[stageCounter]) {

      case "consent":
        setInstruction(consentText);
        break;
      case "qualifyingConsent":
        //setInstruction("<h1>Qualifying Task</h1>");
        //launchSurvey(qualifyingConsentSurvey);
        setInstruction(qualifyingConsentText);
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
      case "prestory2":
        showPreStory2();
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
      case "speechEvaluation1.playAndEval":
        playAndEvaluation(0);
        break;
      case "speechEvaluation2.playAndEval":
        playAndEvaluation(1);
        break;
      case "demographySurvey":
        launchDemographySurvey();
        break;
      case "checkUploaded":
        saveTimeLog();
        saveFileLog();
        checkRecordingsHaveUploaded();
        break;
      case "workerCode":
        showWorkerCode();
        break;
      case "qualifyingSurvey":
        launchQualifyingSurvey();
        break;
      case "qualifyingWorkerCode":
        showQualifyingWorkerCode();
        break;
      case "browserTest":
        testBrowser();
        break;
      case "storyOrderConsent":
        setInstruction(storyOrderConsentText.replace("PARTICIPANT_ID_HERE",participantID));
        launchStoryOrderConsentSurvey();
        break;
      case "storyOrderConsentStage3":
        setInstruction(storyOrderPhase3ConsentText.replace("PARTICIPANT_ID_HERE",participantID));
        launchStoryOrderConsentSurvey();
        break;
      case "storyOrderEnterParticipantID":
        storyOrderAskForParticipantID();
        break;
      case "storyOrderInstructions":
        showStoryOrderInstructions();
        break;
      case "storyOrderInstructionVideo":
        playStoryOrderVideo();
        break;
      case "storyOrder":
        startStoryOrder();
        break;
      case "WriteStoryFromOrder":
        initialiseStoryOrderTellStory();
        break;
      case "selectMostImportantScene":
        initialiseSelectMostImportantScene();
        break;
      case "storyOrderPreSecondStageInstructions":
        setInstruction(storyOrderPreSecondStageInstructions);
        setTimeout("addNextButtonToInstructions()",20000);  // code in this file below
        break;
      case "storyOrderEndSurvey":
        launchSurvey(storyOrderEndSurveyJSON,finishStoryOrderEndSurveyJSON);
        break;
      case "storyOrderFinish":
        var sofi = storyOrderFinishInstruction.replace("PARTICIPANT_ID_HERE",participantID);
        var urlvars = getUrlVars();
        if(urlvars["storyOrderPhase3"]){
          sofi = storyOrderPhase3FinishInstruction.replace("PARTICIPANT_ID_HERE",participantID);
        }
        setInstruction(sofi);
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
  hideMe("playEvalContainer");
  hideMe("StoryOrderInstructions");
  hideMe("StoryOrder");
  hideMe("WriteStoryFromOrder");
  hideMe("selectMostImportantStoryOrder");
}

// START THE EXPERIMENT
$( document ).ready(function() {
  clearScreen();
  preloadGridImages();

  setBrowserSpecificSettings();

  // test if we can play videos
  //detect_autoplay(300);
  browserCanAutoplay = false; // instruction will display

  var urlvars = getUrlVars();

  if(urlvars["storyOrder"] || urlvars["storyOrderPhase3"]){
    // This is a story order experiment (experiment 2)
    // For sortable story cards (safe to call if none in html)
    initialiseStoryOrder();
    console.log("Loading story order experiment");

    if(urlvars["storyOrder"]){
      stages = [
          "storyOrderConsent",
          "storyOrderInstructions",
          "storyOrderInstructionVideo",
          "storyOrder",
          "WriteStoryFromOrder",
          "selectMostImportantScene",
          "storyOrderPreSecondStageInstructions",
          'storyOrderEndSurvey','checkUploaded','storyOrderFinish'
      ];
    }

    if(urlvars["storyOrderPhase3"]){
      stages = [
          "storyOrderEnterParticipantID",
          "storyOrderConsentStage3",
          "storyOrderInstructions",
          "storyOrderInstructionVideo",
          "storyOrder",
          "WriteStoryFromOrder",
          "selectMostImportantScene",
          'storyOrderEndSurvey','checkUploaded','storyOrderFinish'
      ];
    }

    setStoryOrderParticipantID();
    experimentLocation = "UK";

    $.getScript("../survey/storyOrderSurveys/SURVEY_consent.js");
    $.getScript("../survey/SURVEY_localisation.js");
    $.getScript("../survey/storyOrderSurveys/SURVEY_demography_USA.js");
    $.getScript("../survey/storyOrderSurveys/SURVEY_demography_UK.js");
    $.getScript("../survey/storyOrderSurveys/SURVEY_endSurvey.js");
    $.getScript("../survey/storyOrderSurveys/SURVEY_consent.js",surveysLoaded());
  } else{
      // This is the original recorded voice story telling experiment
      $.getScript("../survey/SURVEY_speechEvaluation.js");
      $.getScript("../survey/SURVEY_consent.js");
      $.getScript("../survey/SURVEY_localisation.js");
      $.getScript("../survey/SURVEY_demography_USA.js");
      $.getScript("../survey/SURVEY_qualifying.js");
      $.getScript("../survey/SURVEY_qualifyingConsent.js");
      // the last survey to be loaded should call surveysLoaded() to start the experiment
      $.getScript("../survey/SURVEY_demography_UK.js",surveysLoaded());
  }

  makeProgressBar();



});

function surveysLoaded(){
  
  var urlvars = getUrlVars();

  //  MECHANICAL TURK DATA
  //  https://tictactoe.amazon.com/gamesurvey.cgi?gameid=01523
  //  &assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE
  //  &hitId=123RVWYBAZW00EXAMPLE
  //  &turkSubmitTo=https://www.mturk.com/
  //  &workerId=AZ3456EXAMPLE
  MTWorkerData["MT_assignmentId"] = urlvars["assignmentId"] || "";
  MTWorkerData["MT_hitId"] = urlvars["hitId"] || "";
  MTWorkerData["MT_workerId"] = urlvars["workerId"] || "";
  console.log(MTWorkerData);

  if(urlvars["prolific_pid"]){
    prolificParticipant = true;
    prolific_pid = urlvars["prolific_pid"];
    prolific_session_id = urlvars["session_id"] || "";
  }

  if(urlvars["test"]){
    showMe("testDiv");
    document.getElementById("stagesText").value = stages;
  }
  if(urlvars["stages"]){
    document.getElementById("stagesText").value = urlvars["stages"];
    startTestRun();
  } else{
    if(urlvars["qualify"]){
      startQualifyingExperiment();
    }
    setTimeout("nextStage();",3000);
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


function addNextButtonToInstructions(){
  document.getElementById("instructions").innerHTML += '<br /><button onclick="nextStage()" class="btn btn-success">Continue</button>';
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

  for(var i=0; i<numStimuli;++i){
      selectStimOrder.push(i);
    }
    // randomise once, so it remains the same throughout the experiment
    shuffle(selectStimOrder);

    hideMe("testDiv");
    setTimeout("nextStage();",1000);

}


// --------
// Time log

function addToTimeLog(message){
  timeLog.push([message, getCurrentTime()]);
}

function saveTimeLog (){
  var out = "participantId,Message,Time\n";
  for(var i=0;i<timeLog.length; ++i){
    out += participantID + "," + timeLog[i].join(",")+"\n";
  }


  
  var fd = new FormData();
 // var filename = participantID  + '_timeLog.csv';
  
  //fd.append('fname', filename);
  fd.append('data', out);
  fd.append('filetype','timelog');
  fd.append("id", participantID+"_Time_");
  $.ajax({
    type: 'POST',
    url: uploadSurveyPHPLocation,
    data: fd,
    processData: false,
    contentType: false
  }).done(function(data) {
    var bits = data.split(";");
    if(bits.length==2){
      addToFileLog(bits[0],bits[1]);
    }
  });

}

// ------
// FileLog
function addToFileLog(filetype, filename){
  console.log("File Log "+filetype + ":"+filename);
  fileLog.push([filetype,filename,getCurrentTime()]);
}

function saveFileLog(){
  var out = "participantID,filetype,filename,time\n";
  for(var i=0;i<fileLog.length; ++i){
    out += participantID + "," + fileLog[i].join(",")+"\n";
  }
  var fd = new FormData();

  fd.append('data', out);
  fd.append('filetype','filelog');
  fd.append("id","fileLog");
  $.ajax({
    type: 'POST',
    url: uploadSurveyPHPLocation,
    data: fd,
    processData: false,
    contentType: false
  }).done(function(data) {
    console.log(data);
  });
}


// ---------------
// Window Handling

$(window).blur(function(e) {
    // Do Blur Actions Here
    addToTimeLog("Participant blur window " + stages[stageCounter]);
});
$(window).focus(function(e) {
    // Do Focus Actions Here
    addToTimeLog("Participant focus window " + stages[stageCounter]);
});


window.onbeforeunload = function (e) {

   var askBeforeLoading = true;
   if(stageCounter==0){
    askBeforeLoading = false;
   }
   if(stages[stageCounter]=="workerCode"){
       askBeforeLoading = false;
   }
   if(stages[stageCounter]=="qualifyingWorkerCode"){
       askBeforeLoading = false;
   }
   if(stageCounter>=stages.length){
       askBeforeLoading = false;
   }
   if(stages[stageCounter]=="browserTest"){
      askBeforeLoading = false;  
   }
   

   if(askBeforeLoading){
        e = e || window.event;

        // For IE and Firefox prior to version 4
        if (e) {
            e.returnValue = 'You have not completed the experiment, are you sure you want to close this window?';
        }

        // For Safari
        return 'You have not completed the experiment, are you sure you want to close this window?';
     }
   
};


// ------
// Chrome/ Firefox differences

function setBrowserSpecificSettings(){
  browser = getBrowser();
  console.log("Browser: "+browser);
  if(browser=="Chrome"){
    participantDeclinedToShareMicrophoneText = participantDeclinedToShareMicrophoneTextChrome;
    techWarning = techWarningChrome;
  }
}

function getBrowser(){
    // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]" 
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;

  var browser = "Other";
  if(isFirefox){
    browser = "Firefox";
  }
  if(isChrome){
    browser = "Chrome";
  }
  return(browser);
}

function detect_autoplay(acceptable_delay){

    browserCanAutoplay = false;  

    var autoplay_test_content = document.createElement('video');

   //create mp4 and webm sources, 5s long
        var mp4 = document.createElement('source');
        mp4.src = "data:video/mp4;base64,AAAAFGZ0eXBNU05WAAACAE1TTlYAAAOUbW9vdgAAAGxtdmhkAAAAAM9ghv7PYIb+AAACWAAACu8AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAnh0cmFrAAAAXHRraGQAAAAHz2CG/s9ghv4AAAABAAAAAAAACu8AAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAFAAAAA4AAAAAAHgbWRpYQAAACBtZGhkAAAAAM9ghv7PYIb+AAALuAAANq8AAAAAAAAAIWhkbHIAAAAAbWhscnZpZGVBVlMgAAAAAAABAB4AAAABl21pbmYAAAAUdm1oZAAAAAAAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAVdzdGJsAAAAp3N0c2QAAAAAAAAAAQAAAJdhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAFAAOABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAEmNvbHJuY2xjAAEAAQABAAAAL2F2Y0MBTUAz/+EAGGdNQDOadCk/LgIgAAADACAAAAMA0eMGVAEABGjuPIAAAAAYc3R0cwAAAAAAAAABAAAADgAAA+gAAAAUc3RzcwAAAAAAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAADgAAAAEAAABMc3RzegAAAAAAAAAAAAAADgAAAE8AAAAOAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAADQAAAA4AAAAOAAAAFHN0Y28AAAAAAAAAAQAAA7AAAAA0dXVpZFVTTVQh0k/Ou4hpXPrJx0AAAAAcTVREVAABABIAAAAKVcQAAAAAAAEAAAAAAAAAqHV1aWRVU01UIdJPzruIaVz6ycdAAAAAkE1URFQABAAMAAAAC1XEAAACHAAeAAAABBXHAAEAQQBWAFMAIABNAGUAZABpAGEAAAAqAAAAASoOAAEAZABlAHQAZQBjAHQAXwBhAHUAdABvAHAAbABhAHkAAAAyAAAAA1XEAAEAMgAwADAANQBtAGUALwAwADcALwAwADYAMAA2ACAAMwA6ADUAOgAwAAABA21kYXQAAAAYZ01AM5p0KT8uAiAAAAMAIAAAAwDR4wZUAAAABGjuPIAAAAAnZYiAIAAR//eBLT+oL1eA2Nlb/edvwWZflzEVLlhlXtJvSAEGRA3ZAAAACkGaAQCyJ/8AFBAAAAAJQZoCATP/AOmBAAAACUGaAwGz/wDpgAAAAAlBmgQCM/8A6YEAAAAJQZoFArP/AOmBAAAACUGaBgMz/wDpgQAAAAlBmgcDs/8A6YEAAAAJQZoIBDP/AOmAAAAACUGaCQSz/wDpgAAAAAlBmgoFM/8A6YEAAAAJQZoLBbP/AOmAAAAACkGaDAYyJ/8AFBAAAAAKQZoNBrIv/4cMeQ==";

        var webm = document.createElement('source');
        webm.src = "data:video/webm;base64,GkXfo49CgoR3ZWJtQoeBAUKFgQEYU4BnAQAAAAAAF60RTZt0vE27jFOrhBVJqWZTrIIQA027jFOrhBZUrmtTrIIQbE27jFOrhBFNm3RTrIIXmU27jFOrhBxTu2tTrIIWs+xPvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFUmpZuQq17GDD0JATYCjbGliZWJtbCB2MC43LjcgKyBsaWJtYXRyb3NrYSB2MC44LjFXQY9BVlNNYXRyb3NrYUZpbGVEiYRFnEAARGGIBc2Lz1QNtgBzpJCy3XZ0KNuKNZS4+fDpFxzUFlSua9iu1teBAXPFhL4G+bmDgQG5gQGIgQFVqoEAnIEAbeeBASMxT4Q/gAAAVe6BAIaFVl9WUDiqgQEj44OEE95DVSK1nIN1bmTgkbCBULqBPJqBAFSwgVBUuoE87EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9DtnVB4eeBAKC4obaBAAAAkAMAnQEqUAA8AABHCIWFiIWEiAICAAamYnoOC6cfJa8f5Zvda4D+/7YOf//nNefQYACgnKGWgQFNANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQKbANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQPoANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQU1ANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQaDANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQfQANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQkdANEBAAEQEBRgAGFgv9AAIiGAAPuC/rOgnKGWgQprANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQu4ANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQ0FANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQ5TANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQ+gANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgRDtANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgRI7ANEBAAEQEAAYABhYL/QACIhgAPuC/rIcU7trQOC7jLOBALeH94EB8YIUzLuNs4IBTbeH94EB8YIUzLuNs4ICm7eH94EB8YIUzLuNs4ID6LeH94EB8YIUzLuNs4IFNbeH94EB8YIUzLuNs4IGg7eH94EB8YIUzLuNs4IH0LeH94EB8YIUzLuNs4IJHbeH94EB8YIUzLuNs4IKa7eH94EB8YIUzLuNs4ILuLeH94EB8YIUzLuNs4INBbeH94EB8YIUzLuNs4IOU7eH94EB8YIUzLuNs4IPoLeH94EB8YIUzLuNs4IQ7beH94EB8YIUzLuNs4ISO7eH94EB8YIUzBFNm3SPTbuMU6uEH0O2dVOsghTM";

   //append sources to test video 
        autoplay_test_content.appendChild(webm);
        autoplay_test_content.appendChild(mp4);

  //set attributes -needs to be visible or IE squawks, so we move it way outside  
    autoplay_test_content.id = "base64_test_video";
    autoplay_test_content.autoplay = true;
    autoplay_test_content.style.position = "fixed";
    autoplay_test_content.style.left = "5000px";

  //add to DOM       
    document.getElementsByTagName("body")[0].appendChild(autoplay_test_content);


    var base64_test_video = document.getElementById("base64_test_video");

  //test for autoplay, 100 ms buffer   
    setTimeout(function(){
        if(!base64_test_video.paused){
            console.log("Autoplay enabled");
            browserCanAutoplay = true;
        }
    },acceptable_delay);

}





function testBrowser(){
  
  try{
    os = navigator["platform"];
  } catch(err){
    os = "NA";
  }

  var br = getBrowser();
  console.log("Detected Browser"+br);
  if(br=="Other"){
    setInstruction(browserFailText);
  } else{
    if(!browserCanAutoplay){
      setInstruction(addonWarningText);
    } else{
      // Everything's fine, let's carry on ...
      setTimeout("nextStage()",100);
    }
  }
}


