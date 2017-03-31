// play the stories


var readyToPlay = false;
var audioToPlay = "";
var audioFolder = "../resources/audio/"

function showPlayStory(storyNumber){
	showMe("playStoryContainer");
	showMe("playStoryButton");
	setInstruction(playStoryInstructionText);
	readyToPlay = true;
	if(storyNumber ==0){
		audioToPlay = audioFolder+sample1+".mp3";
	}
	if(storyNumber ==1){
		audioToPlay = audioFolder+sample2+".mp3";
	}
}

playAudio = function(file){

	var audio = document.getElementById('playStoryPlayer');
    var source = document.getElementById('playStorySource');
	audio.pause();
	source.src = file;
	audio.load();
	audio.play();
}


function playStoryButtonPress(){
	if(readyToPlay){
		readyToPlay = false;
		hideMe("playStoryButton");
		// Some playing animation
		playAudio(audioToPlay);
	}
}

function playStoryPlayerEnded(){
	nextStage();
}