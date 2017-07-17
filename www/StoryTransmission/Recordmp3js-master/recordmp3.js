
var uploadPHPLocation = '../Recordmp3js-master/upload.php';
  //var WORKER_PATH = 'js/recorderWorker.js';
var WORKER_PATH = '../Recordmp3js-master/js/recorderWorker.js';
  //var encoderWorker = new Worker('js/mp3Worker.js');
//var encoderWorker = new Worker('../Recordmp3js-master/js/mp3Worker.js');
var encoderWorker = new Worker('../Recordmp3js-master/js/mp3Worker_2.js');

//encoderWorker.onerror = function (err) {
//    console.log('worker has an error!', err);
//}

var audioSaveType = 'mp3';

var useID3Tags = true;

var currOutputSampleRate;
  
(function(window){
  var Recorder = function(source, cfg){
    var config = cfg || {};
    config['asynchronousUploading']= config['asynchronousUploading'] || false;
    var bufferLen = config.bufferLen || 4096;
    var numChannels = config.numChannels || 2;
    var fileNamePrefix = "audio_sample";

    this.context = source.context;
    this.node = (this.context.createScriptProcessor ||
                 this.context.createJavaScriptNode).call(this.context,
                 bufferLen, numChannels, numChannels);

    var currSampleRate = this.context.sampleRate;
    currOutputSampleRate = currSampleRate;
    if(config.outputSampleRate){
    	if(config.outputSampleRate >0){
    		currOutputSampleRate =  config.outputSampleRate;
    	}
    }
    console.log("Initialising sample rate "+ currSampleRate + ">"+currOutputSampleRate);

    var worker = new Worker(config.workerPath || WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: currSampleRate,
        outputSampleRate: currOutputSampleRate,
        numChannels: numChannels
      }
    });
    var recording = false,
      currCallback;



    this.node.onaudioprocess = function(e){

      if (!recording) return;
      var buffer = [];
      for (var channel = 0; channel < numChannels; channel++){
          buffer.push(e.inputBuffer.getChannelData(channel));
      }

    
      worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    }

    this.configure = function(cfg){
      for (var prop in cfg){
        if (cfg.hasOwnProperty(prop)){
          config[prop] = cfg[prop];
        }
      }
    }

    this.record = function(){
      recording = true;
    }

    this.stop = function(){
      recording = false;
    }

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    }

    this.getBuffer = function(cb) {
      currCallback = cb || config.callback;
      worker.postMessage({ command: 'getBuffer' })
    }

    this.exportWAV = function(cb, recordingFilename, type){
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav'; // if type is not declared, inherits from config or defaults to wav
      var fileName = recordingFilename || "audio_sample";
      console.log("exportWav "+fileName);
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportWAV',
        type: type,
        fileName: fileName
      });
    }

    this.setFilenamePrefix = function(t){
    	// Note that this approach will run into problems if asychronous uploading is possible
    	fileNamePrefix = t;
    }

	
    worker.onmessage = function(e){
      var blob = e.data.blob;
      var fileName = e.data.fileName;  // passing filname by the type string - not good!
      var resampledRate = e.data.resampledRate;

      //var filename = blob.filename;
	  console.log("the blob " +  blob.size + " " + blob.type + " " + fileName);

    if(testRecording){
	/*	var arrayBuffer;
	  	var fileReader = new FileReader();

		fileReader.onload = function(){
			arrayBuffer = this.result;
			var buffer = new Uint8Array(arrayBuffer),
	        data = parseWav(buffer);
			var wavBlob = new Blob([buffer], {type: 'audio/wav'});
			createDownloadLink(wavBlob);
	    }*/
	    console.log("TEST RECORDING");
     } else{
	// Not a test - process the audio and upload to server


	
	
	  var arrayBuffer;
	  var fileReader = new FileReader();
	  fileReader.fileName = fileName;
	  fileReader.resampledRate = resampledRate;

	  fileReader.onload = (function(readerEvt){
		  	var fileName = readerEvt.target.fileName;
		  	var resampledRate = readerEvt.target.resampledRate;
		  	console.log("FileReader "+fileName);
			arrayBuffer = this.result;

	        if(audioSaveType=='wav'){
	        	var buffer = new Uint8Array(arrayBuffer),
	        	data = parseWav(buffer);
				var wavBlob = new Blob([buffer], {type: 'audio/wav'});
				uploadAudio(wavBlob,'wav',fileName);
			} else{
				//Mp3 conversion
				console.log("Converting to Mp3");
				data = parseWav2(new Uint8Array(arrayBuffer))
				// TODO: alter sample rate to output sample rate if appropriate
		        encoderWorker.postMessage({ cmd: 'init', fileName: fileName , config:{
		            mode : 3,
					channels:1,
					samplerate: data.sampleRate,
					bitrate: data.bitsPerSample
		        }});


		        encoderWorker.onmessage = function(e) {
		            if (e.data.cmd == 'data') {

						console.log("Done converting to Mp3 " + e.data.fileName);
						

						/*var audio = new Audio();
						audio.src = 'data:audio/mp3;base64,'+encode64(e.data.buf);
						audio.play();*/

						//console.log ("The Mp3 data " + e.data.buf);
						var mp3Blob = null;
						// check if we want to use ID3 tags
						// and if ID3Writer is actually available
						if(useID3Tags && typeof ID3Writer === "function"){
							console.log("converting to ID3:" + e.data.fileName);
							// TODO: Check that ID3Writer is available.
							console.log(typeof e.data.buf[0]);
							console.log(e.data.buf.length);

							var recL = 0;
							for(var i=0;i<e.data.buf.length;++i){
								recL += e.data.buf[i].length;
							}

							// The id3 writer expects a single array, not a list of arrays
							// so merge them here
							var bufferx = new Int8Array(recL);
							var offset = 0;
							  for (var i = 0; i < e.data.buf.length; i++){
							    bufferx.set(e.data.buf[i], offset);
							    offset += e.data.buf[i].length;
							  }
							const writer = new ID3Writer(bufferx);
							writer.setFrame('TIT2', e.data.fileName);
							writer.addTag();
							var mp3Blob = writer.getBlob();

						} else{
							//mp3Blob = new Blob([new Uint8Array(e.data.buf)], {type: 'audio/mp3'});
							mp3Blob = new Blob(e.data.buf, {type: 'audio/mp3'});
						}
						uploadAudio(mp3Blob,'mp3',e.data.fileName);

						// var url = 'data:audio/mp3;base64,'+encode64(e.data.buf);
						// var li = document.createElement('li');
						// var au = document.createElement('audio');
						// var hf = document.createElement('a');

						// au.controls = true;
						// au.src = url;
						// hf.href = url;
						// hf.download = fileNamePrefix+ '.mp3';
						// hf.innerHTML = hf.download;
						// li.appendChild(au);
						// li.appendChild(hf);
						// recordingslist.appendChild(li);

		            }
		        }
		        // mp3Worker.js must convert to Uint8ArryToFloat32Array first
		        //encoderWorker.postMessage({ cmd: 'encode', buf: Uint8ArrayToFloat32Array(data.samples), fileName: fileName });


		        // mp3Worker_2.js does not need converstion
		        encoderWorker.postMessage({ cmd: 'encode', buf: arrayBuffer, fileName: fileName });
		        //encoderWorker.postMessage({ cmd: 'finish', fileName: fileName});
		        };
			  
		  });
      
	    fileReader.readAsArrayBuffer(blob);
		}

      currCallback(blob);
    }


	function encode64(buffer) {
		var binary = '',
			bytes = new Uint8Array( buffer ),
			len = bytes.byteLength;

		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode( bytes[ i ] );
		}
		return window.btoa( binary );
	}

	function parseWav(wav) {
		function readInt(i, bytes) {
			var ret = 0,
				shft = 0;

			while (bytes) {
				ret += wav[i] << shft;
				shft += 8;
				i++;
				bytes--;
			}
			return ret;
		}
		if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
		if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
		return {
			sampleRate: readInt(24, 4),
			bitsPerSample: readInt(34, 2),
			samples: wav.subarray(44)
		};
	}

	function parseWav2(wav) {
		// does not return samples
		function readInt(i, bytes) {
			var ret = 0,
				shft = 0;

			while (bytes) {
				ret += wav[i] << shft;
				shft += 8;
				i++;
				bytes--;
			}
			return ret;
		}
		if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
		if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
		return {
			sampleRate: readInt(24, 4),
			bitsPerSample: readInt(34, 2)
		};
	}

	function Uint8ArrayToFloat32Array(u8a){
		var f32Buffer = new Float32Array(u8a.length);
		for (var i = 0; i < u8a.length; i++) {
			var value = u8a[i<<1] + (u8a[(i<<1)+1]<<8);
			if (value >= 0x8000) value |= ~0x7FFF;
			f32Buffer[i] = value / 0x8000;
		}
		return f32Buffer;
	}

	function uploadAudio(mp3Data,dtype, fileName){
		var reader = new FileReader();
		reader.fileName = fileName;
		reader.onload = function(event){
			var fd = new FormData();
			var fileName = event.target.fileName + '.'+dtype;
			console.log(fileName);
			var mp3Name = encodeURIComponent(fileName);
			console.log("mp3name = " + mp3Name);
			//fd.append('fname', mp3Name);
			fd.append('data', event.target.result);
			fd.append("id",fileName);
			$.ajax({
				type: 'POST',
				url: uploadPHPLocation,
				data: fd,
				processData: false,
				contentType: false
			}).done(function(data) {
				console.log(data);
				var bits = data.split(";");
				if(bits.length==2){
					addToFileLog(bits[0],bits[1]);
				}
				controlRecorderFinishedUploading();
				//setTimeout("controlRecorderFinishedUploading()",500);
				//log.innerHTML += "\n" + data;
			});
		};
		reader.readAsDataURL(mp3Data);
	}

    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary
  };

  /*Recorder.forceDownload = function(blob, filename){
	console.log("Force download");
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = window.document.createElement('a');
    link.href = url;
    link.download = filename || 'output.wav';
    var click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  }*/

  window.Recorder = Recorder;

})(window);
