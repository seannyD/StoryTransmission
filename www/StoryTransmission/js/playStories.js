// play the stories


var readyToPlay = false;
var audioToPlay = "";
var audioFolder = "../resources/audio/"
var storyDuration;

function showPlayStory(storyNumber){

	var music = document.getElementById('playStoryPlayer');
	music.addEventListener("timeupdate", timeUpdate, false);
	// Gets audio file duration
	music.addEventListener("canplaythrough", function () {
		storyDuration = music.duration;
	}, false);

	var playhead = document.getElementById('playhead');
	playhead.style.marginLeft = "0%";

	showMe("playStoryContainer");
	showMe("playStoryButton");
	hideMe("playStoryPlayer"); // will show later
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
	audio.oncanplaythrough = audio.play();
}


function playStoryButtonPress(){
	if(readyToPlay){
		readyToPlay = false;
		hideMe("playStoryButton");
		// Some playing animation
		showMe("playStoryPlayer");
		playAudio(audioToPlay);
	}
}

function playStoryPlayerEnded(){
	nextStage();
}


function showPreStory2(){
	setInstruction(recordingInstructionTextPreRound2);
	launchSurvey(recordingInstructionTextPreRound2Survey, endPreStory2);
}

function endPreStory2(){
	setTimeout("nextStage()",100);
}

function timeUpdate() {
	var playhead = document.getElementById('playhead');
	var music = document.getElementById('playStoryPlayer'); 
	var playPercent = 100 * (music.currentTime / storyDuration);
	playhead.style.marginLeft = playPercent + "%";
}

function resetPlayhead(){

}

