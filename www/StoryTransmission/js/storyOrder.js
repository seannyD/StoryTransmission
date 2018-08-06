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
	$(".storyCard").hover(function(e){
		document.getElementById("bigStoryCardImage").src=e.target.src;
		var pos = getBigStoryCardHoverPos(e.pageX,e.pageY);
		$("#bigStoryCardImage")
			.css("top",pos[1] + "px")
			.css("left",pos[0] + "px")
			.fadeIn("fast");						
		$("#bigStoryCardImage").show();
    },
	function(){
		$("#bigStoryCardImage").hide();
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

	$("#blankStoryCard2").hide();


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
	storyCardOrder = getStoryCardOrder();
	// Save each change
	savedStoryOrders.push(storyCardOrder);
	if(storyCardOrder.length>1){
		$("#blankStoryCard").hide();
	} else{
		$("#blankStoryCard").show();
	}
}

function storyCardsChanged(e){
	if(document.getElementById("StoryCards").children.length>1){
		$("#blankStoryCard2").hide();
	} else{
		$("#blankStoryCard2").show();
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
