// Functions to do the recordings

// initRecorder() : Grab the user's mic
// startRecording() : set the recorder going
// stopRecording() : Calls the exportWav() function from *recordmp3.js*
//   recordmp3::exportWav() sends a message to the recorderWorker, calling recorderWorker::exportWAV
//   recorderWorker::exportWAV : converts the sample rates, encodes to PCM, 
//       Then it posts the data back, triggering recordmp3::worker.onmessage, 
//   recordmp3::worker.onmessage : optinally converts to mp3 then calls recordmp3::uploadAudio()

  var waitingForUploadIntervalTime = 1000;
  var waitingForUploadTimeWaiting = 0;
  var waitingForUploadTimeout = 120000;
  var asynchronousUploading = true;  
  var allowMultipleRecordingSessions = true; // per story  

  var blinkLightIntervalID = null;
  var blinkLightStage = -1;


function __log(e, data) {
    console.log(e + " " + (data || ''));
  }

  var audio_context;
  var recorder;
  var currentStorySample = "";
  var recordingOutputSampleRate = 32000;

  var numberOfSuccessfulUploads = 0;

  var testRecording = false;

  var multipleRecordingRound = 1;

  // assuming only one test of uploading at the end.
  var waitingForUploadIntervalId;


  // audioSaveType = 'wav' or 'mp3' is set in recordmp3.js

  function showRecordingControls(storySample){
    currentStorySample = storySample;
    multipleRecordingRound = 1;
    document.getElementById("startRecordingButton").innerHTML="Start Recording";
    document.getElementById("startRecordingButton").disabled=false;
    document.getElementById("stopRecordingButton").disabled=true;
    document.getElementById("startRecordingButton").className="btn btn-success active";
    document.getElementById("stopRecordingButton").className="btn btn-danger disabled";
    setInstruction(recordingInstructionText);
    showMe("recorderContainer");
    hideMe("multipleRecordingsDiv");
  }

  function startUserMedia(stream) {

    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.' );
	__log("input sample rate " +input.context.sampleRate);

    // Feedback!
    //input.connect(audio_context.destination);
    __log('Input connected to audio context destination.');

    recorder = new Recorder(input, {
                  numChannels: 1,
                  'data-format': 'wav',
                  //bufferLen: 16384,
                  outputSampleRate: recordingOutputSampleRate,
                  'asynchronousUploading': asynchronousUploading
                });
    __log('Recorder initialised.');
    setTimeout("recorderInitialised(true);",200);
  }

  function startRecording(button) {
    startBlinkLight();
    addToTimeLog("Start recording "+ currentStorySample + " " + multipleRecordingRound);

    document.getElementById("startRecordingButton").disabled=true;
    document.getElementById("stopRecordingButton").disabled=false;
    document.getElementById("startRecordingButton").className="btn btn-success disabled";
    document.getElementById("stopRecordingButton").className="btn btn-danger";
    
    hideMe("multipleRecordingsDiv");

    // can't set filename here, because asynchronous uploading might confuse things
    // so send to upload function
    //recorder.setFilenamePrefix(participantID + "_" + currentStorySample + "_" + multipleRecordingRound);

    recorder && recorder.record();
    button.disabled = true;
    __log('Recording...');
  }

  function stopRecording(button) {
    console.log("STOP RECORDING");
    stopBlinkLight();
    addToTimeLog("Stop recording "+ currentStorySample + " " + multipleRecordingRound);
    recorder && recorder.stop();
    document.getElementById("startRecordingButton").disabled=true;
    document.getElementById("stopRecordingButton").disabled=true;
    document.getElementById("startRecordingButton").className="btn btn-success disabled";
    document.getElementById("stopRecordingButton").className="btn btn-danger disabled";

    hideMe("recorderContainer");  // will be shown again if allowing multiple recordings
    

    // create WAV download link using audio data blob
    //createDownloadLink();

    if(testRecording){
      testRecording = false;
      console.log("starting test recording");
      createDownloadLink();
      recorder.clear();

      setInstruction(micTestText2);
      showMe('testRecorder');
      hideMe('micWorkedButton'); // shown when playing starts
      hideMe('multipleRecordingsDiv');

    } else{

      setInstruction(uploadingText);

      // The function called here executes after sending the export
      // commands to the recorder worker (before upload succeeds and, if mp3, before encoding).  
      // The callback from the upload is handled 
      // by the AJAX 'done' statement in recordmp3.js

      //TODO: pass filename
      var recordingFilename = participantID + "_" + currentStorySample + "_" + multipleRecordingRound;
      recorder && recorder.exportWAV(function(blob) {}, recordingFilename);

      recorder.clear();


      if(allowMultipleRecordingSessions){
        if(asynchronousUploading){
          setInstruction(continueMultipleRecordingText);
          document.getElementById("startRecordingButton").innerHTML="Continue Recording";
          showMe("recorderContainer");
          document.getElementById("startRecordingButton").disabled=false;
          document.getElementById("stopRecordingButton").disabled=true;
          document.getElementById("startRecordingButton").className="btn btn-success active";
          document.getElementById("stopRecordingButton").className="btn btn-danger disabled";
          showMe("multipleRecordingsDiv");
          multipleRecordingRound += 1;
        }
      } else{
        if(asynchronousUploading){
          setTimeout("nextStage();",100);
        } else{
          // display loader and wait for callback from recorder
          document.getElementById("loader").style.display = 'block';
        }
      }
    }
  }

  function startBlinkLight(){
    if(blinkLightIntervalID != null){
      clearInterval(blinkLightIntervalID);
    }
    blinkLightIntervalID = setInterval("toggleBlinkLight()", 500);
  }

  function stopBlinkLight(){
    if(blinkLightIntervalID != null){
      clearInterval(blinkLightIntervalID);
    }
    document.getElementById("recordingLight").src="../resources/images/RecordingLight_off.png"
  }

  function toggleBlinkLight(){
    blinkLightStage += 1;
    if(blinkLightStage ==2){
      blinkLightStage = -1;
      document.getElementById("recordingLight").src="../resources/images/RecordingLight_off.png";
    } else{
      document.getElementById("recordingLight").src="../resources/images/RecordingLight_on.png";
    }
  }

  function finishedMultipleRecording(button){
    // Participant has indicated that they're done recording their story.
    hideMe("recorderContainer");
    setTimeout("nextStage();",100);
  }

  function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
      console.log("Test callback");
      var url = URL.createObjectURL(blob);
      var au = document.getElementById('testRecorderAudio');
      //var hf = document.createElement('a');

      au.controls = true;
      au.src = url;
      //hf.href = url;
      //hf.download = new Date().toISOString() + '.wav';
      //hf.innerHTML = hf.download;
      //li.appendChild(au);
      //li.appendChild(hf);
      showMe("testRecorder");

      //recorder.clear();
    }, "TestRecording", "audio/wav");
  }

  function controlRecorderFinishedUploading(){

    //  TODO: track number of successful recordings
    numberOfSuccessfulUploads += 1;
    
      // asychronous uploading behaviour is already done by this point.
      console.log("CR Finished");
     
      // If we've been waiting for the upload to finish, move on to the next stage
      // or show the multiple recordings div
      if(!asynchronousUploading){
        hideMe("loader");
        if(allowMultipleRecordingSessions){
          setInstruction(continueMultipleRecordingText);
          showMe("recorderContainer");
          showMe("multipleRecordingsDiv");
          multipleRecordingRound += 1;
        } else{
          setTimeout("nextStage();",100);
        }
      }
    
  }

  //window.onload = function init() {
  function initRecorder() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
      window.URL = window.URL || window.webkitURL;

      audio_context = new AudioContext;
      __log('Audio context set up.');
      __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      __log('No live audio input: ' + e);
      userDeclinedToShareMicrophone();
    });
  };


  function checkRecordingsHaveUploaded(){
    if(asynchronousUploading){
      
      if(numberOfSuccessfulUploads >= numberOfRecordedSamples){
        setTimeout("nextStage()",200);
      } else{
        waitForUploads();
      }

    } else{
      // no need to check, just move on
      setTimeout("nextStage()",200);
    }
  }

  function waitForUploads(){
    document.getElementById("loader").style.display = 'block';
    setInstruction(uploadingText);
    waitingForUploadTimeWaiting = 0;
    waitingForUploadIntervalId = setInterval("checkUploaded()",1000);
  }

  function checkUploaded(){
    console.log("cheking uploads: Uploaded " + numberOfSuccessfulUploads + "out of " +numberOfRecordedSamples);
    if(numberOfSuccessfulUploads >= numberOfRecordedSamples){
      clearInterval(waitingForUploadIntervalId);
      setTimeout("nextStage()",200);
    } else{
      waitingForUploadTimeWaiting += waitingForUploadIntervalTime;
      if(waitingForUploadTimeWaiting>=waitingForUploadTimeout){
        setTimeout("nextStage()",200);
      }
    }
  }