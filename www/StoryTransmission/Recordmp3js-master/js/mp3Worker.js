importScripts('libmp3lame.min.js');
//importScripts('../resampler.js');

var mp3codec;
var outputSampleRate;

self.onmessage = function(e) {

	switch (e.data.cmd) {
	case 'init':
		if (!e.data.config) {
			e.data.config = { };
		}
		//Module = {};
		//Module.TOTAL_MEMORY = 16777216;
		mp3codec = Lame.init();
		console.log("LAME");


		Lame.set_mode(mp3codec, e.data.config.mode || Lame.JOINT_STEREO);
		Lame.set_num_channels(mp3codec, e.data.config.channels || 2);
		Lame.set_num_samples(mp3codec, e.data.config.samples || -1);
		Lame.set_in_samplerate(mp3codec, e.data.config.samplerate || 44100);

		if(e.data.config.ouputSampleRate===undefined){
			outputSampleRate  =  e.data.config.samplerate || 44100;
		} else{
			outputSampleRate = e.data.config.outputSampleRate;
		}

		Lame.set_out_samplerate(mp3codec, outputSampleRate);
		Lame.set_bitrate(mp3codec, e.data.config.bitrate || 128);

		Lame.init_params(mp3codec);
		console.log('Version :', Lame.get_version() + ' / ',
			'Mode: '+Lame.get_mode(mp3codec) + ' / ',
			'Samples: '+Lame.get_num_samples(mp3codec) + ' / ',
			'Channels: '+Lame.get_num_channels(mp3codec) + ' / ',
			'Input Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
			'Output Samplate: '+ Lame.get_out_samplerate(mp3codec) + ' / ',
			'Bitlate :' +Lame.get_bitrate(mp3codec) + ' / ');
		break;
	case 'encode':
		console.log("MP3 Worker " + e.data.fileName);
		var mp3data = Lame.encode_buffer_ieee_float(mp3codec, e.data.buf, e.data.buf);
		self.postMessage({cmd: 'data', buf: mp3data.data, fileName: e.data.fileName});
		break;
	case 'finish':
		var mp3data = Lame.encode_flush(mp3codec);
		self.postMessage({cmd: 'end', buf: mp3data.data, fileName: e.data.fileName});
		Lame.close(mp3codec);
		mp3codec = null;
		break;
	}
};