

var tellStoryCurrentStoryImage = 0;
var numberOfWritingAreasCreated = 0;

var baseStoryImageFolder = "../resources/images/storyImages/"

function initialiseStoryOrderTellStory(){
	tellStoryCurrentStoryImage = 0;
	setTellStoryImages();
	$("#WriteStoryFromOrder").show();

	appendWritingSpaceTextArea();
}

function appendWritingSpaceTextArea(){
	$("#storyOrderWritingSpace").append(makeWritingSpaceTextArea());
	numberOfWritingAreasCreated += 1;
}

function makeWritingSpaceTextArea(){
	var writingSpaceTextAreaTemplateA = '<div><h4>Scene ';
	var writingSpaceTextAreaTemplateB = '</h4><textarea></textarea></div>';
	var textArea = jQuery.parseHTML(writingSpaceTextAreaTemplateA+tellStoryCurrentStoryImage+writingSpaceTextAreaTemplateB);
	return(textArea);
}

function setTellStoryImages(){

	if(tellStoryCurrentStoryImage>0){
		$("#previousStoryImage").attr("src", 
			baseStoryImageFolder+storyCardOrder[tellStoryCurrentStoryImage-1]);
		$("#previousStoryImage").show();
	} else{
		$("#previousStoryImage").hide();
	}

	$("#currentStoryImage").attr("src", 
		baseStoryImageFolder+storyCardOrder[tellStoryCurrentStoryImage]);

	if(tellStoryCurrentStoryImage<(storyCardOrder.length-1)){
		$("#nextStoryImage").attr("src", 
			baseStoryImageFolder+storyCardOrder[tellStoryCurrentStoryImage+1]);
		$("#nextStoryImage").show()
	} else{
		$("#nextStoryImage").hide()
	}
}

function clickedPreviousStoryImage(){
	if(tellStoryCurrentStoryImage>0){
		tellStoryCurrentStoryImage -= 1;
		setTellStoryImages();
	}
}

function clickedNextStoryImage(){
	if(tellStoryCurrentStoryImage<(storyCardOrder.length-1)){
		tellStoryCurrentStoryImage += 1;
		setTellStoryImages();
	}

	if(tellStoryCurrentStoryImage >= numberOfWritingAreasCreated){
		appendWritingSpaceTextArea();
	}

}