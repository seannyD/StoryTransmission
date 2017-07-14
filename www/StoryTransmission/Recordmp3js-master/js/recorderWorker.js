var recLength = 0;
var recBuffers = [];
var sampleRate;
var outputSampleRate;
var numChannels;


//var maxRecordingBufferLength = 11600000;
var maxRecordingBufferLength = 1160000;

this.onmessage = function(e){
  switch(e.data.command){
    case 'init':
      init(e.data.config);
      break;
    case 'record':
      record(e.data.buffer);
      break;
    case 'exportWAV':
      exportWAV(e.data.type, e.data.fileName);
      break;
    case 'getBuffer':
      getBuffer();
      break;
    case 'clear':
      clear();
      break;
  }
};

function init(config){
  sampleRate = config.sampleRate;
  outputSampleRate = config.outputSampleRate || sampleRate;
  numChannels = config.numChannels;
  initBuffers();
  importScripts('../resampler.js');
}

function record(inputBuffer){
  for (var channel = 0; channel < numChannels; channel++){
    recBuffers[channel].push(inputBuffer[channel]);
  }
  recLength += inputBuffer[0].length;
  // if(multiStageRecordings){
  //   if(recLength >=multiStageRecordingLength){
  //     setTimeout("stopAndStart()",1);
  //   }
  // }
}

// function stopAndStart(){
//     console.log("Stop and start");
//     var recLengthCopy = recLength;
//     var recBuffersCopy = [[]];
//     for(var i=0;i<recBuffers[0].length;++i){
//       recBuffersCopy[0].push(recBuffers[0][i]);
//     }
//     recLength = 0;
//     recBuffers = [[]];
    
//     //addToTimeLog("Stop recording (halfway) "+ currentStorySample + " " + multipleRecordingRound);
//     //var recordingFilename = participantID + "_" + currentStorySample + "_" + multipleRecordingRound;
//     var recordingFilename = "tmp" + Math.floor(Math.random() * (10000));
//     exportWAV2(function(blob) {}, recordingFilename, recBuffersCopy,recLengthCopy);
// }

function exportWAV(type, filename){
  
  // var buffers = [];
  // for (var channel = 0; channel < numChannels; channel++){
  //   buffers.push(mergeBuffers(recBuffers[channel], recLength));
  // }
  // if (numChannels === 2){
  //     var interleaved = interleave(buffers[0], buffers[1]);
  // } else {
  //     var interleaved = buffers[0];
  // }

  var interleaved = mergeBuffers(recBuffers[0], recLength);



  if(outputSampleRate < sampleRate || interleaved.length > maxRecordingBufferLength){
    // Resample at a lower rate

    var thisResampleRate = outputSampleRate;
    if(interleaved.length > maxRecordingBufferLength){
      // mp3 encoder can handle about 11 million samples, after that it fails.  
      // So let's adjust the sample rate so that the recording fits

      // work out new sample rate so that the final length is maxRecordingBufferLength
       thisResampleRate = Math.floor(sampleRate * (maxRecordingBufferLength/interleaved.length))
    }
    //addToFileLog("Resampled to "+thisResampleRate,filename);
    console.log("Resampling to "+thisResampleRate+"Hz");
    // set up a resampler
    var resampler = new Resampler(sampleRate, thisResampleRate, numChannels, interleaved);
    // do the resampling (output stored in resampler.outputBuffer)
    resampler.resampler(interleaved.length);

    console.log("Resampled from "+ interleaved.length + "samples to "+ resampler.outputBuffer.length+ "samples");
    var dataview = encodeWAV(resampler.outputBuffer);

    // TODO: Currently passing filename as blob type - should move to passing array
    var audioBlob = new Blob([dataview], { type: filename });
    this.postMessage(audioBlob);
  } else{
    // no resampling
      var dataview = encodeWAV(interleaved);
      var audioBlob = new Blob([dataview], { type: filename});
      this.postMessage(audioBlob);
  }

}


function getBuffer(){
  var buffers = [];
  for (var channel = 0; channel < numChannels; channel++){
    buffers.push(mergeBuffers(recBuffers[channel], recLength));
  }
  this.postMessage(buffers);
}

function clear(){
  recLength = 0;
  recBuffers = [];
  initBuffers();
}

function initBuffers(){
  for (var channel = 0; channel < numChannels; channel++){
    recBuffers[channel] = [];
  }
}

function mergeBuffers(recBuffers, recLength){
  var result = new Float32Array(recLength);
  var offset = 0;
  for (var i = 0; i < recBuffers.length; i++){
    result.set(recBuffers[i], offset);
    offset += recBuffers[i].length;
  }
  return result;
}

function interleave(inputL, inputR){
  var length = inputL.length + inputR.length;
  var result = new Float32Array(length);

  var index = 0,
    inputIndex = 0;

  while (index < length){
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}

function floatTo16BitPCM(output, offset, input){
  for (var i = 0; i < input.length; i++, offset+=2){
    var s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

function writeString(view, offset, string){
  for (var i = 0; i < string.length; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function encodeWAV(samples){
  //console.log("Recorder worker samples");
  //console.log(samples);
  var buffer = new ArrayBuffer(44 + samples.length * 2);
  var view = new DataView(buffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + samples.length * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, numChannels, true);

  /* sample rate */
  view.setUint32(24, outputSampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, outputSampleRate * 4, true);

  /* block align (channel count * bytes per sample) */
  view.setUint16(32, numChannels * 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  floatTo16BitPCM(view, 44, samples);

  return view;
}
