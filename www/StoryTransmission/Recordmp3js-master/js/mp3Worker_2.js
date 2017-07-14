//importScripts('libmp3lame.min.js');
importScripts("lame.all.js");
//importScripts('../resampler.js');

//var mp3codec;
var mp3encoder;
var outputSampleRate;
var bitrate;
var sampleBlockSize;
var channels;

self.onmessage = function(e) {

	switch (e.data.cmd) {
	case 'init':
		if (!e.data.config) {
			e.data.config = { };
		}
		// //Module = {};
		// //Module.TOTAL_MEMORY = 16777216;
		// mp3codec = Lame.init();
		// console.log("LAME");


		// Lame.set_mode(mp3codec, e.data.config.mode || Lame.JOINT_STEREO);
		// Lame.set_num_channels(mp3codec, e.data.config.channels || 2);
		// Lame.set_num_samples(mp3codec, e.data.config.samples || -1);
		// Lame.set_in_samplerate(mp3codec, e.data.config.samplerate || 44100);

		// if(e.data.config.ouputSampleRate===undefined){
		// 	outputSampleRate  =  e.data.config.samplerate || 44100;
		// } else{
		// 	outputSampleRate = e.data.config.outputSampleRate;
		// }

		// Lame.set_out_samplerate(mp3codec, outputSampleRate);
		// Lame.set_bitrate(mp3codec, e.data.config.bitrate || 128);

		// Lame.init_params(mp3codec);
		// console.log('Version :', Lame.get_version() + ' / ',
		// 	'Mode: '+Lame.get_mode(mp3codec) + ' / ',
		// 	'Samples: '+Lame.get_num_samples(mp3codec) + ' / ',
		// 	'Channels: '+Lame.get_num_channels(mp3codec) + ' / ',
		// 	'Input Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
		// 	'Output Samplate: '+ Lame.get_out_samplerate(mp3codec) + ' / ',
		// 	'Bitlate :' +Lame.get_bitrate(mp3codec) + ' / ');

		channels = 1; //1 for mono or 2 for stereo
		outputSampleRate = e.data.config.samplerate || 44100; //44.1khz (normal mp3 samplerate)
		bitrate = e.data.config.bitrate || 128; //encode 128kbps mp3
		console.log("bitrate" + bitrate);
		//mp3encoder = new lamejs.Mp3Encoder(channels, outputSampleRate, 128);
		//sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier
		break;
	case 'encode':
		console.log("MP3 Worker " + e.data.fileName);
		//var mp3data = Lame.encode_buffer_ieee_float(mp3codec, e.data.buf, e.data.buf);


		// var buffer = [];
		// for (var i = 0; i < e.data.buf.length; i += sampleBlockSize) {
		//   sampleChunk = e.data.buf.subarray(i, i + sampleBlockSize);
		//   var mp3buf = mp3encoder.encodeBuffer(sampleChunk);
		//   if (mp3buf.length > 0) {
		//       buffer.push(mp3buf);
		//   }
		// }
		// var mp3buf = mp3encoder.flush();   //finish writing mp3

		// if (mp3buf.length > 0) {
		//     buffer.push(new Int8Array(mp3buf));
		// }

		// Attempt 2
		// var buffer = [];
  //       //var mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
  //       var remaining = e.data.buf.length;
  //       var maxSamples = 1152;
  //       for (var i = 0; remaining >= maxSamples; i += maxSamples) {
  //       	//console.log("MP3 encoder chunk "+i);
  //           var mono = e.data.buf.subarray(i, i + maxSamples);
  //           var mp3buf = mp3encoder.encodeBuffer(mono);
  //           if (mp3buf.length > 0) {
  //               buffer.push(new Int8Array(mp3buf));
  //               //buffer = buffer.concat(mp3buf);
  //           }
  //           remaining -= maxSamples;
  //       }
  //       var d = mp3encoder.flush();
  //       if(d.length > 0){
  //           buffer.push(new Int8Array(d));
  //           //buffer = buffer.concat(d);
  //       }

        //buffer = new Int8Array(buffer);

  		// Attempt 3
  // 		var buffer = [];
		// var mp3Tmp = mp3encoder.encodeBuffer(e.data.buf); //encode mp3

		// //Push encode buffer to mp3Data variable
		// buffer.push(mp3Tmp);

		// // Get end part of mp3
		// mp3Tmp = mp3encoder.flush();

		// // Write last data to the output data, too
		// // buffer contains now the complete mp3Data
		// buffer.push(mp3Tmp);


		// Attempt 4


			//var wav = lamejs.WavHeader.readHeader(new DataView(e.data.buf));
        	//var samples = new Int16Array(e.data.buf, wav.dataOffset, wav.dataLen / 2);

		// 	console.log(e.data.buf);
		// 	var left =e.data.buf;
		//     //var left = new Int16Array(e.data.buf);
		//     console.log(left);
		//     var maxSamples = 1152;
		//     var remaining = left.length;
		    
		//     var buffer = [], i = 0, mp3buf, ld, rd, data, blob, url;

		//     while (remaining >= maxSamples) {
		//       i += maxSamples;
		//       //ld = left.splice(i, i + maxSamples);
		//       ld = left.subarray(i, i + maxSamples)
		//       //rd = right ? right.splice(i, i + maxSamples) : null;
		//       //mp3buf = mp3encoder.encodeBuffer(ld, rd);
		//       mp3buf = mp3encoder.encodeBuffer(ld);

		//       //mp3buf.length > 0 && buffer.push(new Int8Array(mp3buf));
		//       mp3buf.length > 0 && buffer.push(new Int8Array(mp3buf));

		//       remaining -= maxSamples;
		//     } 
		      
		//     data = mp3encoder.flush();

		// data.length > 0 && buffer.push(new Int8Array(data));

		// Attempt 5
		var wav = lamejs.WavHeader.readHeader(new DataView(e.data.buf));
        var samples = new Int16Array(e.data.buf, wav.dataOffset, wav.dataLen / 2);
		//var samples  = e.data.buf;
		var buffer = [];
        //console.log(samples);
        var mp3enc = new lamejs.Mp3Encoder(1, outputSampleRate, 128);
        var remaining = samples.length;
        var maxSamples = 1152;
        for (var i = 0; remaining >= maxSamples; i += maxSamples) {
            var mono = samples.subarray(i, i + maxSamples);
            var mp3buf = mp3enc.encodeBuffer(mono);
            if (mp3buf.length > 0) {
                buffer.push(new Int8Array(mp3buf));
            }
            remaining -= maxSamples;
        }
        var d = mp3enc.flush();
        if(d.length > 0){
            buffer.push(new Int8Array(d));
        }


		self.postMessage({cmd: 'data', buf: buffer, fileName: e.data.fileName});
		break;
	case 'finish':
		//var mp3data = Lame.encode_flush(mp3codec);
		//self.postMessage({cmd: 'end', buf: mp3data.data, fileName: e.data.fileName});
		//Lame.close(mp3codec);
		//mp3codec = null;
		break;
	}
};