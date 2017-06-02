// Functions to do the recordings

function __log(e, data) {
    console.log(e + " " + (data || ''));
  }

  var audio_context;
  var recorder;
  var currentStorySample = "";

  var numberOfSuccessfulUploads = 0;

// Asynchronous uploading is not yet tested.
  var asynchronousUploading = true;
  // assuming only one test of uploading at the end.
  var waitingForUploadIntervalId;
  var waitingForUploadIntervalTime = 1000;
  var waitingForUploadTimeWaiting = 0;
  var waitingForUploadTimeout = 120000;

  // audioSaveType = 'wav' or 'mp3' is set in recordmp3.js

  function showRecordingControls(storySample){
    currentStorySample = storySample;
    document.getElementById("startRecordingButton").disabled=false;
    document.getElementById("stopRecordingButton").disabled=true;
    setInstruction(recordingInstructionText);
    showMe("recorderContainer");
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
                  'asynchronousUploading': asynchronousUploading//,
                  //sampleRate: 4410,
                  //bitsPerSample: 32
                });
    __log('Recorder initialised.');
    setTimeout("recorderInitialised(true);",200);
  }

  function startRecording(button) {
    document.getElementById("startRecordingButton").disabled=true;
    document.getElementById("stopRecordingButton").disabled=false;

    recorder.setFilenamePrefix(participantID + "_" + currentStorySample);

    recorder && recorder.record();
    button.disabled = true;
    __log('Recording...');
  }

  function stopRecording(button) {
    console.log("STOP RECORDING");
    recorder && recorder.stop();
    document.getElementById("startRecordingButton").disabled=true;
    document.getElementById("stopRecordingButton").disabled=true;
    __log('Stopped recording.');
    hideMe("recorderContainer");

    // create WAV download link using audio data blob
    //createDownloadLink();

    setInstruction(uploadingText);
    document.getElementById("loader").style.display = 'block';

    // The function called here executes after sending the export
    // commands to the recorder worker (before upload succeeds and, if mp3, before encoding).  
    // The callback from the upload is handled 
    // by the AJAX 'done' statement in recordmp3.js
    recorder && recorder.exportWAV(function(blob) {
      //if(asynchronousUploading){
      //  setTimeout("nextStage();",100); 
      //}
    });

    recorder.clear();

    if(asynchronousUploading){
      setTimeout("nextStage();",100);
    }
  }

  function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
      /*var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');

      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);*/
    });
  }

  function controlRecorderFinishedUploading(){
    // asychronous uploading behaviour is already done by this point.
    console.log("CR Finished");
    numberOfSuccessfulUploads += 1;
    // If we've been waiting for the upload to finish, move on to the next stage
    if(!asynchronousUploading){
      hideMe("loader");
      setTimeout("nextStage();",100);
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
    setInstruction("Uploading data, please wait ...");
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