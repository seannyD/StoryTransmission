// TODO: stop blank images from being dragged
// TODO: Can only continue if all images have been dragged into place


var storyImagesList;
var storyImagesOrder;
var storyCardOrder = [];

var savedStoryOrders = [];

var imageHoverXOffset = 10;
var imageHoverYOffset = -50;

var storyPageHeight;
var storyPageWidth; 

var storyOrderTimerMaxTime = 15 * 60 * 1000; // 15 minutes
var storyOrderTimerStartTime = 0;
var storyOrderTimerID = 0;


function initialiseStoryOrder(){

	var list = document.getElementById("StoryCards");
	if(list){
		storyImagesList = Sortable.create(
			list,
			{	group: {name: "storyImagesList",
						put: ["storyImagesOrder"]},
				animation: 300,
			 	onSort: storyCardsChanged,
			 	onChoose: storyCardSelected
			 });

	}
	shuffleStoryOrder();

	var mainOrder = document.getElementById("StoryCardMainOrder");
	if(mainOrder){
		storyImagesOrder = Sortable.create(
			mainOrder,
			{	group: {name: "storyImagesOrder",
						put: ['storyImagesList']},
				animation: 300,
			 	onSort: storyOrderChanged,
			 	onChoose: storyCardSelected
			 });
	}

	storyCardOrder = getStoryCardOrder();


	storyPageHeight = document.body.scrollHeight;
	storyPageWidth = document.body.scrollWidth;
	/*$(".storyCard").hover(
	// Hover in
	function(e){
		document.getElementById("bigStoryCardImage").src=e.target.src;
		var pos = getBigStoryCardHoverPos(e.pageX,e.pageY);
		$("#bigStoryCardImage")
			.css("top",pos[1] + "px")
			.css("left",pos[0] + "px")
			.fadeIn("fast");						
		$("#bigStoryCardImage").show();
    },
    // Hover out
	function(){
		$("#bigStoryCardImage").hide();
    });	*/
	$(".storyCard").hover(
	// Hover in
	function(e){},
    // Hover out
	function(){
		$("#bigStoryCardImage").hide();
    });
	$(".storyCard").click(
	function(e){
		document.getElementById("bigStoryCardImage").src=e.target.src;
		var pos = getBigStoryCardHoverPos(e.pageX,e.pageY);
		$("#bigStoryCardImage")
			.css("top",pos[1] + "px")
			.css("left",pos[0] + "px")
			.fadeIn("fast");						
		$("#bigStoryCardImage").show();
    });
	$(".storyCard").mousemove(function(e){
		var pos = getBigStoryCardHoverPos(e.pageX,e.pageY);
		$("#bigStoryCardImage")
			.css("top",pos[1] + "px")
			.css("left",pos[0] + "px");
	});
	$(".storyCard").mousedown(function(e){
		$("#bigStoryCardImage").hide();
	});
	$(".bigStoryCardImage").hover(function(e){
		$("#bigStoryCardImage").hide();
	});
	$(".bigStoryCardImage").click(function(e){
		$("#bigStoryCardImage").hide();
	});

	$("#blankStoryCard2").hide();

	$("#storyOrderFinish").hide();


}

function setStoryOrderParticipantID(){
	var d = new Date();
	var dayNum = d.getDate();
	if(dayNum<10){
		dayNum = "0" + dayNum;
	}
	var ranNum = Math.floor(Math.random() * 90 + 10);
	participantID = dayNum.toString() + ranNum.toString();
}

function showStoryOrderInstructions(){
	setInstruction(storyOrderParticipantInstructions);
}

function playStoryOrderVideo(){
	$("#StoryOrderInstructions").show();
	var introVideo = document.getElementById("StoryOrderInstructionsVideo");
	// reset the video to the start
	introVideo.currentTime = 0;
	// need to use block display to make video border size correct
	document.getElementById("StoryOrderInstructions").style.display="block";
	// play the video
	introVideo.play();
}

function StoryOrderInstructionsVideoEnded(){
	var introVideo = document.getElementById("StoryOrderInstructionsVideo");
	introVideo.pause();
	setTimeout("nextStage()",500);
}

function storyOrderAskForParticipantID(){
	setInstruction(storyOrderAskForParticipantIDInstructions);
	var input = document.createElement('input'); 
	input.type = "text";
	input.setAttribute('id', 'participantIDInput');
	
	var gobutton = document.createElement('button');
	gobutton.classList.add('btn');
	gobutton.classList.add('btn-success');
	gobutton.innerHTML = 'Continue';
	gobutton.onclick = function(){
		var txt = $("#participantIDInput").val();
		if(validateIDNumber(txt)){
			participantID = txt;
			setTimeout("nextStage()",500);
		} else{
			var para = document.createElement("p");
			var node = document.createTextNode("There was an error with your ID. Please try again");
			para.appendChild(node);
			$("#instructions").after(para);
		}
	};

	document.getElementById("instructions").appendChild(input);
	document.getElementById("instructions").appendChild(gobutton);
}

function validateIDNumber(txt){
	return(true);
}

function launchStoryOrderConsentSurvey(){
	var myCss = {
        matrix: {root: "table table-striped"} ,
        matrixdropdown: {root: "table table-striped"}  ,
        matrixdynamic: {root: "table table-striped"}  
   	};

   	showMe("surveyContainer");
	var survey = new Survey.Model(storyOrderConsentSurveyJSON);
	$("#surveyContainer").Survey({
	    model: survey,
	    onComplete: endStoryOrderConsentSurvey,
	    css: myCss

	});
	survey.locale = "my";
}

function endStoryOrderConsentSurvey(survey){

	hideMe("surveyContainer");

	var sd = survey.data;
	console.log(sd);
	var consentReceivedInfo =  sd['consentReceivedInfo'];
	var consentWithdraw = sd['consentWithdraw'];
	var consentVideo = sd['consentVideo'];
	var consentFacePixel = sd['consentFacePixel'];
	var consentTakePartInStudy = sd['consentTakePartInStudy'];
	
	var outString = "ID,consentReceivedInfo,consentWithdraw,consentVideo,consentFacePixel,consentTakePartInStudy,timestamp\n";
	outString += participantID + "," + 
					[consentReceivedInfo,consentWithdraw,consentVideo,consentFacePixel,consentTakePartInStudy].join(",") +
					"," + getCurrentTime();

	var fd = new FormData();
	fd.append('data', outString);
	fd.append("filetype","storyOrder");
	fd.append("id",participantID + "_StoryOrderConsent");

	$.ajax({
		type: 'POST',
		url: uploadSurveyPHPLocation,
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		console.log(data);
		var bits = data.split(";");
		if(bits.length==2){
			addToFileLog(bits[0],bits[1]);
		}
	});

	if(consentReceivedInfo=="Yes" && consentWithdraw=="Yes" && consentFacePixel=="Yes" && consentTakePartInStudy=="Yes"){
		setTimeout("nextStage()",500);
	} else{
		showNoConsentScreen();
	}
}

function showNoConsentScreen(){
	setInstruction(storyOrderNoConsentScreenInstructions);
	// Experiment effectively ends here.
}

function startStoryOrderTimer(){
	var d = new Date();
	storyOrderTimerStartTime = d.getTime();
	storyOrderTimerID = setInterval("storyOrderTimerTick()",1000);
	showMe("StoryOrderTimer");
}

function storyOrderTimerTick(){
	var d = new Date();
	var currentTime = d.getTime();
	var timePassed = currentTime - storyOrderTimerStartTime;
	var timeLeft = storyOrderTimerMaxTime - timePassed;
	if(timeLeft<0){
		timeLeft = 0;
	}

	var timeLeftFormatted = storyOrderTimerFormat(timeLeft);
	$("#StoryOrderTimer").html(timeLeftFormatted);

	if(timeLeft ==0){
		stopStoryOrderTimer();
		// After timer runs out, it should move on to 'selectMostImportantScene'
		// But timer can run out either on `storyOrder` or `WriteStoryFromOrder`.
		// So make sure that stageCounter is set to WriteStoryFromOrder,
		// so that we move on to the correct part.
		stageCounter = stages.indexOf("WriteStoryFromOrder");
		setTimeout("nextStage()",500);
	}
}

function storyOrderTimerFormat(duration){
	var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60);
	
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return minutes + ":" + seconds;
}

function stopStoryOrderTimer(){
	clearInterval(storyOrderTimerID);
	hideMe("StoryOrderTimer");
}

function getBigStoryCardHoverPos(mouseX,mouseY){
	var posX = mouseX + imageHoverXOffset;
	var posY = mouseY + imageHoverYOffset;
	if((posY + $("#bigStoryCardImage").height()) > storyPageHeight){
		posY = storyPageHeight - $("#bigStoryCardImage").height() - 10;
	}
	if((posX+ $("#bigStoryCardImage").width())> (storyPageWidth-20)){
		posX = mouseX - $("#bigStoryCardImage").width() - imageHoverXOffset;
	}
	return([posX,posY]);
}

function shuffleStoryOrder(){
	var order = storyImagesList.toArray();
	shuffle(order);
	storyImagesList.sort(order);
}

function storyOrderChanged(e){
	moveBlankCardToEnd();
	storyCardOrder = getStoryCardOrder();
	// Save each change
	savedStoryOrders.push(storyCardOrder);
	// Keep this card up so we can put images at end
	//if(storyCardOrder.length>0){
	//	$("#blankStoryCard").hide();
	//} else{
	//	$("#blankStoryCard").show();
	//}
	// Make sure blankStoryCard is at the end

}

function moveBlankCardToEnd(){
	// Get the position of the blank index
	var cards = document.getElementById("StoryCardMainOrder").children;
	var blankCardSortableIndex = -1;
	for(var i = 0; i < cards.length; i++){
		var imageName = cards[i].src;
		imageName = imageName.substr(imageName.lastIndexOf("/")+1);
		if(imageName=="blank.png"){
			blankCardSortableIndex = i;
		}
    }
    if(blankCardSortableIndex>=0){
    	var sio = storyImagesOrder.toArray();
    	// move blank id to endto end
    	sio.push(sio.splice(blankCardSortableIndex, 1)[0]);
    	storyImagesOrder.sort(sio);
    }
}

function storyCardsChanged(e){
	if(document.getElementById("StoryCards").children.length>1){
		$("#blankStoryCard2").hide();
		$("#storyOrderFinish").hide();
	} else{
		$("#blankStoryCard2").show();
		$("#storyOrderFinish").show();
	}
}

function getStoryCardOrder(){

	var cards = document.getElementById("StoryCardMainOrder").children;
	var cardOrder = [];
	for(var i = 0; i < cards.length; i++){
		var imageName = cards[i].src;
		imageName = imageName.substr(imageName.lastIndexOf("/")+1);
		if(imageName!="blank.png"){
			cardOrder.push(imageName);
		}
    }
    return(cardOrder);
}

// TODO: Maybe not necessary?
function storyCardSelected(e){
	var chosenCardSRC = e.item.src;
	console.log(chosenCardSRC);
	document.getElementById("bigStoryCardImage").src=chosenCardSRC;
}

function startStoryOrder(){
	shuffleStoryOrder();
	$("#StoryOrder").show();
	startStoryOrderTimer();
}

function finishStoryOrder(){
	savedStoryOrders.push(getStoryCardOrder());
	uploadStoryOrderData();
}


function uploadStoryOrderData(){
	// Make csv and send to server
	// headers
	if(savedStoryOrders.length==0){
		return(null);
	}
	var csvText = "participantID,number,order\n";
	for(var i=0;i<savedStoryOrders.length;++i){
		csvText += participantID+","+i +",";
		csvText += savedStoryOrders[i].join("#");
		csvText += "\n";
	}

	// Upload to server
	var fd = new FormData();
	//var filename = participantID  + '_DT_' + distractionTaskNumber + '.csv';
	
	//fd.append('fname', filename);
	fd.append('data', csvText);
	fd.append('filetype','storyOrder');
	fd.append("id",participantID + "_storyOrder");
	$.ajax({
		type: 'POST',
		url: uploadSurveyPHPLocation,
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		console.log(data);
		var bits = data.split(";");
		if(bits.length==2){
			addToFileLog(bits[0],bits[1]);
		}
		setTimeout("nextStage()",500);
	});
	//TODO: action on fail?
}


function finishStoryOrderEndSurveyJSON(survey){
	var sd = survey.data;
	sd["participantID"] = participantID;
	sd["time"] = getCurrentTime();
	var outString = ConvertToCSV(sd);
	var fd = new FormData();
	//var filename = participantID  + '.csv';
	
	//fd.append('fname', filename);
	fd.append('data', outString);
	fd.append('filetype', "storyOrder");
	fd.append('id', participantID + "_storyOrderEndSurvey");
	$.ajax({
		type: 'POST',
		url: uploadSurveyPHPLocation,
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		console.log(data);
		var bits = data.split(";");
		if(bits.length==2){
			addToFileLog(bits[0],bits[1]);
		}
		setTimeout("nextStage()",500);
	});
}